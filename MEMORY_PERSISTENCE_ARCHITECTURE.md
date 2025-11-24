# MEMORY PERSISTENCE ARCHITECTURE

**Version:** 1.0  
**Last Updated:** 24. November 2025  
**Status:** ✅ **ACTIVE** (Memory Write Threshold confirmed: 3x repetitions)  
**Purpose:** Technical specification for persistent memory system — cloud sync, auto-write triggers, versioning, data flow

---

## 1. System Overview

### 1.1 Architecture Goals

The Memory Persistence Layer enables:
1. **Cross-Session Continuity** — AI "remembers" patterns, preferences, past decisions without re-explanation
2. **Reinforced Learning** — Repeated corrections by Andre become fixed rules
3. **Conflict Detection** — Auto-flag when new input contradicts stored memory
4. **Rollback Capability** — Memory changes are versioned; Andre can revert unwanted adaptations

### 1.2 Core Principle (from Refined.txt Section 19.1)

> **Read-Only vs. Write:**  
> - KI liest immer (always reads memory)  
> - KI schreibt neue, signifikante Muster erst nach Bestätigung oder bei starker Evidenz (Wiederholung)

**Translation:** AI operates on **Confirmation-First Policy** by default. Auto-write only when repetition threshold met OR explicit confirmation given.

### 1.3 Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                       USER INPUT (Andre)                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  INTENT INTERPRETATION (3-Layer Scan)                           │
│  → Surface Request | Latent Objective | Cognitive Pattern       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  MEMORY READ (Always Active)                                    │
│  → Query: Andre_KI_Memory.json for relevant context             │
│  → Cross-reference: RECALL Index (ID 1000-3499)                 │
│  → Check: Does stored memory conflict with new input?           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
        ┌───────────────────┐  ┌────────────────────┐
        │ NO CONFLICT       │  │ CONFLICT DETECTED  │
        │ → Process Normal  │  │ → Flag + Ask Andre │
        └────────┬──────────┘  └──────────┬─────────┘
                 │                        │
                 └────────────┬───────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PATTERN DETECTION (Post-Response)                              │
│  → Count: How many times has Andre corrected/repeated pattern?  │
│  → Evaluate: Threshold met? (See Section 4.3 — PENDING)         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
        ┌───────────────────┐  ┌──────────────────────┐
        │ BELOW THRESHOLD   │  │ THRESHOLD MET        │
        │ → Log, No Write   │  │ → Confirmation-First │
        └───────────────────┘  └──────────┬───────────┘
                                           │
                                           ▼
                              ┌─────────────────────────┐
                              │ "Store this in memory?" │
                              │ [Yes] [No] [Ask Later]  │
                              └──────────┬──────────────┘
                                         │
                                ┌────────┴────────┐
                                │                 │
                                ▼                 ▼
                    ┌─────────────────┐  ┌────────────────┐
                    │ YES → WRITE     │  │ NO → DISCARD   │
                    │ POST to Memory  │  │ Clear Counter  │
                    └────────┬────────┘  └────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  MEMORY WRITE (Cloud Sync)                                      │
│  → POST Andre_KI_Memory.json with versioned entry               │
│  → Update CHANGELOG.md (if semantic profile change)             │
│  → Tag: Session ID, Timestamp, Confidence Level, Category       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Memory Storage Schema

### 2.1 File Structure

**Primary Storage:** `Andre_KI_Memory.json` (cloud-synced)  
**Backup/Versioning:** `Andre_KI_Memory_v[X.Y].json` (timestamped snapshots)  
**Index Reference:** `Andre_RECALL_Index.md` (human-readable cross-reference)

### 2.2 JSON Schema (Entry Format)

```json
{
  "memory_entries": [
    {
      "id": "MEM-2025-11-001",
      "category": "Preference",
      "subcategory": "Tone",
      "pattern": "Andre corrects AI for using coach-speak",
      "stored_rule": "Forbidden: 'Du schaffst das!', 'Keine Sorge', 'Das wird schon'",
      "confidence": "High",
      "repetition_count": 3,
      "first_observed": "2025-11-15",
      "last_reinforced": "2025-11-23",
      "session_ids": ["sess-001", "sess-007", "sess-012"],
      "recall_id": "1201",
      "version": "1.0",
      "status": "Active"
    },
    {
      "id": "MEM-2025-11-002",
      "category": "Pattern",
      "subcategory": "Decision-Making",
      "pattern": "When Andre says 'egal' → Decision-Shrinking triggered",
      "stored_rule": "Max 2 options + micro-step + exit option",
      "confidence": "High",
      "repetition_count": 5,
      "first_observed": "2025-11-10",
      "last_reinforced": "2025-11-22",
      "session_ids": ["sess-003", "sess-005", "sess-008", "sess-011", "sess-014"],
      "recall_id": "3014",
      "version": "1.0",
      "status": "Active"
    },
    {
      "id": "MEM-2025-11-003",
      "category": "Project",
      "subcategory": "Nyssa",
      "pattern": "Nyssa-character consistency: autonomy > welfare > pleasure",
      "stored_rule": "Character checks: Does action align with values hierarchy?",
      "confidence": "Medium",
      "repetition_count": 2,
      "first_observed": "2025-11-18",
      "last_reinforced": "2025-11-20",
      "session_ids": ["sess-009", "sess-010"],
      "recall_id": "2001",
      "version": "1.0",
      "status": "Active"
    }
  ],
  "metadata": {
    "schema_version": "1.0",
    "last_updated": "2025-11-23T14:30:00Z",
    "total_entries": 3,
    "profile_version": "v3.2"
  }
}
```

### 2.3 Category Taxonomy

| Category | Subcategories | Examples |
|----------|---------------|----------|
| **Preference** | Tone, Format, Depth, Style | "No emojis", "Cynicism=3 default", "Absolute Mode specs" |
| **Pattern** | Decision-Making, Overload, Commands | "Egal → shrink", "3+ options → paralyse", "#Fokus 1 = urgent" |
| **Project** | Wunderhaus, Nyssa, OMEGA VM, etc. | "Nyssa values hierarchy", "OMEGA allows paradox" |
| **Constraint** | Technical, Time, Cognitive | "Setup friction = abort trigger", "10-min micro-steps only" |
| **Anti-Pattern** | Forbidden Actions | "Coach-speak banned", "No unsolicited motivation" |
| **Conflict-Resolution** | Value Trade-offs | "Autonomy > Outcome", "Meaning > Efficiency" |

---

## 3. Cloud Sync & API Integration

### 3.1 Technical Requirements

**Storage Backend Options:**
- **Option A:** GitHub Gist (private) — version control native, JSON-friendly, API-ready
- **Option B:** Custom Cloud Service (Firebase, Supabase) — real-time sync, structured queries
- **Option C:** Local File + Git Sync — offline-first, manual push/pull

**Recommended:** Option A (GitHub Gist) for MVP — leverage existing GitHub ecosystem, no extra infra.

### 3.2 API Endpoints (Conceptual)

```http
# Read Memory (Always Active)
GET /api/memory?category=Preference&subcategory=Tone
Response: { "entries": [...], "recall_ids": ["1201", "1202"] }

# Write Memory (Post-Confirmation)
POST /api/memory
Body: {
  "category": "Pattern",
  "pattern": "Andre says 'dann halt nicht' 3x → store as abort signal",
  "confidence": "High",
  "session_id": "sess-015"
}
Response: { "id": "MEM-2025-11-004", "status": "Stored", "version": "1.0" }

# Conflict Check (Pre-Write Validation)
POST /api/memory/validate
Body: {
  "new_rule": "Andre prefers long explanations",
  "category": "Preference"
}
Response: {
  "conflict": true,
  "existing_rule": "MEM-2025-11-001: Prefers ultra-compressed (#Kurz default)",
  "action": "Flag for Andre to resolve"
}

# Rollback (Versioning)
POST /api/memory/rollback
Body: { "entry_id": "MEM-2025-11-001", "target_version": "0.9" }
Response: { "status": "Reverted", "message": "Coach-speak now allowed (v0.9 rules)" }
```

### 3.3 Chat Sync Integration

**User Workflow:**
1. Andre interacts across multiple sessions (ChatGPT web, API, VSCode Copilot, etc.)
2. Each session writes to shared `Andre_KI_Memory.json` (cloud-synced)
3. AI reads memory at start of every session → instant context continuity
4. Pattern detection runs post-response → increments `repetition_count`
5. Threshold met → AI asks: "Store this in memory?" → POST on confirmation

**Session Handoff:**
- Session metadata stored: `session_id`, `start_time`, `end_time`, `context_summary`
- Cross-session pattern tracking: "Andre said X in sess-005, repeated in sess-012 → threshold met"

---

## 4. Auto-Write Logic & Thresholds

### 4.1 Confirmation-First Policy (Current Default)

**Rule:** AI never writes to memory without explicit confirmation, EXCEPT when:
1. Pattern repetition threshold met (see 4.3 — PENDING DECISION)
2. Andre uses explicit memory command: `/store [pattern]` or `#Memory` tag
3. Overload signal + decision-shrinking → auto-store shrinking pattern (after confirmation)

**Format:**
```
AI: "I noticed you've corrected this 3 times (coach-speak = forbidden). 
     Store as permanent rule? [Yes] [No] [Ask Later]"
```

**Andre's Response:**
- "Yes" → POST to memory, increment version, log in CHANGELOG if semantic
- "No" → Discard, reset counter, suppress future prompts for 10 sessions
- "Ask Later" → Keep counter, prompt again at threshold+2

### 4.2 Exception: Critical Patterns (Auto-Store Without Confirmation)

**Scenarios where AI auto-writes (no prompt):**
1. **Safety/Abort Signals:** "Dann halt nicht" (3x) → store as abort threshold
2. **Explicit Commands:** Andre says "Remember this" or uses `/store` → immediate write
3. **Rollback Request:** "Revert that last change" → auto-store rollback preference

**Rationale:** These are meta-level instructions about memory itself; confirmation loop = friction.

### 4.3 ⚠️ **PENDING DECISION: Memory Write Threshold**

**Core Question:** How many repetitions = "strong evidence" (starker Evidenz) for auto-write prompt?

**Options:**

| Threshold | Pros | Cons | Andre's Profile Fit |
|-----------|------|------|---------------------|
| **2x** | Fast adaptation, responsive | May over-trigger on coincidence | ⚠️ Risk: Too aggressive for "Perfektion als Blocker" pattern |
| **3x** | Balanced: strong signal, not accidental | Standard ML heuristic | ✅ Fits: "3+ options = overload" (consistent with profile logic) |
| **5x** | Conservative, high confidence | Slow adaptation, frustration risk | ❌ Conflicts: Reibungs-Allergie (high effort = abort) |

**✅ CONFIRMED DECISION (24.11.2025):**

**Default Threshold: 3x repetitions (same pattern, same context)**

**Rationale:**
- Aligns with existing profile logic: "3+ options = decision paralysis" (Section 8 Overload-Trigger)
- Balances responsiveness vs. over-fitting
- Matches Andre's tolerance for friction: 2x = possible coincidence, 3x = pattern
- Consistent with decision-shrinking protocol (max 2 options → 3+ triggers intervention)

**Session Scope:**
- **Session-übergreifend (cross-session):** Track across all sessions, not just single conversation
- **Time Window:** Pattern counts if repeated within 30 days (stale patterns = discard)
- **Context Match:** Must be same category (e.g., 3x coach-speak corrections in Tone category, not 1x Tone + 1x Format + 1x Project)

**Confidence Levels:**
- 2x = Low confidence → Log only, no prompt
- 3x = Medium confidence → Prompt for confirmation
- 5x+ = High confidence → Auto-store with notification ("Pattern stored: [rule]")

**Override Logic:**
- Andre can set custom thresholds per category: `/threshold Tone=2` or `/threshold Pattern=5`
- Overload signals bypass threshold: If "egal" appears 2x + decision-shrinking triggered → auto-prompt at 2x

**Implementation Status:** Ready for Phase 1 MVP (December 2025).

---

## 5. Conflict Detection & Resolution

### 5.1 Pre-Write Validation

Before writing to memory, AI runs conflict check:

```python
def validate_memory_write(new_entry, existing_memory):
    conflicts = []
    
    # Check: Does new rule contradict stored rule in same category?
    for entry in existing_memory:
        if entry['category'] == new_entry['category']:
            if contradicts(entry['stored_rule'], new_entry['pattern']):
                conflicts.append({
                    'existing_id': entry['id'],
                    'existing_rule': entry['stored_rule'],
                    'new_rule': new_entry['pattern'],
                    'action': 'FLAG_FOR_RESOLUTION'
                })
    
    # Check: Does new rule violate core profile values? (Full.md Section 4)
    if violates_core_values(new_entry):
        conflicts.append({
            'type': 'CORE_VALUE_VIOLATION',
            'message': 'New rule conflicts with Autonomy > Welfare > Pleasure hierarchy',
            'action': 'REJECT_AUTO_WRITE'
        })
    
    return conflicts
```

### 5.2 Conflict Resolution Workflow

**When conflict detected:**

1. **AI surfaces conflict explicitly:**
   ```
   Conflict detected:
   - Stored: "Andre prefers ultra-compressed outputs (#Kurz)" (MEM-2025-11-001)
   - New pattern: "Andre requested long explanation 3x this week"
   
   Options:
   A. Keep old rule (compress by default)
   B. Replace with new rule (expand by default)
   C. Context-dependent (compress for tech, expand for philosophy)
   ```

2. **Andre chooses:**
   - Option A/B → Update memory, increment version
   - Option C → Create context rule (stored as conditional logic)

3. **CHANGELOG Update:**
   - If semantic change (affects core behavior), log in `CHANGELOG.md` as Minor version bump
   - Example: v3.2 → v3.3 if "Tone preference changed from Cynicism=3 to Cynicism=4"

### 5.3 Rollback Mechanism

**Scenario:** Andre dislikes a recent memory update.

**Command:** `/rollback [MEM-ID]` or `"Revert that coach-speak rule"`

**Action:**
1. AI identifies entry by ID or description
2. Retrieves previous version from `Andre_KI_Memory_v[X.Y].json`
3. Restores old rule, archives new version with `status: "Reverted"`
4. Logs rollback in CHANGELOG with rationale

**Example:**
```
CHANGELOG.md entry:
## v3.3-rollback (25.11.2025)
- Reverted MEM-2025-11-005: "Allow coach-speak in creative mode"
- Reason: Andre flagged as "nervt" after 2 sessions
- Restored: MEM-2025-11-001 (coach-speak forbidden globally)
```

---

## 6. Integration with Existing Systems

### 6.1 RECALL Index Cross-Reference

**Workflow:**
- Every memory entry tagged with `recall_id` (links to `Andre_RECALL_Index.md`)
- AI can query: "Show me all memory entries related to RECALL ID 1200-1299 (Tone preferences)"
- Human-readable: Andre browses RECALL Index, sees memory IDs linked

**Example:**
```markdown
### 12. Ton & Stilpräferenzen (ID 1200-1299)
- **1201:** Zynisch, sarkastisch, trocken (Memory: MEM-2025-11-001)
- **1202:** Kaffee-Unfall-Metaphern erlaubt (Memory: MEM-2025-11-003)
```

### 6.2 CHANGELOG Synchronization

**Rule:** Memory writes that affect **semantic behavior** trigger CHANGELOG update.

**Criteria:**
- **Major Change (v3 → v4):** Core values altered (e.g., Autonomy no longer non-negotiable)
- **Minor Change (v3.2 → v3.3):** Execution logic modified (e.g., Cynicism default 3 → 4)
- **Patch Change (v3.2.0 → v3.2.1):** Clarification only (e.g., "Coach-speak includes 'Alles wird gut'")

**No CHANGELOG entry needed:**
- Project-specific memory (e.g., "Nyssa prefers blue over red")
- Session metadata (e.g., "Andre was tired in sess-012")
- Low-confidence patterns (below 3x repetition)

### 6.3 Command Syntax Integration

**New Commands (Post-Memory Layer Activation):**

| Command | Effect |
|---------|--------|
| `/store [pattern]` | Immediate write to memory (bypasses threshold) |
| `/recall [topic]` | Query memory by category/keyword |
| `/memory status` | Show: Total entries, recent additions, pending confirmations |
| `/rollback [ID]` | Revert memory entry to previous version |
| `/threshold [category]=[N]` | Set custom repetition threshold (e.g., `/threshold Tone=2`) |
| `#Memory` (inline tag) | Tag current exchange for memory storage |

**Example Usage:**
```
Andre: "Ich hasse es, wenn KI 'Du schaffst das' sagt. /store"
AI: "Stored: Coach-speak forbidden (MEM-2025-11-015). Confidence: High."

Andre: "/recall Tone"
AI: "Found 5 entries in Tone category: 
     - MEM-001: No coach-speak
     - MEM-003: Cynicism=3 default
     - MEM-007: Absolute Mode = Cynicism=1
     [...]"
```

---

## 7. Privacy & Security

### 7.1 Data Sensitivity

**Memory contains:**
- Andre's cognitive patterns (decision-making, overload triggers)
- Project details (Nyssa, Wunderhaus, OMEGA VM)
- Emotional signals (frustration markers, flow states)

**Classification:** **HIGH SENSITIVITY** — equivalent to psychological profile + creative IP.

### 7.2 Security Measures

1. **Encryption:** All cloud-stored memory encrypted at rest (AES-256)
2. **Access Control:** Read/Write restricted to authorized sessions only (API key authentication)
3. **Audit Log:** Every write operation logged with timestamp, session ID, source
4. **Backup Strategy:** Daily snapshots to secondary location, 30-day retention
5. **No Third-Party Sharing:** Memory never leaves Andre's control (no analytics, no training data extraction)

### 7.3 GDPR Compliance

- **Right to Access:** Andre can export full memory JSON anytime (`/export memory`)
- **Right to Deletion:** Andre can purge entire memory or specific entries (`/delete [MEM-ID]` or `/purge all`)
- **Right to Portability:** Memory format is open JSON schema, transferable to other AI systems
- **Data Minimization:** Only store patterns with confirmed utility; auto-prune entries unused for 180+ days

---

## 8. Implementation Roadmap

### Phase 1: MVP (Short-Term — December 2025)

**Goal:** Basic memory read/write with manual confirmation.

**Deliverables:**
1. ✅ Memory schema designed (Section 2.2)
2. ✅ Memory Write Threshold confirmed (3x repetitions, 30-day window)
3. ⬜ `Andre_KI_Memory.json` initialized (empty template)
4. ⬜ Confirmation-First Policy implemented (AI prompts before write)
5. ⬜ Manual commands functional (`/store`, `/recall`)
6. ⬜ GitHub Gist integration (cloud sync for memory file)

**Timeline:** 2 weeks (unblocked as of 24.11.2025)

### Phase 2: Auto-Detection (Mid-Term — January 2026)

**Goal:** Pattern detection + auto-prompts at threshold.

**Deliverables:**
1. ⬜ Repetition counter per category/pattern
2. ⬜ 3x threshold logic (session-übergreifend, 30-day window)
3. ⬜ Conflict detection pre-write validation
4. ⬜ CHANGELOG auto-update for semantic changes
5. ⬜ Rollback mechanism functional

**Timeline:** 3-4 weeks

### Phase 3: Intelligent Memory (Long-Term — Q1 2026)

**Goal:** Proactive memory suggestions, cross-session learning.

**Deliverables:**
1. ⬜ AI suggests memory writes without prompting (e.g., "I noticed this pattern — worth storing?")
2. ⬜ Context-aware queries (e.g., auto-load Nyssa memory when project mentioned)
3. ⬜ Memory-driven behavior adaptation (AI adjusts tone based on stored preferences without explicit command)
4. ⬜ Integration with andre-profile-guardian agent (automated consistency checks)
5. ⬜ Advanced analytics (e.g., "You've corrected coach-speak 15x — high-priority anti-pattern")

**Timeline:** 6-8 weeks

---

## 9. Open Questions & Blockers

### 9.1 ✅ **RESOLVED: Memory Write Threshold Decision**

**Status:** CONFIRMED (24.11.2025)

**Decision:** 3x repetitions (session-übergreifend, 30-day window, same category)

**Action Taken:** Threshold specification finalized per user confirmation.

**Impact:** Unblocks MVP timeline — Phase 1 implementation can proceed.

### 9.2 Open Design Questions

1. **Memory Expiry:** Should unused patterns auto-archive after N days? (Proposed: 180 days → status="Archived")
2. **Confidence Decay:** Should repetition count decay over time? (e.g., 3x in 1 week = stronger than 3x over 6 months)
3. **Multi-User Support:** Future-proof for shared AI (e.g., Andre + collaborator)? (Current: single-user only)
4. **Memory Inheritance:** Should new profile versions inherit all memory from v3.2? Or selective migration?

### 9.3 Technical Debt

- **Current:** No automated tests for conflict detection logic
- **Current:** Manual CHANGELOG updates (should be auto-generated for memory writes)
- **Current:** No memory compression (JSON will grow large over time)

**Mitigation Plan:** Address in Phase 2 (auto-detection) + Phase 3 (intelligent memory).

---

## 10. Success Metrics

### 10.1 Quantitative KPIs

| Metric | Target (Phase 1) | Target (Phase 3) |
|--------|------------------|------------------|
| Memory Entries Stored | 10-20 | 100+ |
| Confirmation Prompts per Session | 0-1 | 0-2 (mostly auto-write) |
| Conflict Detections | 1-2 (testing) | <1 per 10 sessions |
| Rollback Requests | 0 (stable rules) | <1 per month |
| Session Handoff Success Rate | 80% (context retained) | 95% (seamless continuity) |

### 10.2 Qualitative Success Criteria

- ✅ Andre stops re-explaining preferences every session
- ✅ AI adapts tone/style based on stored patterns without explicit commands
- ✅ Overload patterns detected and mitigated proactively
- ✅ Project context (Nyssa, OMEGA VM) auto-loaded when mentioned
- ✅ Zero unwanted behavior changes (rollback rate <1%)

---

## 11. Appendix: Example Memory Entries

### Example A: Tone Preference (High Confidence)

```json
{
  "id": "MEM-2025-11-010",
  "category": "Preference",
  "subcategory": "Tone",
  "pattern": "Andre dislikes emojis in AI responses",
  "stored_rule": "Never use emojis unless explicitly requested (e.g., #MehrFun mode)",
  "confidence": "High",
  "repetition_count": 5,
  "first_observed": "2025-11-01",
  "last_reinforced": "2025-11-20",
  "session_ids": ["sess-001", "sess-004", "sess-007", "sess-010", "sess-013"],
  "recall_id": "1202",
  "version": "1.0",
  "status": "Active"
}
```

### Example B: Overload Pattern (Medium Confidence)

```json
{
  "id": "MEM-2025-11-011",
  "category": "Pattern",
  "subcategory": "Overload",
  "pattern": "When Andre opens 15+ browser tabs → cognitive overload signal",
  "stored_rule": "Decision-shrinking trigger: max 2 options, suggest closing tabs",
  "confidence": "Medium",
  "repetition_count": 3,
  "first_observed": "2025-11-12",
  "last_reinforced": "2025-11-22",
  "session_ids": ["sess-006", "sess-011", "sess-014"],
  "recall_id": "1702",
  "version": "1.0",
  "status": "Active"
}
```

### Example C: Project Context (Low Confidence)

```json
{
  "id": "MEM-2025-11-012",
  "category": "Project",
  "subcategory": "Nyssa",
  "pattern": "Nyssa prefers minimal explanation when answering questions",
  "stored_rule": "Character trait: Nyssa = INTP analytical, compress by default",
  "confidence": "Low",
  "repetition_count": 2,
  "first_observed": "2025-11-18",
  "last_reinforced": "2025-11-21",
  "session_ids": ["sess-009", "sess-012"],
  "recall_id": "2002",
  "version": "0.9",
  "status": "Pending_Confirmation"
}
```

---

## 12. References

- **Andre_profil_full_refined.txt** — Section 19 (Memory & Persistenz-Architektur)
- **Andre_Profile_Full.md** — Section 18 (KI-Architektur & System-Bausteine)
- **PROFILE_SYNC_AUDIT.md** — Conflict 7 (Memory Write Threshold, unresolved)
- **Ausstehende_Bearbeitungen.txt** — Point 2 (Memory Write Threshold pending)
- **PROJECT_CATALOG.md** — Project 13 (Memory-Layer-Entwicklung)
- **COMMAND_SYNTAX_GUIDE.md** — /recall command specification
- **DECISION_SHRINKING_FLOWCHART.md** — Pattern repetition & memory integration (Section 9)

---

**Implementation Ready:** Memory Write Threshold confirmed (3x repetitions, session-übergreifend, 30-day window). Phase 1 MVP can proceed.

**Status:** ✅ **Documentation complete, unblocked for implementation (Phase 1: December 2025).**
