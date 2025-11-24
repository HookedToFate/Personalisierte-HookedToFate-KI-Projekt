# PROJECT INDEX — Personalisierte-HookedToFate-KI-Projekt

**Purpose:** Master navigation for Andre's personalized AI system. Start here if you need to know where something lives or which file is source-of-truth.

**Status:** Structure aligned with `FOLDER_STRUCTURE_CONCEPT.md` (24.11.2025); awaiting token for Memory Layer testing.

---

## Quick Navigation

| Need | Go To |
|------|-------|
| Profile (Full + Refined) | `profile/_INDEX.md` |
| Memory Layer docs/scripts | `memory-layer/_INDEX.md` |
| Command specs & flows | `commands/_INDEX.md` |
| Projects overview | `projects/_INDEX.md` |
| Audits & pending decisions | `audits/_INDEX.md` |
| Agent quickstart/config | `agents/_INDEX.md` |
| Changes & roadmap | `CHANGELOG.md`, `PROJEKTPLAN_ROADMAP.md` |

---

## Subsystem Breakdown

### 1) Profile System (`/profile`)
Human-readable vs. execution-ready profile. Source-of-truth split: `Andre_Profile_Full.md` (philosophy) and `Andre_profil_full_refined.txt` (operational). RECALL IDs live here. Historical PDFs/diagrams in `profile/archive/`.

### 2) Memory Layer (`/memory-layer`)
Persistence architecture + MVP plan + Day1 setup. Scripts in `memory-layer/scripts/` (`memory_layer.ps1`, `test_gist_connection.ps1`). Runtime/cache isolated in `memory-layer/runtime/` (gitignored). Requires GitHub gist token.

### 3) Commands (`/commands`)
Command syntax guide, decision-shrinking flowchart, emotional detection protocol. Activation/precedence logic for #Fokus/#Absolute/etc.

### 4) Projects (`/projects`)
Catalog of creative + system projects. Subfolders `creative/` and `system/` reserved for per-project docs; catalog remains the master list.

### 5) Agents (`/agents`)
`AGENT_QUICKSTART.md` plus pointers to operational configs. GitHub-specific agent config remains in `.github/agents/my-agent.agent.md`.

### 6) Audits (`/audits`)
Profile sync audit and pending decisions tracker. Use for conflict detection and version rationale.

### 7) Archive (`/archive`)
Parking for deprecated/non-active materials outside the profile archive. Currently empty.

---

## Working Agreements

- Semantic versioning enforced (`CHANGELOG.md`).
- Profile sync: keep `Full.md` and `Refined.txt` semantically aligned; log deltas.
- Memory writes follow Confirmation-First policy with 3x threshold (see `memory-layer/MEMORY_PERSISTENCE_ARCHITECTURE.md`).
- Execution artifacts stay in `memory-layer/runtime/` (ignored).
- If you add a new folder, add an `_INDEX.md` describing its contents.

