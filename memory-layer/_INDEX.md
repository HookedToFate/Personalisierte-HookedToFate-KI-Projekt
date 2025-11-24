# MEMORY-LAYER INDEX

**Purpose:** Memory persistence subsystem — architecture, implementation plan, setup, and scripts.

## Contents
- `MEMORY_PERSISTENCE_ARCHITECTURE.md` — Full spec (Confirmation-First, 3x threshold, conflict detection).
- `MEMORY_MVP_IMPLEMENTATION_PLAN.md` — 2-week roadmap (Dec 2025 target).
- `MEMORY_DAY1_SETUP.md` — Gist + token setup guide.
- `Andre_KI_Memory.json` — Schema/template (cloud-synced target).
- `scripts/` — `memory_layer.ps1` (core), `test_gist_connection.ps1` (connectivity check).
- `runtime/` — Cache/config (gitignored). Contains transient `memory_cache.json`, `memory_config.json`.

## Status
- Day 1–3 implementation done; awaiting GitHub gist token to test read/write.
- Confirmation-First Policy with default 3x repetition threshold.
- Conflict detection MVP keyword-based (see architecture doc).

## Usage
- Before running scripts: set GitHub PAT with `gist` scope (see setup doc).
- Treat `runtime/` as ephemeral; do not version control its contents.
- Log semantic memory rule changes in `CHANGELOG.md` when confidence high.

