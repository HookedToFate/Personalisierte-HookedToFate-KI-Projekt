# PROFILE FOLDER INDEX

**Purpose:** Central hub for Andre's cognitive profile files. Source-of-truth split: `Andre_Profile_Full.md` (philosophical, human-readable) and `Andre_profil_full_refined.txt` (operational, execution-ready).

## Contents
- `Andre_person/` — Personenprofil (Full, Refined, RECALL Index).
  - `Andre_Profile_Full.md` — v3.2-Full, depth-synced human-readable blueprint.
  - `Andre_profil_full_refined.txt` — v3.0 Refined, execution layer + processing logic.
  - `Andre_RECALL_Index.md` — RECALL IDs 1000–3499.
- `Systemconfig_Custom_KI/` — System- und Modus-Configs.
  - `SYSTEMPROMPT_GLIEDERUNG.md` — One-pager der Agent-Policies (Rolle, Prinzipien, Entscheidungslogik, Fokus-Level, Overload, Security, Memory, Modes, Output).
  - `Instruction_Absolute_mode.txt` — #Absolute mode spec (Cynicism=1, metaphors only for clarity).
  - `Beast.txt` — High-intensity mode (inactive unless triggered).
- `archive/` — Historical PDFs/diagrams (roadmap v2, architecture visuals).

## Usage
- For implementation: start with `Andre_person/Andre_profil_full_refined.txt`.
- For tone/identity context: use `Andre_person/Andre_Profile_Full.md`.
- Cross-reference `Andre_person/Andre_RECALL_Index.md` when adding memory entries or project links.
- Log any semantic change in `CHANGELOG.md` and run conflict checks per `audits/PROFILE_SYNC_AUDIT.md`.
