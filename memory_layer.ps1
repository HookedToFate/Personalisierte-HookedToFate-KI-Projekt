# Memory Layer MVP - Core Implementation
# Day 2-3: Read/Write Functions

param(
    [string]$Command = "",
    [string[]]$Args = @()
)

# Load configuration
if (-not (Test-Path "memory_config.json")) {
    Write-Host "❌ Configuration not found. Run test_gist_connection.ps1 first." -ForegroundColor Red
    exit 1
}

$config = Get-Content "memory_config.json" | ConvertFrom-Json
$GIST_ID = $config.gist_id
$GIST_TOKEN = $env:GIST_TOKEN

if (-not $GIST_TOKEN) {
    if (Test-Path $config.token_location) {
        $GIST_TOKEN = (Get-Content $config.token_location -Raw).Trim()
    } else {
        Write-Host "❌ Token not found. Set `$env:GIST_TOKEN or create ~/.gist_token" -ForegroundColor Red
        exit 1
    }
}

$headers = @{
    "Authorization" = "token $GIST_TOKEN"
    "Accept" = "application/vnd.github+json"
}

# ========================================
# MEMORY READ FUNCTION
# ========================================

function Read-Memory {
    param(
        [string]$Category = $null,
        [string]$Subcategory = $null,
        [string]$RecallId = $null,
        [switch]$UseCache
    )
    
    try {
        # Check cache first (if enabled)
        if ($UseCache -and (Test-Path $config.local_cache_path)) {
            $cacheAge = (Get-Date) - (Get-Item $config.local_cache_path).LastWriteTime
            if ($cacheAge.TotalMinutes -lt $config.sync_interval_minutes) {
                Write-Host "[Cache] Using cached memory (age: $([math]::Round($cacheAge.TotalMinutes, 1)) min)" -ForegroundColor DarkGray
                $memory = Get-Content $config.local_cache_path | ConvertFrom-Json
                $entries = $memory.memory_entries
            } else {
                $entries = Read-MemoryFromGist
            }
        } else {
            $entries = Read-MemoryFromGist
        }
        
        # Filter by category
        if ($Category) {
            $entries = $entries | Where-Object { $_.category -eq $Category }
        }
        
        # Filter by subcategory
        if ($Subcategory) {
            $entries = $entries | Where-Object { $_.subcategory -eq $Subcategory }
        }
        
        # Filter by recall ID
        if ($RecallId) {
            $entries = $entries | Where-Object { $_.recall_id -eq $RecallId }
        }
        
        return $entries
        
    } catch {
        Write-Host "❌ Read failed: $($_.Exception.Message)" -ForegroundColor Red
        return @()
    }
}

function Read-MemoryFromGist {
    Write-Host "[API] Fetching memory from Gist..." -ForegroundColor DarkGray
    
    $response = Invoke-RestMethod -Uri "https://api.github.com/gists/$GIST_ID" -Headers $headers -Method Get
    $memory = $response.files.'Andre_KI_Memory.json'.content | ConvertFrom-Json
    
    # Update local cache
    $memory | ConvertTo-Json -Depth 10 | Out-File -FilePath $config.local_cache_path -Encoding UTF8
    
    return $memory.memory_entries
}

# ========================================
# MEMORY WRITE FUNCTION
# ========================================

function Write-Memory {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Pattern,
        
        [Parameter(Mandatory=$true)]
        [ValidateSet("Preference", "Pattern", "Project", "Constraint", "Anti-Pattern", "Conflict-Resolution")]
        [string]$Category,
        
        [Parameter(Mandatory=$true)]
        [string]$Subcategory,
        
        [ValidateSet("Low", "Medium", "High", "Manual")]
        [string]$Confidence = "Manual",
        
        [string]$RecallId = $null,
        
        [switch]$Force
    )
    
    try {
        # Read current memory
        $response = Invoke-RestMethod -Uri "https://api.github.com/gists/$GIST_ID" -Headers $headers -Method Get
        $memory = $response.files.'Andre_KI_Memory.json'.content | ConvertFrom-Json
        
        # Conflict detection (unless forced)
        if (-not $Force) {
            $conflicts = Test-MemoryConflict -NewPattern $Pattern -Category $Category -ExistingEntries $memory.memory_entries
            
            if ($conflicts.Count -gt 0) {
                Write-Host "`n⚠️  CONFLICT DETECTED" -ForegroundColor Yellow
                foreach ($conflict in $conflicts) {
                    Write-Host "  Existing: [$($conflict.existing_id)] $($conflict.existing_rule)" -ForegroundColor White
                    Write-Host "  New:      $Pattern" -ForegroundColor White
                }
                
                Write-Host "`nOptions:" -ForegroundColor Yellow
                Write-Host "  A - Keep old rule" -ForegroundColor White
                Write-Host "  B - Replace with new rule" -ForegroundColor White
                Write-Host "  C - Context-dependent (both active)" -ForegroundColor White
                Write-Host "  X - Cancel" -ForegroundColor White
                
                $choice = Read-Host "`nChoice [A/B/C/X]"
                
                switch ($choice.ToUpper()) {
                    "A" { 
                        Write-Host "✅ Keeping existing rule. Write cancelled." -ForegroundColor Green
                        return $null
                    }
                    "B" {
                        # Archive old entry
                        $oldEntry = $memory.memory_entries | Where-Object { $_.id -eq $conflicts[0].existing_id }
                        $oldEntry.status = "Archived"
                        $oldEntry.archived_date = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")
                        Write-Host "✅ Old rule archived. Writing new rule..." -ForegroundColor Yellow
                    }
                    "C" {
                        Write-Host "✅ Both rules active (context-dependent). Writing new rule..." -ForegroundColor Yellow
                    }
                    default {
                        Write-Host "❌ Write cancelled." -ForegroundColor Red
                        return $null
                    }
                }
            }
        }
        
        # Generate new entry
        $entryId = "MEM-$(Get-Date -Format 'yyyy-MM')-$("{0:D3}" -f ($memory.memory_entries.Count + 1))"
        
        $newEntry = @{
            id = $entryId
            category = $Category
            subcategory = $Subcategory
            pattern = $Pattern
            stored_rule = $Pattern
            confidence = $Confidence
            repetition_count = $(if ($Confidence -eq "High") { 5 } elseif ($Confidence -eq "Medium") { 3 } else { 1 })
            first_observed = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")
            last_reinforced = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")
            session_ids = @("session-$(Get-Date -Format 'yyyyMMdd-HHmmss')")
            recall_id = $RecallId
            version = "1.0"
            status = "Active"
        }
        
        # Add to memory
        $memory.memory_entries += $newEntry
        $memory.metadata.total_entries = $memory.memory_entries.Count
        $memory.metadata.last_updated = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")
        
        # Write to Gist
        $updatedContent = $memory | ConvertTo-Json -Depth 10
        
        $body = @{
            files = @{
                'Andre_KI_Memory.json' = @{
                    content = $updatedContent
                }
            }
        } | ConvertTo-Json -Depth 10
        
        $writeResponse = Invoke-RestMethod -Uri "https://api.github.com/gists/$GIST_ID" -Headers $headers -Method Patch -Body $body -ContentType "application/json"
        
        # Update local cache
        $memory | ConvertTo-Json -Depth 10 | Out-File -FilePath $config.local_cache_path -Encoding UTF8
        
        Write-Host "✅ Stored: $entryId" -ForegroundColor Green
        Write-Host "   Category: $Category/$Subcategory" -ForegroundColor White
        Write-Host "   Pattern: $Pattern" -ForegroundColor White
        Write-Host "   Confidence: $Confidence" -ForegroundColor White
        
        # CHANGELOG update (if high confidence)
        if ($Confidence -eq "High" -and $Category -in @("Preference", "Pattern", "Conflict-Resolution")) {
            Write-Host "   📝 CHANGELOG update recommended (semantic change)" -ForegroundColor Yellow
        }
        
        return $newEntry
        
    } catch {
        Write-Host "❌ Write failed: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# ========================================
# CONFLICT DETECTION
# ========================================

function Test-MemoryConflict {
    param(
        [string]$NewPattern,
        [string]$Category,
        [array]$ExistingEntries
    )
    
    $conflicts = @()
    
    # Get entries in same category
    $categoryEntries = $ExistingEntries | Where-Object { $_.category -eq $Category -and $_.status -eq "Active" }
    
    foreach ($entry in $categoryEntries) {
        if (Test-Contradiction -Rule1 $entry.stored_rule -Rule2 $NewPattern) {
            $conflicts += @{
                existing_id = $entry.id
                existing_rule = $entry.stored_rule
                new_rule = $NewPattern
            }
        }
    }
    
    return $conflicts
}

function Test-Contradiction {
    param(
        [string]$Rule1,
        [string]$Rule2
    )
    
    # Simple keyword-based contradiction detection (MVP)
    $negationPairs = @(
        @("compress", "expand"),
        @("short", "long"),
        @("no", "use"),
        @("forbidden", "allowed"),
        @("never", "always"),
        @("minimal", "extensive")
    )
    
    $rule1Lower = $Rule1.ToLower()
    $rule2Lower = $Rule2.ToLower()
    
    foreach ($pair in $negationPairs) {
        $neg1 = $pair[0]
        $neg2 = $pair[1]
        
        if (($rule1Lower -match $neg1 -and $rule2Lower -match $neg2) -or
            ($rule1Lower -match $neg2 -and $rule2Lower -match $neg1)) {
            return $true
        }
    }
    
    return $false
}

# ========================================
# COMMAND HANDLERS
# ========================================

function Invoke-StoreCommand {
    param([string]$Pattern)
    
    if (-not $Pattern) {
        Write-Host "Usage: /store <pattern>" -ForegroundColor Yellow
        Write-Host "Example: /store No emojis in responses" -ForegroundColor DarkGray
        return
    }
    
    Write-Host "`nCategory:" -ForegroundColor Yellow
    Write-Host "  1 - Preference" -ForegroundColor White
    Write-Host "  2 - Pattern" -ForegroundColor White
    Write-Host "  3 - Project" -ForegroundColor White
    Write-Host "  4 - Constraint" -ForegroundColor White
    Write-Host "  5 - Anti-Pattern" -ForegroundColor White
    Write-Host "  6 - Conflict-Resolution" -ForegroundColor White
    
    $catChoice = Read-Host "Select [1-6]"
    $categories = @("", "Preference", "Pattern", "Project", "Constraint", "Anti-Pattern", "Conflict-Resolution")
    $category = $categories[[int]$catChoice]
    
    $subcategory = Read-Host "Subcategory (e.g., Tone, Decision-Making)"
    
    Write-Memory -Pattern $Pattern -Category $category -Subcategory $subcategory -Confidence "Manual"
}

function Invoke-RecallCommand {
    param([string]$Topic)
    
    $entries = Read-Memory
    
    if ($Topic) {
        $entries = $entries | Where-Object { 
            $_.pattern -match $Topic -or 
            $_.category -match $Topic -or 
            $_.subcategory -match $Topic 
        }
    }
    
    if ($entries.Count -eq 0) {
        Write-Host "No entries found." -ForegroundColor Yellow
        return
    }
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "MEMORY ENTRIES ($($entries.Count) found)" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    foreach ($entry in $entries | Select-Object -First 10) {
        Write-Host "[$($entry.id)]" -ForegroundColor Green
        Write-Host "  Category: $($entry.category)/$($entry.subcategory)" -ForegroundColor White
        Write-Host "  Pattern: $($entry.stored_rule)" -ForegroundColor White
        Write-Host "  Confidence: $($entry.confidence) | Count: $($entry.repetition_count)x" -ForegroundColor DarkGray
        Write-Host "  Last: $($entry.last_reinforced)" -ForegroundColor DarkGray
        Write-Host ""
    }
    
    if ($entries.Count -gt 10) {
        Write-Host "... and $($entries.Count - 10) more entries" -ForegroundColor DarkGray
    }
}

function Invoke-MemoryStatus {
    $entries = Read-Memory
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "MEMORY STATUS" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    Write-Host "Total entries: $($entries.Count)" -ForegroundColor White
    
    $byCategory = $entries | Group-Object -Property category | Sort-Object Count -Descending
    
    Write-Host "`nBy Category:" -ForegroundColor Yellow
    foreach ($group in $byCategory) {
        Write-Host "  $($group.Name): $($group.Count)" -ForegroundColor White
    }
    
    $recent = $entries | Where-Object { 
        (Get-Date $_.first_observed) -gt (Get-Date).AddDays(-7) 
    }
    
    Write-Host "`nRecent (last 7 days): $($recent.Count)" -ForegroundColor Yellow
    
    $highConf = $entries | Where-Object { $_.confidence -eq "High" }
    Write-Host "High confidence: $($highConf.Count)" -ForegroundColor Yellow
}

# ========================================
# SESSION STARTUP
# ========================================

function Initialize-Session {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "MEMORY LAYER SESSION START" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    $entries = Read-Memory -UseCache
    
    if ($entries.Count -eq 0) {
        Write-Host "No memory entries found. Starting with clean slate." -ForegroundColor Yellow
        return
    }
    
    # Load high-confidence entries
    $highConf = $entries | Where-Object { $_.confidence -eq "High" -and $_.status -eq "Active" }
    
    if ($highConf.Count -eq 0) {
        Write-Host "Memory loaded ($($entries.Count) entries), but no high-confidence rules yet." -ForegroundColor Yellow
        return
    }
    
    Write-Host "✅ Memory Context Loaded" -ForegroundColor Green
    Write-Host "   Total entries: $($entries.Count)" -ForegroundColor White
    Write-Host "   High confidence: $($highConf.Count)" -ForegroundColor White
    Write-Host ""
    Write-Host "Active Rules:" -ForegroundColor Yellow
    
    foreach ($rule in $highConf | Select-Object -First 5) {
        Write-Host "  • $($rule.category)/$($rule.subcategory): $($rule.stored_rule)" -ForegroundColor White
    }
    
    if ($highConf.Count -gt 5) {
        Write-Host "  ... and $($highConf.Count - 5) more" -ForegroundColor DarkGray
    }
    
    Write-Host ""
}

# ========================================
# MAIN CLI
# ========================================

if ($Command -eq "") {
    # Interactive mode
    Initialize-Session
    
    Write-Host "Commands: /store, /recall, /memory status, /exit" -ForegroundColor Yellow
    Write-Host ""
    
    while ($true) {
        $input = Read-Host "memory>"
        
        if ($input -eq "/exit" -or $input -eq "exit") {
            Write-Host "Goodbye!" -ForegroundColor Cyan
            break
        }
        
        if ($input -match "^/store\s+(.+)") {
            Invoke-StoreCommand -Pattern $Matches[1]
        }
        elseif ($input -match "^/recall(\s+(.+))?") {
            Invoke-RecallCommand -Topic $Matches[2]
        }
        elseif ($input -eq "/memory status") {
            Invoke-MemoryStatus
        }
        elseif ($input -ne "") {
            Write-Host "Unknown command. Try: /store, /recall, /memory status" -ForegroundColor Red
        }
    }
} else {
    # Direct command mode
    switch ($Command) {
        "/store" { Invoke-StoreCommand -Pattern ($Args -join " ") }
        "/recall" { Invoke-RecallCommand -Topic ($Args -join " ") }
        "/status" { Invoke-MemoryStatus }
        "init" { Initialize-Session }
        default { 
            Write-Host "Unknown command: $Command" -ForegroundColor Red
            Write-Host "Available: /store, /recall, /status, init" -ForegroundColor Yellow
        }
    }
}
