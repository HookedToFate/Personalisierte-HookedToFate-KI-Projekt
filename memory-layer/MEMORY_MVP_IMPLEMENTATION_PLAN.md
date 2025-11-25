# MEMORY LAYER MVP — IMPLEMENTATION PLAN

**Version:** 1.0  
**Created:** 24. November 2025  
**Target Completion:** Dezember 2025 (2 Wochen)  
**Status:** Ready to Start (All Blockers Resolved)

---

## Process Flow (ASCII)

```
┌─────────────────────────────────────────────────────────────────────┐
│                     SESSION START (User Input)                      │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │   Read Memory (Gist)   │
                    │  GET Andre_KI_Memory   │
                    └────────────┬───────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
          ┌──────────────────┐      ┌─────────────────┐
          │  Entries Found?  │      │  Empty Memory   │
          │  YES             │      │  NO             │
          └────────┬─────────┘      └────────┬────────┘
                   │                         │
                   ▼                         ▼
      ┌────────────────────────┐   ┌────────────────────┐
      │ Inject High-Confidence │   │ Continue Session   │
      │ Rules into Context     │   │ (No Injection)     │
      └────────────┬───────────┘   └────────────────────┘
                   │
                   └──────────────┬─────────────────────────────────┐
                                  │                                 │
                                  ▼                                 │
                   ┌──────────────────────────┐                    │
                   │  USER INTERACTION LOOP   │                    │
                   │  (Chat, Commands, etc.)  │                    │
                   └────────────┬─────────────┘                    │
                                │                                  │
                   ┌────────────┴────────────┐                     │
                   │                         │                     │
                   ▼                         ▼                     │
        ┌──────────────────┐      ┌──────────────────┐            │
        │ Command Detected?│      │ Pattern Detected?│            │
        │ (/store, /recall)│      │ (Correction 3x)  │            │
        └────────┬─────────┘      └────────┬─────────┘            │
                 │                         │                       │
        ┌────────┴────────┐       ┌────────┴────────┐             │
        │                 │       │                 │             │
        ▼                 ▼       ▼                 ▼             │
   ┌─────────┐    ┌──────────┐ ┌────────────┐  ┌──────────┐     │
   │ /store  │    │ /recall  │ │ Threshold  │  │ Continue │     │
   │         │    │          │ │ Met (3x)?  │  │ Session  │     │
   └────┬────┘    └────┬─────┘ └─────┬──────┘  └────┬─────┘     │
        │              │             │              │            │
        │              │        ┌────┴─────┐        │            │
        │              │        │ YES  NO  │        │            │
        │              │        │  ▼    └──┼────────┘            │
        │              │        │  │       │                     │
        │              │   ┌────┴──▼───────┘                     │
        │              │   │                                     │
        ▼              ▼   ▼                                     │
   ┌──────────────────────────────────┐                         │
   │   MEMORY WRITE ATTEMPT           │                         │
   │   (Manual or Threshold-Triggered)│                         │
   └────────────────┬─────────────────┘                         │
                    │                                            │
                    ▼                                            │
        ┌───────────────────────┐                               │
        │ Conflict Detection    │                               │
        │ validate_memory_write │                               │
        └───────────┬───────────┘                               │
                    │                                            │
       ┌────────────┴────────────┐                              │
       │                         │                              │
       ▼                         ▼                              │
┌──────────────┐        ┌─────────────────┐                    │
│ No Conflict  │        │ Conflict Found! │                    │
└──────┬───────┘        └────────┬────────┘                    │
       │                         │                              │
       │                    ┌────┴────┐                         │
       │                    ▼         ▼                         │
       │           ┌─────────────────────────┐                 │
       │           │ Show Options:           │                 │
       │           │ A. Keep old rule        │                 │
       │           │ B. Replace with new     │                 │
       │           │ C. Context-dependent    │                 │
       │           └──────────┬──────────────┘                 │
       │                      │                                │
       │                 ┌────┴────┐                           │
       │                 ▼    ▼    ▼                           │
       │              [A] [B] [C]                              │
       │                 │    │    │                           │
       └─────────────────┴────┴────┘                           │
                         │                                     │
                         ▼                                     │
            ┌────────────────────────┐                         │
            │  WRITE TO GIST         │                         │
            │  POST Andre_KI_Memory  │                         │
            │  Update metadata       │                         │
            └────────────┬───────────┘                         │
                         │                                     │
                         ▼                                     │
            ┌────────────────────────┐                         │
            │ Update CHANGELOG?      │                         │
            │ (If High Confidence)   │                         │
            └────────────┬───────────┘                         │
                         │                                     │
            ┌────────────┴────────────┐                        │
            │                         │                        │
            ▼                         ▼                        │
     ┌──────────────┐        ┌───────────────┐                │
     │ Semantic     │        │ Non-Semantic  │                │
     │ Change →     │        │ Skip          │                │
     │ Log CHANGELOG│        │               │                │
     └──────┬───────┘        └───────┬───────┘                │
            │                        │                         │
            └────────────┬───────────┘                         │
                         │                                     │
                         ▼                                     │
            ┌────────────────────────┐                         │
            │ Confirmation Message   │                         │
            │ "Stored: MEM-XXX"      │                         │
            └────────────┬───────────┘                         │
                         │                                     │
                         └─────────────────────────────────────┘
                                       │
                                       ▼
                          ┌────────────────────────┐
                          │  Continue Session      │
                          │  (Memory Active)       │
                          └────────────────────────┘


LEGEND:
  ┌─────┐
  │ Box │  = Process/Action
  └─────┘
  
    ▼     = Flow direction
  
  ┌──┴──┐
  │ YES │  = Decision branch
  └─────┘
```

---

## Executive Summary

**Goal:** Implement Memory Persistence Layer MVP — basic read/write with manual confirmation, enabling cross-session context continuity.

**Scope:** Phase 1 (MVP) from MEMORY_PERSISTENCE_ARCHITECTURE.md  
**Out of Scope:** Auto-detection (Phase 2), intelligent memory suggestions (Phase 3)

**Success Criteria:**
1. ✅ `Andre_KI_Memory.json` initialized and cloud-synced
2. ✅ AI reads memory at session start (instant context loading)
3. ✅ Manual commands functional (`/store`, `/recall`, `/memory status`)
4. ✅ Confirmation-First Policy enforced (no auto-writes without approval)
5. ✅ Conflict detection operational (flags contradictions before write)

**Timeline:** 2 weeks (10 business days, ~20 hours total effort)

---

## Prerequisites (Already Complete ✅)

1. ✅ Memory schema defined (JSON format, category taxonomy) — MEMORY_PERSISTENCE_ARCHITECTURE.md Section 2
2. ✅ Memory Write Threshold confirmed (3x repetitions, session-übergreifend, 30-day window)
3. ✅ Command syntax specified (`/store`, `/recall`, `/rollback`, `/threshold`) — COMMAND_SYNTAX_GUIDE.md
4. ✅ Conflict resolution logic documented — MEMORY_PERSISTENCE_ARCHITECTURE.md Section 5
5. ✅ RECALL Index integration mapped — Andre_RECALL_Index.md (ID 1000-3499)
6. ✅ GitHub Gist selected as storage backend (Option A recommended)

---

## Phase 1: MVP Deliverables (2 Weeks)

### **Week 1: Foundation Setup (Days 1-5)**

#### **Day 1: Storage Backend Setup**
**Tasks:**
1. Create private GitHub Gist: `Andre_KI_Memory.json`
2. Initialize with empty schema:
   ```json
   {
     "memory_entries": [],
     "metadata": {
       "schema_version": "1.0",
       "last_updated": "2025-11-24T00:00:00Z",
       "total_entries": 0,
       "profile_version": "v3.2"
     }
   }
   ```
3. Generate Gist API token (read/write permissions)
4. Test API connectivity: GET request returns empty entries
5. Document Gist URL + token storage location (secure)

**Deliverables:**
- ✅ `Andre_KI_Memory.json` live on GitHub Gist
- ✅ API token secured
- ✅ Connection test passed

**Effort:** 2 hours

---

#### **Day 2-3: Memory Read Implementation**
**Tasks:**
1. Implement `read_memory()` function:
   ```python
   def read_memory(category=None, subcategory=None, recall_id=None):
       # GET request to Gist API
       # Parse JSON response
       # Filter by category/subcategory if specified
       # Return list of matching entries
   ```
2. Session startup hook: Auto-call `read_memory()` on first user input
3. Context injection: Load relevant entries into system prompt
4. Test cases:
   - Empty memory → no injection
   - Single entry (Preference/Tone) → inject into prompt
   - Multiple entries → prioritize by confidence level
   - Category filter: `read_memory(category="Pattern")`

**Deliverables:**
- ✅ Memory read function operational
- ✅ Session startup auto-loads memory
- ✅ Context injection verified (AI references stored rules)

**Effort:** 6 hours (2 days × 3 hours)

---

#### **Day 4-5: Manual Commands (`/store`, `/recall`)**
**Tasks:**
1. Implement `/store [pattern]` command:
   ```python
   def command_store(user_input):
       # Parse pattern from input
       # Generate memory entry (ID, category, pattern, confidence="Manual")
       # POST to Gist API
       # Update local cache
       # Return confirmation message
   ```
2. Implement `/recall [topic]` command:
   ```python
   def command_recall(topic):
       # Query memory: search by category, subcategory, or keyword
       # Format results (ID, pattern, confidence, last_reinforced)
       # Display to user (max 10 results, sorted by relevance)
   ```
3. Implement `/memory status`:
   ```python
   def command_memory_status():
       # Return: total_entries, by category, recent additions (last 7 days)
       # Display pending confirmations (if any)
   ```
4. Test all commands with real data

**Deliverables:**
- ✅ `/store` functional (writes to Gist)
- ✅ `/recall` functional (searches memory)
- ✅ `/memory status` displays summary
- ✅ User documentation (command usage examples)
- ✅ Tested against live Gist (25.11.2025): `/status`, `/store`, `/recall` executed; conflict prompt fired, Choice C works; Choice B now warns if existing entry not found to archive (edge case to refine). IDs now generated via max(existing)+1 (avoids duplicates). Test entries cleaned (MEM-TEST* removed).

**Effort:** 6 hours (2 days × 3 hours)

---

### **Week 2: Confirmation-First Policy + Conflict Detection (Days 6-10)**

#### **Day 6-7: Confirmation-First Policy**
**Tasks:**
1. Pattern detection counter (in-session only for MVP):
   ```python
   session_patterns = {}  # pattern -> count
   
   def detect_pattern(user_correction):
       # Identify correction type (tone, format, decision-shrinking trigger)
       # Increment counter: session_patterns[pattern] += 1
       # If count >= 3 (threshold) → trigger confirmation prompt
   ```
2. Confirmation prompt implementation:
   ```python
   def prompt_memory_confirmation(pattern, count):
       # Format: "I noticed you've corrected X 3 times. Store as permanent rule?"
       # Options: [Yes] [No] [Ask Later]
       # On "Yes" → call store_memory()
       # On "No" → reset counter, suppress for 10 sessions
       # On "Ask Later" → keep counter, prompt again at count+2
   ```
3. Test confirmation flow:
   - Repeat same correction 3x → prompt appears
   - User says "Yes" → memory written, CHANGELOG updated (if semantic)
   - User says "No" → counter reset, no further prompts

**Deliverables:**
- ✅ Pattern detection counter operational
- ✅ Confirmation prompt triggers at 3x threshold
- ✅ Yes/No/Ask Later handling verified

**Effort:** 6 hours (2 days × 3 hours)

---

#### **Day 8-9: Conflict Detection**
**Tasks:**
1. Implement `validate_memory_write()`:
   ```python
   def validate_memory_write(new_entry):
       existing_memory = read_memory(category=new_entry['category'])
       conflicts = []
       
       for entry in existing_memory:
           if contradicts(entry['stored_rule'], new_entry['pattern']):
               conflicts.append({
                   'existing_id': entry['id'],
                   'existing_rule': entry['stored_rule'],
                   'new_rule': new_entry['pattern']
               })
       
       # Check core value violations (Full.md Section 4.1)
       if violates_autonomy_principle(new_entry):
           conflicts.append({'type': 'CORE_VALUE_VIOLATION'})
       
       return conflicts
   ```
2. Conflict resolution UI:
   ```
   Conflict detected:
   - Stored: "Andre prefers ultra-compressed outputs (#Kurz)" (MEM-001)
   - New pattern: "Andre requested long explanation 3x this week"
   
   Options:
   A. Keep old rule (compress by default)
   B. Replace with new rule (expand by default)
   C. Context-dependent (compress for tech, expand for philosophy)
   [Type A, B, or C]
   ```
3. Test conflict scenarios:
   - Contradiction detected → options presented
   - User selects A/B/C → memory updated accordingly
   - CHANGELOG entry created (if semantic change)

**Deliverables:**
- ✅ Conflict detection pre-write validation
- ✅ Conflict resolution UI functional
- ✅ CHANGELOG integration (semantic changes logged)

**Effort:** 6 hours (2 days × 3 hours)

---

#### **Day 10: Integration Testing + Documentation**
**Tasks:**
1. End-to-end testing:
   - Session 1: AI reads empty memory → no context injection
   - Session 1: User corrects tone 3x → confirmation prompt → store
   - Session 2: AI reads memory → context injection (stored rule applied)
   - Session 2: User corrects contradicting pattern → conflict detected → resolution
   - Session 3: `/recall Tone` → displays stored entries
   - Session 3: `/memory status` → shows 2 entries
2. Error handling:
   - Gist API fails → fallback to local cache (graceful degradation)
   - Invalid JSON → log error, continue with empty memory
   - Network timeout → retry 3x, then abort with user notification
3. User documentation:
   - Update COMMAND_SYNTAX_GUIDE.md with `/store`, `/recall`, `/memory status` usage examples
   - Create MEMORY_MVP_USER_GUIDE.md (1-page: how to use memory commands, what to expect)

**Deliverables:**
- ✅ End-to-end test passed (3-session scenario)
- ✅ Error handling verified
- ✅ User documentation updated

**Effort:** 2 hours

---

## Technical Implementation Details

### **Stack & Tools**

**Backend (Memory Storage):**
- GitHub Gist API (private gist)
- REST endpoints: GET/POST/PATCH
- Authentication: Personal Access Token (PAT)

**Frontend (AI Interface):**
- Python (or JavaScript, depending on deployment context)
- Session state management (in-memory cache for current session)
- Command parser (regex-based detection for `/store`, `/recall`, etc.)

**Integration:**
- VSCode Copilot: Extend via extension API (if applicable)
- ChatGPT Web: Manual commands in chat (no native integration)
- API-based chat systems: Direct API calls (easiest path)

**Recommended for MVP:** API-based implementation (Python script or Node.js server)

---

### **Code Structure (Pseudocode)**

```python
# memory_layer.py

import requests
import json
from datetime import datetime

GIST_URL = "https://gist.githubusercontent.com/[USER]/[GIST_ID]/raw/Andre_KI_Memory.json"
GIST_API_URL = "https://api.github.com/gists/[GIST_ID]"
GIST_TOKEN = "[SECURE_TOKEN]"

# --- MEMORY READ ---
def read_memory(category=None, subcategory=None, recall_id=None):
    response = requests.get(GIST_URL)
    memory = json.loads(response.text)
    
    entries = memory['memory_entries']
    
    if category:
        entries = [e for e in entries if e['category'] == category]
    if subcategory:
        entries = [e for e in entries if e['subcategory'] == subcategory]
    if recall_id:
        entries = [e for e in entries if e['recall_id'] == str(recall_id)]
    
    return entries

# --- MEMORY WRITE ---
def store_memory(pattern, category, subcategory, confidence="Manual"):
    memory = read_all_memory()
    
    # Conflict detection
    conflicts = validate_memory_write({
        'pattern': pattern,
        'category': category,
        'subcategory': subcategory
    })
    
    if conflicts:
        resolution = resolve_conflict(conflicts)
        if resolution == 'ABORT':
            return "Write aborted by user"
    
    # Generate new entry
    entry_id = f"MEM-{datetime.now().strftime('%Y-%m-%d')}-{len(memory['memory_entries'])+1:03d}"
    new_entry = {
        "id": entry_id,
        "category": category,
        "subcategory": subcategory,
        "pattern": pattern,
        "stored_rule": pattern,  # For MVP, rule = pattern
        "confidence": confidence,
        "repetition_count": 3 if confidence == "High" else 1,
        "first_observed": datetime.now().isoformat(),
        "last_reinforced": datetime.now().isoformat(),
        "session_ids": [get_current_session_id()],
        "recall_id": None,  # Manual assignment later
        "version": "1.0",
        "status": "Active"
    }
    
    memory['memory_entries'].append(new_entry)
    memory['metadata']['total_entries'] += 1
    memory['metadata']['last_updated'] = datetime.now().isoformat()
    
    # POST to Gist
    response = requests.patch(
        GIST_API_URL,
        headers={'Authorization': f'token {GIST_TOKEN}'},
        json={
            'files': {
                'Andre_KI_Memory.json': {
                    'content': json.dumps(memory, indent=2)
                }
            }
        }
    )
    
    return f"Stored: {entry_id}"

# --- CONFLICT DETECTION ---
def validate_memory_write(new_entry):
    existing = read_memory(category=new_entry['category'])
    conflicts = []
    
    for entry in existing:
        if contradicts(entry['stored_rule'], new_entry['pattern']):
            conflicts.append({
                'existing_id': entry['id'],
                'existing_rule': entry['stored_rule'],
                'new_rule': new_entry['pattern']
            })
    
    return conflicts

def contradicts(rule1, rule2):
    # Simple heuristic for MVP: keyword overlap + negation detection
    # Example: "compress" vs "expand" = conflict
    # Example: "no emojis" vs "use emojis" = conflict
    # More sophisticated logic in Phase 2
    
    negation_pairs = [
        ('compress', 'expand'),
        ('short', 'long'),
        ('no', 'use'),
        ('forbidden', 'allowed')
    ]
    
    for neg1, neg2 in negation_pairs:
        if neg1 in rule1.lower() and neg2 in rule2.lower():
            return True
        if neg2 in rule1.lower() and neg1 in rule2.lower():
            return True
    
    return False

# --- COMMAND HANDLERS ---
def handle_command(user_input):
    if user_input.startswith('/store'):
        pattern = user_input.replace('/store', '').strip()
        category = prompt_user("Category? [Preference/Pattern/Project/Constraint]")
        subcategory = prompt_user("Subcategory? (e.g., Tone, Decision-Making)")
        return store_memory(pattern, category, subcategory, confidence="Manual")
    
    elif user_input.startswith('/recall'):
        topic = user_input.replace('/recall', '').strip()
        results = read_memory()  # Search all, filter by keyword
        filtered = [r for r in results if topic.lower() in r['pattern'].lower()]
        return format_recall_results(filtered)
    
    elif user_input == '/memory status':
        memory = read_all_memory()
        total = memory['metadata']['total_entries']
        by_category = {}
        for entry in memory['memory_entries']:
            by_category[entry['category']] = by_category.get(entry['category'], 0) + 1
        
        return f"Total: {total} | By category: {by_category}"

# --- SESSION STARTUP ---
def on_session_start():
    memory = read_all_memory()
    
    # Inject high-confidence entries into system prompt
    high_conf = [e for e in memory['memory_entries'] if e['confidence'] == 'High']
    
    context = "\n".join([
        f"- {entry['category']}/{entry['subcategory']}: {entry['stored_rule']}"
        for entry in high_conf
    ])
    
    return f"[Memory Context Loaded]\n{context}"
```

---

## Deployment Options

### **Option A: Local Script (Easiest for MVP)**
- Python script runs locally
- User invokes via command line: `python memory_layer.py --command /store "No emojis"`
- Works with any AI system (copy-paste results into chat)

**Pros:** Fast setup, no infrastructure needed  
**Cons:** Manual invocation, no automatic session startup

---

### **Option B: VSCode Extension Integration**
- Extend existing Copilot extension
- Memory layer runs in background (automatic session startup)
- Commands available via Copilot chat (`@memory /store`, `@memory /recall`)

**Pros:** Seamless integration, automatic context loading  
**Cons:** Requires extension development (more complex)

---

### **Option C: Middleware Server**
- Node.js server between user and AI API
- Intercepts requests/responses, injects memory context
- Commands parsed server-side

**Pros:** Works with any AI interface (ChatGPT web, API, etc.)  
**Cons:** Requires server hosting, more setup

---

**Recommendation for MVP:** **Option A (Local Script)**  
- Fastest path to functional system (1 week instead of 2)
- Validates core logic before investing in integration
- Can migrate to Option B/C in Phase 2

---

## Risk Management

### **Risk 1: Gist API Rate Limits**
**Probability:** Low (60 requests/hour for authenticated users)  
**Impact:** Medium (memory writes fail during high-frequency sessions)  
**Mitigation:**
- Implement local cache (write to cache first, sync to Gist every 10 min)
- Batch writes (queue multiple entries, POST once)
- Fallback to local file if API unavailable

---

### **Risk 2: Conflict Detection False Positives**
**Probability:** Medium (simple keyword matching in MVP)  
**Impact:** Low (user prompted unnecessarily, can override)  
**Mitigation:**
- Allow user to force-write: `/store --force [pattern]`
- Log false positives for Phase 2 improvement
- Refine `contradicts()` logic based on real usage

---

### **Risk 3: CHANGELOG Spam (Too Many Semantic Changes)**
**Probability:** Medium (every memory write triggers CHANGELOG entry?)  
**Impact:** Low (CHANGELOG becomes noisy, but not broken)  
**Mitigation:**
- Only log CHANGELOG for **High Confidence** entries (repetition_count >= 5)
- Batch CHANGELOG updates (weekly summary instead of per-entry)
- Define "semantic change" threshold (affects core behavior only)

---

## Success Metrics (MVP)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Memory Entries Stored | 10-20 | Count entries in `Andre_KI_Memory.json` after 2 weeks |
| Session Startup Success Rate | >90% | Track: successful memory reads / total sessions |
| Confirmation Prompts per Session | 0-1 | Average prompts shown (target: minimal friction) |
| Conflict Detections | 1-2 (testing) | Total conflicts flagged (validate logic works) |
| Command Success Rate | 100% | `/store`, `/recall`, `/memory status` execute without errors |
| User Satisfaction | "Useful" | Subjective: Does Andre stop re-explaining preferences? |

---

## Post-MVP: Phase 2 & 3 Preview

### **Phase 2: Auto-Detection (January 2026)**
- Cross-session pattern tracking (not just in-session)
- Repetition counter persists across sessions
- 3x threshold triggers confirmation automatically
- CHANGELOG auto-update for semantic changes

**Deliverables:**
- Session metadata storage (session_id, start/end time)
- Cross-session pattern aggregation
- Auto-prompt at 3x threshold (even if sessions are days apart)

---

### **Phase 3: Intelligent Memory (Q1 2026)**
- AI suggests memory writes proactively ("I noticed this pattern — worth storing?")
- Context-aware auto-load (mention Nyssa → load Nyssa-specific memory)
- Memory-driven behavior adaptation (AI adjusts tone without explicit command)
- Integration with andre-profile-guardian agent (automated consistency checks)

**Deliverables:**
- Proactive memory suggestions
- Project-context switching (Nyssa mode, OMEGA mode)
- Agent integration (PR checks for memory conflicts)

---

## Next Steps (Immediate Actions)

### **Week 1 Kickoff (Tomorrow):**
1. **Day 1 Morning:** Create GitHub Gist (`Andre_KI_Memory.json`)
2. **Day 1 Afternoon:** Generate API token, test GET request
3. **Day 2-3:** Implement `read_memory()` + session startup hook
4. **Day 4-5:** Implement `/store` and `/recall` commands

### **Decision Points:**
- **Deployment Option:** Confirm Option A (Local Script) vs. B (VSCode Extension) — **Recommended: A for MVP**
- **CHANGELOG Threshold:** Confirm only High Confidence entries log to CHANGELOG — **Recommended: Yes**
- **Local Cache Strategy:** Confirm Gist-first vs. local-first — **Recommended: Local-first with 10-min sync**

---

## Resources & References

- **Technical Spec:** MEMORY_PERSISTENCE_ARCHITECTURE.md (Section 8: Implementation Roadmap)
- **Command Syntax:** COMMAND_SYNTAX_GUIDE.md (Section 6.3: Memory Commands)
- **JSON Schema:** MEMORY_PERSISTENCE_ARCHITECTURE.md (Section 2.2)
- **Conflict Resolution:** MEMORY_PERSISTENCE_ARCHITECTURE.md (Section 5)
- **RECALL Index:** Andre_RECALL_Index.md (ID 2900-2999: Memory Protocol)

---

## ⚠️ CRITICAL DISCLAIMER: Memory Layer Boundaries

**Memory Layer stores *persistent rules about Andre's preferences/patterns*, NOT transient conversation state, content archives, or complex logic.** Do not use for: current task progress, large documents, code snippets, security credentials, analytics data, multi-step reasoning chains, or temporary session variables. If it's not a simple, cross-session rule about how Andre thinks/prefers interaction, it doesn't belong here.

---

## Approval & Sign-Off

**Plan Status:** ✅ Ready for Execution  
**Blocker Status:** All resolved (Memory Write Threshold confirmed: 3x repetitions)  
**Timeline:** 2 weeks (10 business days, ~20 hours)  
**Budget:** $0 (GitHub Gist free, local development)

**Next Action:** Create GitHub Gist + generate API token (Day 1, Task 1)

---

**END OF IMPLEMENTATION PLAN**
