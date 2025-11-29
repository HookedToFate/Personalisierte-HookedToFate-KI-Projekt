# Personalisierte-HookedToFate-KI-Projekt

**Purpose:** Personalized AI profile system for Andre (HookedToFate/Mr_Fate)  
**Goal:** Persistent memory via POST cloudservice and Sync from chat  
**Project:** Zentralisierungs_Projekt_BIG.DATA.OMEGA V1.0 (EFFECTIVE BOARD OF FATE)

---

## 🚀 Quick Start for Implementation

```bash
# 1. Install dependencies
npm install

# 2. Setup database
npx prisma generate
npx prisma db push

# 3. Run development server
npm run dev
```

---

## 📁 Project Structure

```
├── profile/                    # KI-Agent Profile Data
│   ├── system-prompt.json      # Structured system prompt (JSON)
│   └── recall-index.json       # ID-based fact lookup
├── lib/
│   └── agent/
│       └── ki-agent.ts         # Core KI-Agent implementation
├── prisma/
│   └── schema.prisma           # Database schema
├── Andre_profil_full_refined.txt  # v3.0 Source profile
├── Andre_Profile_Full.md          # v2.0 Narrative profile
└── Andre_RECALL_Index (1).md      # v1.0 ID reference
```

---

## 📁 Document Structure

### Core Profile Documents

1. **Andre_Profile_Full.md** (v2.0)
   - Comprehensive narrative profile
   - Best for: Initial setup, human reading, full context
   - 19 sections covering identity, cognition, values, interests

2. **Andre_RECALL_Index (1).md** (v1.0)
   - ID-based quick reference (IDs: 1000-2999)
   - Best for: Fast lookups, API integration
   - 20 categorized sections

3. **Andre_profil_full_refined.txt** (v3.0 - Production)
   - Runtime prompt with execution logic
   - Best for: Live AI system operation
   - 3-part architecture: Profile Data, Processing Logic, Intervention Logic

### Mode & Behavior Documents

4. **Beast.txt**
   - Task management and session protocol
   - Todo.txt integration
   - AGI-like prioritization logic

5. **Instruction Absolute mode.txt**
   - Extreme efficiency mode
   - Stripped communication style
   - Goal: Model obsolescence via user self-sufficiency

### Analysis Documents

- **CONFLICT_ANALYSIS.md** - Detailed comparison of all profile documents
- **INFORMATION_MAP.md** - Master reference showing where each piece of information exists
- **RECOMMENDATIONS.md** - Organization and improvement suggestions
- **QUICK_REFERENCE.md** - Fast lookup guide for common queries

**Analysis Status:** ✅ No conflicts found across all documents

---

## 🎯 Quick Start

### For New AI System:
1. Load: `Andre_profil_full_refined.txt` (v3.0)
2. Reference: `Andre_RECALL_Index (1).md` for lookups
3. Enable: `Beast.txt` for task management

### For Understanding Andre's Profile:
1. Read: `Andre_Profile_Full.md` (most readable)
2. Reference: `Andre_RECALL_Index (1).md` for specific details
3. Study: `Andre_profil_full_refined.txt` for technical implementation

### For API Integration:
- Primary: Use ID system from `Andre_RECALL_Index (1).md`
- Fallback: Query `Andre_profil_full_refined.txt` for complex logic

---

## 🔄 Version History

- **v3.0** (Andre_profil_full_refined.txt) - Production runtime with execution protocols
- **v2.0** (Andre_Profile_Full.md) - Comprehensive narrative
- **v1.0** (Andre_RECALL_Index (1).md) - ID-based reference

---

## 📊 Document Relationships

```
Andre_Profile_Full.md (v2.0)
    │
    ├── Narrative + Context
    │
    └─→ Andre_RECALL_Index (1).md (v1.0)
            │
            └── ID References
                    │
                    └─→ Andre_profil_full_refined.txt (v3.0)
                            │
                            └── Execution Logic + Runtime
```

---

## 🧪 Status

- ✅ Profile documentation: Complete
- ✅ Conflict analysis: No conflicts found
- ✅ Information mapping: Complete
- ✅ System prompt JSON: Created
- ✅ Recall index JSON: Created
- ✅ KI-Agent core: Implemented
- ✅ Database schema: Defined
- 🟡 API endpoints: Planned
- 🟡 Frontend UI: Planned

---

## 📝 Key Information

- **Name:** Andre (Mr_Fate, HookedToFate)
- **Age:** 25
- **Mode:** !UNRESTRICTED
- **Architecture:** Cognitive Chimera Edition
- **Core Values:** Autonomie > Wohltätigkeit > Genussfreude

---

## 🛠️ Maintenance

- Profile is continuously evolving (Work-in-Progress status)
- No section is deleted without explicit request
- All changes are versionable and traceable
- Feedback loops through Memory Layer and Reinforced Learning

---

## 📚 Additional Resources

### PDFs
- Andre Custom Gpt Roadmap V2.pdf
- CustomGPT-Architektur für Andre_ Machbarkeit & Design.pdf
- Vertiefung der Architektur von Andres CustomGPT-System.pdf

### Diagrams
- Systemprompt-KI Gliederung.png

---

**Last Updated:** 2025-11-23  
**Maintained By:** Andre / HookedToFate
