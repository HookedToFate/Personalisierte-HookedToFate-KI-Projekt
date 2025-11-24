# Memory Layer MVP — Day 1 Setup Guide

**Date:** 24. November 2025  
**Task:** GitHub Gist Creation + API Configuration  
**Status:** Local template created ✅ | Gist upload pending

---

## Step 1: Create GitHub Gist

### 1.1 Manual Upload (Web Interface)

1. **Navigate to:** https://gist.github.com/
2. **Login** as HookedToFate (or your GitHub account)
3. **Create New Gist:**
   - Filename: `Andre_KI_Memory.json`
   - Description: "Persistent memory storage for Andre's personalized AI system (v3.2)"
   - Content: Copy from `Andre_KI_Memory.json` (local template created)
   - Visibility: **Private** (CRITICAL: Do not make public)
4. **Click:** "Create secret gist"
5. **Save Gist URL:** `https://gist.github.com/[USERNAME]/[GIST_ID]`

---

### 1.2 Alternative: Gist CLI (Automated)

If you have `gh` CLI installed:

```powershell
# Create gist from local file
gh gist create Andre_KI_Memory.json --secret --description "Andre AI Memory Storage v3.2"

# Output will show: https://gist.github.com/[USERNAME]/[GIST_ID]
```

---

## Step 2: Generate API Token

### 2.1 Create Personal Access Token (Classic)

1. **Navigate to:** https://github.com/settings/tokens
2. **Click:** "Generate new token" → "Generate new token (classic)"
3. **Token settings:**
   - Note: `Andre_AI_Memory_Access`
   - Expiration: **No expiration** (or 1 year, renewable)
   - Scopes: **Check `gist`** (full gist access)
4. **Generate token**
5. **Copy token immediately** (only shown once)
6. **Store securely:**

```powershell
# Option A: Environment variable (session-only)
$env:GIST_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxx"

# Option B: Secure file (persistent)
"ghp_xxxxxxxxxxxxxxxxxxxx" | Out-File -FilePath "$HOME\.gist_token" -Encoding ASCII
# Then: $token = Get-Content "$HOME\.gist_token"

# Option C: Windows Credential Manager (most secure)
# Use cmdkey or Credential Manager GUI
```

---

## Step 3: Test API Connection

### 3.1 PowerShell Test Script

Save as `test_gist_connection.ps1`:

```powershell
# Configuration
$GIST_ID = "PASTE_YOUR_GIST_ID_HERE"  # From Step 1
$GIST_TOKEN = $env:GIST_TOKEN  # Or: Get-Content "$HOME\.gist_token"

# Test GET (Read Memory)
$headers = @{
    "Authorization" = "token $GIST_TOKEN"
    "Accept" = "application/vnd.github+json"
}

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/gists/$GIST_ID" -Headers $headers -Method Get
    
    $memoryContent = $response.files.'Andre_KI_Memory.json'.content | ConvertFrom-Json
    
    Write-Host "✅ Connection successful!" -ForegroundColor Green
    Write-Host "Total entries: $($memoryContent.metadata.total_entries)"
    Write-Host "Profile version: $($memoryContent.metadata.profile_version)"
    Write-Host "Schema version: $($memoryContent.metadata.schema_version)"
} catch {
    Write-Host "❌ Connection failed!" -ForegroundColor Red
    Write-Host "Error: $_"
}
```

**Run:**
```powershell
.\test_gist_connection.ps1
```

**Expected output:**
```
✅ Connection successful!
Total entries: 0
Profile version: v3.2
Schema version: 1.0
```

---

### 3.2 Test WRITE (Optional Verification)

```powershell
# Add test entry
$testEntry = @{
    id = "MEM-TEST-001"
    category = "Test"
    pattern = "Connection test from Day 1 setup"
    confidence = "High"
    status = "Active"
}

$memoryContent.memory_entries += $testEntry
$memoryContent.metadata.total_entries = 1
$memoryContent.metadata.last_updated = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")

$updatedContent = $memoryContent | ConvertTo-Json -Depth 10

$body = @{
    files = @{
        'Andre_KI_Memory.json' = @{
            content = $updatedContent
        }
    }
} | ConvertTo-Json -Depth 10

$response = Invoke-RestMethod -Uri "https://api.github.com/gists/$GIST_ID" -Headers $headers -Method Patch -Body $body -ContentType "application/json"

Write-Host "✅ Write successful! Entry MEM-TEST-001 added."
```

---

## Step 4: Configuration File

Create `memory_config.json` (local, NOT committed to git):

```json
{
  "gist_id": "PASTE_GIST_ID_HERE",
  "gist_url": "https://gist.github.com/[USERNAME]/[GIST_ID]",
  "api_endpoint": "https://api.github.com/gists/[GIST_ID]",
  "token_location": "$HOME/.gist_token",
  "local_cache_path": "./memory_cache.json",
  "sync_interval_minutes": 10,
  "backup_enabled": true,
  "backup_path": "./backups/",
  "phase": "MVP",
  "implementation_date": "2025-11-24"
}
```

---

## Step 5: Update .gitignore

Add to `.gitignore` (if not already present):

```
# Memory Layer secrets
.gist_token
memory_config.json
memory_cache.json
backups/Andre_KI_Memory_*.json

# Environment variables
.env
```

---

## Day 1 Checklist

- [ ] GitHub Gist created (private)
- [ ] Gist URL saved: `https://gist.github.com/[USERNAME]/[GIST_ID]`
- [ ] API token generated (scope: `gist`)
- [ ] Token stored securely (environment variable or credential manager)
- [ ] Connection test passed (GET request successful)
- [ ] Write test passed (optional)
- [ ] `memory_config.json` created with Gist ID
- [ ] `.gitignore` updated (token excluded from git)

**Next:** Day 2-3 — Implement `read_memory()` function (MEMORY_MVP_IMPLEMENTATION_PLAN.md)

---

## Troubleshooting

**Error: 401 Unauthorized**
- Check token validity: `gh auth status`
- Verify token has `gist` scope
- Regenerate token if expired

**Error: 404 Not Found**
- Verify Gist ID is correct
- Ensure Gist is not deleted
- Check Gist is associated with correct account

**Error: Rate Limit Exceeded**
- GitHub API: 5000 requests/hour (authenticated)
- Wait 1 hour or implement exponential backoff

---

## Security Notes

⚠️ **CRITICAL:**
- Gist must be **PRIVATE** (contains personal cognitive patterns)
- Token must **NEVER** be committed to git
- Token grants **full gist access** (read/write/delete all your gists)
- Consider creating dedicated GitHub account for AI memory (optional isolation)

✅ **Best Practices:**
- Rotate token every 90 days
- Use Windows Credential Manager or equivalent vault
- Enable 2FA on GitHub account
- Monitor Gist access logs periodically

---

**Status:** Day 1 setup guide complete. Execute steps above to proceed with MVP implementation.
