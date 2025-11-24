# Memory Layer Connection Test
# Run after creating Gist and generating token

param(
    [string]$GistId = "",
    [string]$Token = $env:GIST_TOKEN
)

# Configuration
if (-not $GistId) {
    Write-Host "Enter your Gist ID (from Gist URL): " -NoNewline -ForegroundColor Yellow
    $GistId = Read-Host
}

if (-not $Token) {
    Write-Host "Token not found in environment. Checking file..." -ForegroundColor Yellow
    if (Test-Path "$HOME\.gist_token") {
        $Token = Get-Content "$HOME\.gist_token" -Raw
        $Token = $Token.Trim()
    } else {
        Write-Host "Enter your GitHub token: " -NoNewline -ForegroundColor Yellow
        $Token = Read-Host -AsSecureString
        $Token = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($Token))
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "MEMORY LAYER CONNECTION TEST" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test GET (Read Memory)
$headers = @{
    "Authorization" = "token $Token"
    "Accept" = "application/vnd.github+json"
}

Write-Host "[1/3] Testing connection to GitHub API..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/gists/$GistId" -Headers $headers -Method Get -ErrorAction Stop
    
    Write-Host "✅ Connection successful!" -ForegroundColor Green
    
    # Parse memory content
    $memoryContent = $response.files.'Andre_KI_Memory.json'.content | ConvertFrom-Json
    
    Write-Host "`n[2/3] Reading memory structure..." -ForegroundColor Yellow
    Write-Host "  Schema version: $($memoryContent.metadata.schema_version)" -ForegroundColor White
    Write-Host "  Profile version: $($memoryContent.metadata.profile_version)" -ForegroundColor White
    Write-Host "  Total entries: $($memoryContent.metadata.total_entries)" -ForegroundColor White
    Write-Host "  Last updated: $($memoryContent.metadata.last_updated)" -ForegroundColor White
    Write-Host "  Write threshold: $($memoryContent.metadata.write_threshold.default)x repetitions" -ForegroundColor White
    
    # Test WRITE
    Write-Host "`n[3/3] Testing write capability..." -ForegroundColor Yellow
    
    $testEntry = @{
        id = "MEM-TEST-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
        category = "System"
        subcategory = "Test"
        pattern = "Connection test from PowerShell script"
        stored_rule = "Test entry created during Day 1 setup"
        confidence = "High"
        repetition_count = 1
        first_observed = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")
        last_reinforced = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")
        session_ids = @("setup-session-001")
        recall_id = "9999"
        version = "1.0"
        status = "Test"
    }
    
    $memoryContent.memory_entries += $testEntry
    $memoryContent.metadata.total_entries = $memoryContent.memory_entries.Count
    $memoryContent.metadata.last_updated = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")
    
    $updatedContent = $memoryContent | ConvertTo-Json -Depth 10
    
    $body = @{
        files = @{
            'Andre_KI_Memory.json' = @{
                content = $updatedContent
            }
        }
    } | ConvertTo-Json -Depth 10
    
    $writeResponse = Invoke-RestMethod -Uri "https://api.github.com/gists/$GistId" -Headers $headers -Method Patch -Body $body -ContentType "application/json" -ErrorAction Stop
    
    Write-Host "✅ Write successful!" -ForegroundColor Green
    Write-Host "  Entry ID: $($testEntry.id)" -ForegroundColor White
    Write-Host "  Gist updated at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White
    
    # Save config
    Write-Host "`n[FINAL] Saving configuration..." -ForegroundColor Yellow
    
    $config = @{
        gist_id = $GistId
        gist_url = "https://gist.github.com/$GistId"
        api_endpoint = "https://api.github.com/gists/$GistId"
        raw_url = $response.files.'Andre_KI_Memory.json'.raw_url
        token_location = "$HOME\.gist_token"
        local_cache_path = "./memory_cache.json"
        sync_interval_minutes = 10
        backup_enabled = $true
        backup_path = "./backups/"
        phase = "MVP"
        implementation_date = (Get-Date).ToString("yyyy-MM-dd")
        last_test = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        test_status = "PASSED"
    }
    
    $config | ConvertTo-Json -Depth 5 | Out-File -FilePath "memory_config.json" -Encoding UTF8
    
    Write-Host "✅ Configuration saved to memory_config.json" -ForegroundColor Green
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "ALL TESTS PASSED ✅" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "`nNext: Proceed to Day 2-3 (read_memory implementation)" -ForegroundColor Yellow
    Write-Host "Run: .\memory_layer.ps1" -ForegroundColor Yellow
    
} catch {
    Write-Host "❌ Test failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "`nTroubleshooting:" -ForegroundColor Yellow
        Write-Host "- Verify token is valid (check expiration)" -ForegroundColor White
        Write-Host "- Ensure token has 'gist' scope" -ForegroundColor White
        Write-Host "- Regenerate token if needed" -ForegroundColor White
    } elseif ($_.Exception.Response.StatusCode -eq 404) {
        Write-Host "`nTroubleshooting:" -ForegroundColor Yellow
        Write-Host "- Check Gist ID is correct" -ForegroundColor White
        Write-Host "- Verify Gist exists and is not deleted" -ForegroundColor White
        Write-Host "- Ensure Gist belongs to authenticated account" -ForegroundColor White
    }
    
    exit 1
}
