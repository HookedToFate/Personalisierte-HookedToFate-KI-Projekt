# FOLDER STRUCTURE CONCEPT — Personalisierte-HookedToFate-KI-Projekt

**Version:** 1.0  
**Created:** 24. November 2025  
**Status:** Proposed Architecture  
**Goal:** Eliminate root-level chaos, enforce semantic grouping, enable rapid navigation

---

## Problem Analysis

**Current State:**
- 28 files in root directory (profiles, docs, scripts, PDFs, cache files mixed)
- No semantic hierarchy — technical specs beside creative artifacts beside execution scripts
- Discovery requires scanning full list or grep (high cognitive load)
- Unclear which files are deployment-ready vs. drafts vs. historical artifacts

**Core Issues:**
1. **Flat structure** → No visual cues for file relationships
2. **Mixed abstraction levels** → Implementation details (`.ps1`, `.json`) next to architecture docs (`.md`)
3. **No versioning strategy** → Old PDFs (`V2.pdf`) coexist with new markdown (sync unclear)
4. **Execution artifacts pollute working directory** → `memory_cache.json`, `memory_config.json` (should be in `/cache` or `/runtime`)

---

## Design Principles

### 1. Semantic Grouping Over File Types
- **NOT:** `/docs`, `/scripts`, `/configs` (file-type folders hide intent)
- **YES:** `/profile`, `/memory-layer`, `/projects` (function-based folders reveal purpose)

### 2. Depth = Abstraction Level
- **Root:** Overview, entry points, critical index (`INDEX.md`, `README.md`)
- **Level 1:** Major subsystems (`/profile`, `/memory-layer`, `/projects`, `/agents`)
- **Level 2:** Implementation details, versioned artifacts, execution scripts

### 3. Execution Isolation
- Runtime artifacts (cache, logs, temp configs) live in `/runtime` or `/cache` (gitignored)
- Never pollute working directories with execution state

### 4. Discoverable via Index
- Every folder contains `_INDEX.md` (folder-level manifest: what's inside, why, dependencies)
- Root `INDEX.md` = master navigation ("If you need X, go to Y folder")

---

## Proposed Structure

```
Personalisierte-HookedToFate-KI-Projekt/
│
├── INDEX.md                          # Master navigation file (what's where + why)
├── README.md                          # Project overview (for GitHub/external users)
├── CHANGELOG.md                       # Version history (semantic changes only)
├── PROJEKTPLAN_ROADMAP.md             # High-level roadmap (phases, milestones)
│
├── .github/                           # GitHub-specific configs
│   ├── copilot-instructions.md
│   └── agents/                        # GitHub Agents (future)
│       └── my-agent.agent.md
│
├── profile/                           # Andre's cognitive profile (all versions)
│   ├── _INDEX.md                      # Profile version guide + migration notes
│   ├── Andre_Profile_Full.md          # Comprehensive v3.2 (human-readable)
│   ├── Andre_profil_full_refined.txt  # Production v3.2 (execution-focused)
│   ├── Instruction_Absolute_mode.txt  # Ultra-directive mode spec
│   ├── Beast.txt                      # (Context unclear — audit/relocate)
│   ├── Andre_RECALL_Index.md          # RECALL ID registry (cross-reference)
│   └── archive/                       # Deprecated versions + historical artifacts
│       ├── Systemprompt-KI_Gliederung.png
│       ├── Andre_Custom_Gpt_Roadmap_V2.pdf
│       ├── CustomGPT-Architektur_Machbarkeit_Design.pdf
│       └── Vertiefung_der_Architektur.pdf
│
├── memory-layer/                      # Memory Persistence subsystem
│   ├── _INDEX.md                      # Memory Layer component guide
│   ├── MEMORY_PERSISTENCE_ARCHITECTURE.md  # Technical spec
│   ├── MEMORY_MVP_IMPLEMENTATION_PLAN.md   # 2-week roadmap
│   ├── MEMORY_DAY1_SETUP.md           # Setup instructions
│   ├── Andre_KI_Memory.json           # Memory schema template (local)
│   ├── scripts/                       # Execution scripts
│   │   ├── memory_layer.ps1           # Core implementation
│   │   └── test_gist_connection.ps1   # Connection test
│   └── runtime/                       # Execution artifacts (gitignored)
│       ├── memory_cache.json
│       └── memory_config.json
│
├── projects/                          # Creative + technical projects
│   ├── _INDEX.md                      # Project catalog navigation
│   ├── PROJECT_CATALOG.md             # All 13 projects (master list)
│   ├── creative/                      # Narrative/character projects
│   │   ├── Wunderhaus.md
│   │   ├── Nyssa.md
│   │   ├── Memory-Room.md
│   │   ├── Spiegelsaal.md
│   │   └── Nyssa-Codex.md
│   └── system/                        # Technical/framework projects
│       ├── Prompt_Modifier.md
│       ├── OMEGA_VM.md
│       ├── Chimera_Protocol.md
│       ├── Profile_Guardian_Agent.md
│       ├── Ethical_Firewall_System.md
│       └── Memory_Layer_Entwicklung.md
│
├── commands/                          # Command syntax + protocols
│   ├── _INDEX.md
│   ├── COMMAND_SYNTAX_GUIDE.md        # Full command reference
│   ├── DECISION_SHRINKING_FLOWCHART.md
│   └── EMOTIONAL_DETECTION_PROTOCOL.md
│
├── agents/                            # AI agent specifications (future)
│   ├── _INDEX.md
│   ├── AGENT_QUICKSTART.md
│   └── andre-profile-guardian/        # Example agent folder
│       ├── agent.md
│       ├── config.json
│       └── README.md
│
├── audits/                            # Quality control + consistency checks
│   ├── _INDEX.md
│   ├── PROFILE_SYNC_AUDIT.md
│   └── Ausstehende_Bearbeitungen.txt  # Pending tasks/todos
│
└── archive/                           # Deprecated/historical files
    └── _INDEX.md                      # What's archived + why
```

---

## Root-Level `INDEX.md` (Content Structure)

```markdown
# PROJECT INDEX — HookedToFate Personalisierte KI

**Purpose:** Navigate the cognitive architecture. If you're lost, start here.

---

## Quick Navigation

| Need | Go To |
|------|-------|
| **Profile versions** | `profile/` — All Andre profile iterations |
| **Memory Layer setup** | `memory-layer/MEMORY_DAY1_SETUP.md` |
| **Command reference** | `commands/COMMAND_SYNTAX_GUIDE.md` |
| **Project overview** | `projects/PROJECT_CATALOG.md` |
| **What changed?** | `CHANGELOG.md` (root) |
| **Roadmap/phases** | `PROJEKTPLAN_ROADMAP.md` (root) |
| **GitHub Agent config** | `.github/agents/` |

---

## Subsystem Breakdown

### 1. **Profile System** (`/profile`)
All versions of Andre's cognitive profile. Use `Andre_profil_full_refined.txt` for production, `Andre_Profile_Full.md` for documentation/understanding.

**Key Files:**
- `Andre_Profile_Full.md` — Comprehensive v3.2
- `Instruction_Absolute_mode.txt` — Ultra-directive mode
- `Andre_RECALL_Index.md` — ID registry (1000-3499)

**Archive:** Old PDFs, diagrams, drafts → `profile/archive/`

---

### 2. **Memory Layer** (`/memory-layer`)
Persistent memory infrastructure (GitHub Gist sync, read/write logic, conflict detection).

**Key Files:**
- `MEMORY_PERSISTENCE_ARCHITECTURE.md` — Technical spec
- `MEMORY_MVP_IMPLEMENTATION_PLAN.md` — 2-week roadmap
- `scripts/memory_layer.ps1` — Core implementation

**Runtime:** Cache/config files → `memory-layer/runtime/` (gitignored)

---

### 3. **Projects** (`/projects`)
Creative worlds (Nyssa, Wunderhaus) + system frameworks (OMEGA VM, Chimera Protocol).

**Structure:**
- `PROJECT_CATALOG.md` — Master list (13 projects)
- `creative/` — Narrative/character projects
- `system/` — Technical frameworks

**Integration:** Projects reference RECALL IDs (see `profile/Andre_RECALL_Index.md`)

---

### 4. **Commands** (`/commands`)
Syntax, protocols, activation logic for `/store`, `/recall`, `#Absolute`, etc.

**Key Files:**
- `COMMAND_SYNTAX_GUIDE.md` — Full reference
- `DECISION_SHRINKING_FLOWCHART.md` — Overload handling
- `EMOTIONAL_DETECTION_PROTOCOL.md` — Tone adjustment logic

---

### 5. **Agents** (`/agents`)
AI agent specifications (future GitHub Agents, custom automations).

**Status:** Stub (future expansion)

---

### 6. **Audits** (`/audits`)
Quality control docs, sync checks, pending tasks.

**Key Files:**
- `PROFILE_SYNC_AUDIT.md` — Profile consistency verification
- `Ausstehende_Bearbeitungen.txt` — Todo list

---

## File Type Legend

| Extension | Purpose |
|-----------|---------|
| `.md` | Documentation, specs, guides (human-readable) |
| `.txt` | Plain text profiles, mode instructions (machine-parseable) |
| `.ps1` | PowerShell scripts (execution layer) |
| `.json` | Data files (schemas, configs, cache) |
| `.pdf` | Historical artifacts (archived) |

---

## Migration Notes (Current → Proposed)

**Moves Required:**
- PDFs → `profile/archive/`
- `memory_cache.json`, `memory_config.json` → `memory-layer/runtime/`
- `Andre_KI_Memory.json` → `memory-layer/` (template) + gitignored runtime copy
- Create project-specific `.md` files in `projects/creative/` and `projects/system/`
- `Beast.txt` → Audit context, relocate or archive

**New Files:**
- `INDEX.md` (root)
- `_INDEX.md` in every folder (navigation manifests)

**Cleanup:**
- Delete redundant root-level files after migration
- Update CHANGELOG with structure change entry

---

## Next Actions

1. Create folder structure (empty directories + `_INDEX.md` stubs)
2. Move existing files (preserve Git history via `git mv`)
3. Populate `INDEX.md` and folder-level `_INDEX.md` files
4. Update `.gitignore` (add `memory-layer/runtime/`, `*.cache`, temp files)
5. Test navigation (can you find X in <30 seconds?)
6. Document migration in CHANGELOG (v3.2.2 or v3.3)
```

---

## Rationale: Why This Structure?

### Problem 1: "Where's the Memory Layer script?"
**Old:** Scan 28 root files → find `memory_layer.ps1`  
**New:** `memory-layer/scripts/memory_layer.ps1` (semantic path = instant discovery)

### Problem 2: "Which profile version is current?"
**Old:** `Andre_Profile_Full.md` vs. `Andre_profil_full_refined.txt` vs. PDFs (unclear hierarchy)  
**New:** `profile/_INDEX.md` explicitly states: "Use `refined.txt` for execution, `Full.md` for understanding"

### Problem 3: "What changed in v3.2.1?"
**Old:** Grep CHANGELOG, cross-reference scattered files  
**New:** CHANGELOG + folder-level `_INDEX.md` = audit trail + context

### Problem 4: "Memory cache pollutes working directory"
**Old:** `memory_cache.json` in root (Git tracks, merge conflicts possible)  
**New:** `memory-layer/runtime/` (gitignored, execution-isolated)

---

## Anti-Patterns (What NOT to Do)

### ❌ File-Type Folders
```
/docs/     # Andre_Profile_Full.md + MEMORY_PERSISTENCE_ARCHITECTURE.md = unrelated
/scripts/  # memory_layer.ps1 + test_gist_connection.ps1 = belongs together
/configs/  # memory_config.json separate from memory_layer.ps1 = breaks locality
```
**Why Bad:** Forces cross-folder navigation to understand single subsystem

### ❌ Over-Nesting
```
/memory-layer/implementation/scripts/execution/memory_layer.ps1
```
**Why Bad:** 5 levels deep for single file = navigation cost > organizational benefit

### ❌ Unclear Folder Names
```
/stuff/    # What stuff?
/misc/     # Junk drawer anti-pattern
/old/      # Old what? Use /archive with dated context
```

### ❌ No Index Files
**Result:** Folders are black boxes. User must read all files to understand purpose.

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Discovery Time** | <30 sec | Time to locate specific file (e.g., "Find Memory Layer setup guide") |
| **Onboarding Speed** | <5 min | New user reads `INDEX.md` → understands project structure |
| **Root File Count** | <10 | Only navigation files, critical docs, config in root |
| **Gitignore Coverage** | 100% | No execution artifacts tracked (cache, logs, temp files) |
| **Folder Self-Documentation** | 100% | Every folder has `_INDEX.md` explaining contents |

---

## Implementation Priority

### Phase 1: Critical Restructure (Now)
1. Create folder structure
2. Move Memory Layer files (`memory-layer/`, runtime isolation)
3. Archive PDFs (`profile/archive/`)
4. Create root `INDEX.md`

### Phase 2: Project Decomposition (After MVP)
1. Split `PROJECT_CATALOG.md` into individual project files (`projects/creative/Nyssa.md`, etc.)
2. Populate `_INDEX.md` in all folders
3. Update cross-references (RECALL IDs, command syntax links)

### Phase 3: Maintenance Automation (Future)
1. Script to verify `_INDEX.md` exists in all folders
2. Link checker (detect broken cross-references)
3. Orphan file detector (files not referenced anywhere)

---

## Decision Points (Confirm Before Execution)

1. **Archive Strategy:** Keep PDFs in `profile/archive/` or delete entirely?  
   **Recommendation:** Archive (historical context valuable, no storage cost)

2. **Project File Split:** Break `PROJECT_CATALOG.md` into 13 separate files now or later?  
   **Recommendation:** Later (after Memory Layer MVP complete, avoid scope creep)

3. **Beast.txt:** Purpose unclear — audit first or move to archive?  
   **Recommendation:** Audit (read content, determine relevance)

4. **Execution Artifacts:** Gitignore `memory-layer/runtime/` entirely or track schema template?  
   **Recommendation:** Gitignore runtime, track `Andre_KI_Memory.json` template in `memory-layer/`

---

## Approval & Next Steps

**Status:** Proposed (awaiting confirmation)  
**Blockers:** None (non-breaking change, Git history preserved)  
**Effort:** 1 hour (folder creation + file moves + INDEX.md creation)

**Next Action:** Confirm structure, execute Phase 1 (critical restructure)

---

**END OF CONCEPT**
