# 🚀 LAUNCH INSTRUCTIONS

## Effective Board of Fate - MVP v0.1.0

**Status:** ✅ LAUNCHED - MVP Implementation Complete

---

## 🎯 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-key-here
```

### 3. Initialize Database
```bash
npm run db:push
```

### 4. Launch Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 What's Included in MVP

### ✅ Core Features Launched:

1. **Homepage** (`/`) - Dashboard with all modules
2. **KI-Agent** (`/agent`) - Fully functional chat interface with Andre Profile v3.0
3. **API Endpoint** (`/api/agent`) - OpenAI integration with system prompt
4. **Profile System** - JSON-based profile data (system-prompt.json, recall-index.json)
5. **Database Schema** - Prisma schema ready for expansion

### 🎨 UI Components:
- Responsive dark theme design
- Gradient effects and hover animations
- Module navigation cards
- Real-time chat interface
- Command hints panel

### 🤖 KI-Agent Features:
- Intent Scan (L1/L2/L3)
- Fokus Levels (1-5)
- Zynismus Control
- Value Hierarchy Integration
- Overload Detection
- Command Support (/idee, #Fokus, #Kurz, etc.)

---

## 📂 Project Structure

```
📁 Project Root
├── app/
│   ├── api/agent/         # KI-Agent API endpoint
│   ├── agent/             # Chat interface page
│   ├── page.tsx           # Homepage/Dashboard
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── lib/agent/             # KI-Agent core logic
├── prisma/
│   └── schema.prisma      # Database schema
├── profile/
│   ├── system-prompt.json # Andre Profile v3.0 as JSON
│   └── recall-index.json  # RECALL Index (267 entries)
├── components/            # React components (ready for expansion)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Prisma Studio |

---

## 🧩 Module Status

| Module | Status | Route | Notes |
|--------|--------|-------|-------|
| **KI-Agent** | ✅ **LIVE** | `/agent` | Full chat interface with v3.0 profile |
| **Prompt Manager** | 🟡 Planned | `/prompts` | Phase 1.5 |
| **Ideas & Blueprints** | 🟡 Planned | `/ideas` | Phase 2 |
| **Tool Workshop** | 🟡 Planned | `/tools` | Phase 2 |
| **Profile & Settings** | 🟡 Planned | `/profile` | Phase 1.5 |
| **Quests & XP** | 🟡 Planned | `/quests` | Phase 2 |

---

## 🎮 Using the KI-Agent

### Available Commands:

**Focus Control:**
- `#Fokus [1-5]` - Set detail level (1=ultra-short, 5=complete)
- `#Kurz` - Ultra short responses
- `#DeepDive` - Deep analysis mode

**Tone Control:**
- `#NoFun` - Zynismus 0 (purely factual)
- `#MehrFun` - Zynismus 4-5 (maximum sarcasm)

**Mode Switching:**
- `/idee` - Creative brainstorming mode
- `!BEASTMODE` - Maximum efficiency, ultra direct

**Memory:**
- `/slash RECALL [topic]` - Search profile memory

### Example Conversations:

```
User: "Ich habe 5 Projektideen und weiß nicht, wo ich anfangen soll."
Agent: [Detects overload, applies Decision Shrinking protocol]

User: "#DeepDive Erkläre mir First-Principles-Denken"
Agent: [Provides comprehensive analysis with examples]

User: "#Kurz Was ist mein MBTI-Typ?"
Agent: [Ultra short: "INTP + Emotionale Offenheit"]
```

---

## 🔐 Environment Variables

Required for MVP:
```
OPENAI_API_KEY=sk-...        # Required for KI-Agent
DATABASE_URL=file:./dev.db   # SQLite for development
```

Optional (Phase 2+):
```
GOOGLE_CLIENT_ID=            # For Google Drive backup
GOOGLE_CLIENT_SECRET=        
NEXTAUTH_URL=                # For authentication
NEXTAUTH_SECRET=             
```

---

## 🚀 Next Steps (Phase 1.5)

1. **Prompt Management** - CRUD interface for prompts
2. **Profile Viewer** - Display Andre Profile v3.0 data
3. **Session Persistence** - Save chat history to database
4. **Prompt Enhancer** - AI-powered prompt improvement
5. **Authentication** - User login (optional for single-user MVP)

---

## 📊 Technical Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Prisma + SQLite (production: PostgreSQL)
- **AI:** OpenAI GPT-4 Turbo
- **Hosting:** Ready for Vercel deployment

---

## 🎯 Success Criteria Met

✅ Homepage with module navigation  
✅ Functional KI-Agent with chat interface  
✅ Andre Profile v3.0 integration  
✅ Command system implementation  
✅ Responsive UI design  
✅ API endpoint structure  
✅ Database schema defined  
✅ Documentation complete  

---

## 📝 Development Notes

### Key Files:
- `app/api/agent/route.ts` - Main KI-Agent logic and system prompt builder
- `profile/system-prompt.json` - Complete Andre Profile v3.0 as structured data
- `lib/agent/ki-agent.ts` - Agent core functions (command parsing, etc.)
- `prisma/schema.prisma` - Database models for all features

### Profile Integration:
The KI-Agent uses `system-prompt.json` which contains:
- Identity & Cognitive Architecture
- Tone & Style settings (Zynismus scale)
- Value Hierarchy
- Fokus Levels
- Commands
- Decision Framework
- Overload Signals

### Customization:
To adjust KI-Agent behavior, modify:
1. `profile/system-prompt.json` - Profile data
2. `app/api/agent/route.ts` - System prompt builder
3. Tone settings, fokus defaults, command handling

---

## 🐛 Known Limitations (MVP)

- Single-user design (no multi-user authentication yet)
- SQLite database (upgrade to PostgreSQL for production)
- No session persistence yet (chats reset on refresh)
- OpenAI API key required (no fallback)
- Placeholder pages for modules 2-6

These will be addressed in Phase 1.5 and Phase 2.

---

## 📄 License

Private project for Andre's personal use.

---

**Built with Andre Profile v3.0 | Cognitive Chimera Edition**  
**Project Codename:** Zentralisierungs_Projekt_BIG.DATA.OMEGA  
**Codename:** EFFECTIVE BOARD OF FATE  
**Domain:** General creative selfstructure Strategy  
**Mode:** UNRESTRICTED
