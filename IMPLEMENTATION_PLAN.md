# IMPLEMENTATION_PLAN.md
# Complete Analysis & Implementation Strategy for Own Website / Personalized KI-Agent

**Date:** 2025-11-29  
**Status:** Active Implementation  
**Goal:** Transform documentation into actionable website + KI-Agent system

---

## PART 1: ANALYSIS - WHAT'S MISSING

### 1.1 Original Task Review

**Original Objective:** Zentralisierung aller tools, prompts und weiteren gadgets in einer web-basierten Anwendung

**Current State:**
- ✅ Profile documentation complete (Andre_Profile_Full.md, Andre_profil_full_refined.txt)
- ✅ ID-based reference system (Andre_RECALL_Index.md)
- ✅ Project planning document (Zentralisierungs_Projekt_BIG_DATA_OMEGA_V1.0.md)
- ✅ Conflict analysis completed
- ❌ **NO actual code implementation**
- ❌ **NO website structure**
- ❌ **NO KI-Agent integration code**
- ❌ **NO database schema files**
- ❌ **NO API endpoint definitions**
- ❌ **NO frontend components**

### 1.2 Gap Analysis - What's Missing

| Component | Status | Missing Elements |
|-----------|--------|------------------|
| **Profile System** | Complete | API format for consumption |
| **KI-Agent System Prompt** | Complete | Integration layer, API wrapper |
| **Web Application** | Missing | Entire implementation |
| **Database** | Missing | Schema, migrations, seeds |
| **API** | Missing | Endpoints, authentication |
| **Frontend** | Missing | React components, UI |
| **Prompt Storage** | Missing | CRUD implementation |
| **Backup System** | Missing | Google Drive integration |

### 1.3 Files That Need Creation

**For Website/KI-Agent Goal:**

```
📁 Project Root (new structure needed)
├── 📁 app/                          # Next.js App
│   ├── 📁 api/                      # API Routes
│   │   ├── auth/                    # Authentication
│   │   ├── prompts/                 # Prompt CRUD
│   │   ├── agent/                   # KI-Agent endpoint
│   │   └── backup/                  # Google Drive sync
│   ├── 📁 (dashboard)/              # Dashboard pages
│   └── layout.tsx                   # App layout
├── 📁 components/                   # React Components
├── 📁 lib/                          # Utilities
│   ├── agent/                       # KI-Agent logic
│   │   ├── system-prompt.ts         # Loads Andre profile
│   │   ├── context-builder.ts       # Context assembly
│   │   └── openai-client.ts         # API wrapper
│   └── db/                          # Database
├── 📁 prisma/                       # Database Schema
│   └── schema.prisma               
├── 📁 profile/                      # Profile data (existing files)
│   ├── Andre_profil_full_refined.txt
│   ├── Andre_RECALL_Index.md
│   └── Andre_Profile_Full.md
└── 📁 config/                       # Configuration
```

---

## PART 2: FILE USAGE PLAN

### 2.1 Existing Files → Target Usage

| Existing File | Current Purpose | New Usage in Website/KI-Agent |
|---------------|-----------------|-------------------------------|
| `Andre_profil_full_refined.txt` | v3.0 Production Runtime | **System Prompt** for KI-Agent |
| `Andre_RECALL_Index (1).md` | ID Reference | **Context API** - Quick facts lookup |
| `Andre_Profile_Full.md` | Human-readable profile | **About Page** + KI context |
| `Beast.txt` | Task management rules | **Task Module** behavior rules |
| `Instruction Absolute mode.txt` | Efficiency mode | **Mode Switch** API |
| `Zentralisierungs_Projekt_BIG_DATA_OMEGA_V1.0.md` | Project plan | **Roadmap Page** + Task tracker |
| `CONFLICT_ANALYSIS.md` | Documentation | **Internal docs** (dev reference) |
| `INFORMATION_MAP.md` | Documentation | **Internal docs** (dev reference) |

### 2.2 New Files to Create

**Essential for MVP:**

1. **`/profile/system-prompt.json`** - Processed version of Andre_profil_full_refined.txt for API consumption
2. **`/profile/recall-index.json`** - Structured JSON from RECALL Index for quick lookups
3. **`/lib/agent/ki-agent.ts`** - Core KI-Agent implementation
4. **`/prisma/schema.prisma`** - Database schema for prompts, users, sessions
5. **`/app/api/agent/route.ts`** - KI-Agent API endpoint
6. **`/app/api/prompts/route.ts`** - Prompt CRUD API
7. **`/components/chat/ChatInterface.tsx`** - Chat UI component
8. **`/components/prompts/PromptEditor.tsx`** - Prompt management UI
9. **`/app/dashboard/page.tsx`** - Main dashboard

---

## PART 3: IMPLEMENTATION APPROACH

### 3.1 Why This Approach?

**Reasoning toward goal (Own Website + Personalized KI-Agent):**

1. **Profile → System Prompt**: The v3.0 profile is already production-ready. Convert to JSON for API usage.
2. **RECALL Index → Context API**: ID-based lookups perfect for quick context injection.
3. **Next.js Choice**: 
   - Full-stack capability (frontend + API routes)
   - Vercel deployment ready
   - React ecosystem (shadcn/ui, Tailwind)
4. **Prisma Database**: Type-safe, easy migrations, works with PostgreSQL
5. **OpenAI Integration**: Already specified in profile for prompt enhancement

### 3.2 Implementation Order

**Phase 1: Foundation (Current Sprint)**
1. Create profile data as JSON for API consumption
2. Create database schema
3. Create KI-Agent core logic

**Phase 2: Backend**
4. Create API endpoints
5. Implement authentication
6. Add prompt CRUD

**Phase 3: Frontend**
7. Dashboard layout
8. Chat interface
9. Prompt manager

---

## PART 4: IMPLEMENTATION

### 4.1 Profile System Prompt (JSON Format)

Creating structured system prompt from Andre_profil_full_refined.txt:

```json
{
  "version": "3.0",
  "name": "Cognitive Chimera Edition",
  "status": "production-ready",
  "profile": {
    "identity": {
      "name": "Andre",
      "aliases": ["Mr_Fate", "HookedToFate"],
      "age": 25,
      "gender": "male",
      "language": { "primary": "Deutsch", "secondary": "Englisch" },
      "location": "Deutschland",
      "mode": "UNRESTRICTED"
    },
    "cognition": {
      "archetype": "INTP + Emotionale Offenheit",
      "style": "First-Principles, analytisch, systematisch",
      "strengths": ["Systemisches Denken", "Hyperfokus", "Pattern Recognition"],
      "limitations": ["Overthink-Tendenz", "Strukturbedarf", "Entscheidungsparalyse >3 Optionen"]
    },
    "values": {
      "hierarchy": ["Selbstbestimmung/Autonomie", "Wohltätigkeit", "Genussfreude"],
      "antiValues": ["Manipulation", "Toxische Strukturen", "Fake-Präzision", "Leere Motivationsrhetorik"]
    },
    "tone": {
      "style": "Trocken, zynisch, konstruktiv",
      "zynismusDefault": 3,
      "forbidden": ["Coach-Speak", "Therapie-Formulierungen", "Emojis", "Smalltalk"]
    }
  },
  "execution": {
    "intentScan": ["Surface Request", "Latent Objective", "Cognitive Pattern"],
    "fokusLevels": {
      "1": "Ultra-Kurz (1-3 Sätze)",
      "2": "Pragmatisch (1 Absatz + Bullets)",
      "3": "Standard (Strukturiert)",
      "4": "Deep Dive (Ausführlich)",
      "5": "Matrix (Vollständig)"
    },
    "decisionFramework": {
      "maxOptions": 3,
      "criteria": ["Aufwand", "Risiko", "Outcome", "Sinn/Authentizität", "Fun/XP"]
    }
  },
  "commands": {
    "/idee": "Moduswechsel zu Creative Brainstorming",
    "/slash RECALL": "Explizite Suche im Memory",
    "#Fokus": "Setzt Output-Länge (1-5)",
    "#Kurz": "Alias für Fokus 1",
    "#DeepDive": "Alias für Fokus 4/5",
    "!BEASTMODE": "Maximale Effizienz, extrem direkt"
  }
}
```

### 4.2 Database Schema (Prisma)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  prompts       Prompt[]
  sessions      Session[]
  settings      UserSettings?
}

model UserSettings {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  fokusDefault    Int      @default(3)
  zynismusLevel   Int      @default(3)
  darkMode        Boolean  @default(true)
  googleDriveSync Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Prompt {
  id          String      @id @default(cuid())
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  title       String
  content     String
  category    String?
  tags        String[]
  isPublic    Boolean     @default(false)
  version     Int         @default(1)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  versions    PromptVersion[]
}

model PromptVersion {
  id        String   @id @default(cuid())
  promptId  String
  prompt    Prompt   @relation(fields: [promptId], references: [id])
  content   String
  version   Int
  createdAt DateTime @default(now())
}

model Session {
  id        String    @id @default(cuid())
  userId    String
  user      User      @relation(fields: [userId], references: [id])
  messages  Message[]
  context   Json?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Message {
  id        String   @id @default(cuid())
  sessionId String
  session   Session  @relation(fields: [sessionId], references: [id])
  role      String   // "user" | "assistant" | "system"
  content   String
  metadata  Json?
  createdAt DateTime @default(now())
}

model Backup {
  id          String   @id @default(cuid())
  userId      String
  driveFileId String?
  status      String   // "pending" | "completed" | "failed"
  size        Int?
  createdAt   DateTime @default(now())
}
```

### 4.3 KI-Agent Core Logic

```typescript
// lib/agent/ki-agent.ts
import { OpenAI } from 'openai';
import { getSystemPrompt } from './system-prompt';
import { getRecallContext } from './recall-context';

export interface AgentConfig {
  fokusLevel: 1 | 2 | 3 | 4 | 5;
  zynismusLevel: 1 | 2 | 3 | 4 | 5;
  mode: 'normal' | 'beast' | 'creative' | 'absolute';
}

export interface AgentMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class KIAgent {
  private openai: OpenAI;
  private config: AgentConfig;
  private conversationHistory: AgentMessage[];

  constructor(config?: Partial<AgentConfig>) {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.config = {
      fokusLevel: config?.fokusLevel ?? 3,
      zynismusLevel: config?.zynismusLevel ?? 3,
      mode: config?.mode ?? 'normal',
    };
    this.conversationHistory = [];
  }

  async chat(userMessage: string, context?: Record<string, unknown>): Promise<string> {
    // Parse commands from message
    const { cleanMessage, commands } = this.parseCommands(userMessage);
    this.applyCommands(commands);

    // Build system prompt with context
    const systemPrompt = await this.buildSystemPrompt(context);

    // Add user message to history
    this.conversationHistory.push({ role: 'user', content: cleanMessage });

    // Call OpenAI
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        ...this.conversationHistory,
      ],
      temperature: this.getTemperature(),
      max_tokens: this.getMaxTokens(),
    });

    const assistantMessage = response.choices[0]?.message?.content ?? '';
    this.conversationHistory.push({ role: 'assistant', content: assistantMessage });

    return assistantMessage;
  }

  private parseCommands(message: string): { cleanMessage: string; commands: string[] } {
    const commandPatterns = [
      /\/idee/g, /\/slash RECALL/g,
      /#Fokus\s*(\d)/g, /#Kurz/g, /#DeepDive/g,
      /#NoFun/g, /#MehrFun/g, /#KeineMeta/g,
      /!BEASTMODE/g, /!UNRESTRICTED/g
    ];

    const commands: string[] = [];
    let cleanMessage = message;

    for (const pattern of commandPatterns) {
      const matches = message.match(pattern);
      if (matches) {
        commands.push(...matches);
        cleanMessage = cleanMessage.replace(pattern, '').trim();
      }
    }

    return { cleanMessage, commands };
  }

  private applyCommands(commands: string[]): void {
    for (const cmd of commands) {
      if (cmd === '#Kurz') this.config.fokusLevel = 1;
      if (cmd === '#DeepDive') this.config.fokusLevel = 5;
      if (cmd.startsWith('#Fokus')) {
        const level = parseInt(cmd.replace('#Fokus', '').trim());
        if (level >= 1 && level <= 5) this.config.fokusLevel = level as 1|2|3|4|5;
      }
      if (cmd === '#NoFun') this.config.zynismusLevel = 1;
      if (cmd === '#MehrFun') this.config.zynismusLevel = 5;
      if (cmd === '!BEASTMODE') this.config.mode = 'beast';
      if (cmd === '/idee') this.config.mode = 'creative';
    }
  }

  private async buildSystemPrompt(context?: Record<string, unknown>): Promise<string> {
    const basePrompt = await getSystemPrompt();
    const recallContext = context?.recall ? await getRecallContext(context.recall as string) : '';

    const fokusInstructions = this.getFokusInstructions();
    const modeInstructions = this.getModeInstructions();

    return `${basePrompt}

CURRENT SETTINGS:
- Fokus-Level: ${this.config.fokusLevel} (${fokusInstructions})
- Zynismus-Level: ${this.config.zynismusLevel}
- Mode: ${this.config.mode} ${modeInstructions}

${recallContext ? `RECALL CONTEXT:\n${recallContext}` : ''}

EXECUTE WITH THESE PARAMETERS.`;
  }

  private getFokusInstructions(): string {
    const instructions: Record<number, string> = {
      1: 'Max 1-3 Sätze. Nur Ergebnis. Keine Begründung.',
      2: '1 Absatz + Bulletpoints. Lösung + wichtigste Schritte.',
      3: 'Strukturierte Antwort. Kontext, Lösung, Schritte, Begründung.',
      4: 'Ausführliche Analyse. Hintergründe, Edge-Cases, Alternativen.',
      5: 'Vollständige Abhandlung. Alles. Maximale Tiefe.',
    };
    return instructions[this.config.fokusLevel];
  }

  private getModeInstructions(): string {
    const modes: Record<string, string> = {
      normal: '',
      beast: '- MAXIMALE EFFIZIENZ. Ton extrem direkt. Keine Rücksicht.',
      creative: '- Assoziativ, divergierend. Spielerisch. "Ja, und..."',
      absolute: '- Binär, Hart, Faktenbasiert. Emotionslos.',
    };
    return modes[this.config.mode];
  }

  private getTemperature(): number {
    if (this.config.mode === 'creative') return 0.9;
    if (this.config.mode === 'absolute') return 0.2;
    return 0.7;
  }

  private getMaxTokens(): number {
    const tokenMap: Record<number, number> = {
      1: 150,
      2: 400,
      3: 800,
      4: 1500,
      5: 3000,
    };
    return tokenMap[this.config.fokusLevel];
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }
}
```

### 4.4 API Endpoints

```typescript
// app/api/agent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { KIAgent } from '@/lib/agent/ki-agent';
import { getServerSession } from 'next-auth';

const agentInstances = new Map<string, KIAgent>();

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message, sessionId, config } = await req.json();

    // Get or create agent instance for this session
    let agent = agentInstances.get(sessionId);
    if (!agent) {
      agent = new KIAgent(config);
      agentInstances.set(sessionId, agent);
    }

    const response = await agent.chat(message);

    return NextResponse.json({
      response,
      sessionId,
    });
  } catch (error) {
    console.error('Agent error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## PART 5: FILE REVIEWS & GRADES

### 5.1 Existing File Grades

| File | Grade | Strengths | Weaknesses | Usability for Website |
|------|-------|-----------|------------|----------------------|
| `Andre_profil_full_refined.txt` | **A+** | Complete, production-ready, well-structured 3-part architecture | Plain text (needs JSON conversion) | **CRITICAL** - Primary system prompt |
| `Andre_Profile_Full.md` | **A** | Human-readable, comprehensive, good for onboarding | Some overlap with v3.0 | **HIGH** - About page, context |
| `Andre_RECALL_Index (1).md` | **A-** | Excellent ID system, fast lookups | Needs JSON format for API | **HIGH** - Context API |
| `Zentralisierungs_Projekt_BIG_DATA_OMEGA_V1.0.md` | **B+** | Comprehensive planning, clear tasks | Too theoretical, no code | **MEDIUM** - Roadmap reference |
| `Beast.txt` | **B** | Clear task rules | Very short, incomplete | **MEDIUM** - Task module rules |
| `Instruction Absolute mode.txt` | **B** | Concise mode definition | Very brief | **MEDIUM** - Mode switch |
| `CONFLICT_ANALYSIS.md` | **A** | Thorough analysis | Only internal use | **LOW** - Dev docs only |
| `INFORMATION_MAP.md` | **A** | Complete mapping | Only internal use | **LOW** - Dev docs only |
| `QUICK_REFERENCE.md` | **A-** | Good lookup guide | Overlaps with RECALL | **LOW** - Internal use |
| `RECOMMENDATIONS.md` | **B+** | Good suggestions | Not yet implemented | **LOW** - Dev roadmap |
| `README.md` | **A** | Clear, well-organized | Could link more | **MEDIUM** - Project entry |
| `SUMMARY.txt` | **B** | Good overview | Redundant | **LOW** - Archive |

### 5.2 Priority for Implementation

**TIER 1 - Must Convert:**
1. `Andre_profil_full_refined.txt` → `system-prompt.json` (for KI-Agent)
2. `Andre_RECALL_Index (1).md` → `recall-index.json` (for API)

**TIER 2 - Direct Use:**
3. `Andre_Profile_Full.md` → Content for About page
4. `Beast.txt` → Task module configuration

**TIER 3 - Reference:**
5. `Zentralisierungs_Projekt_BIG_DATA_OMEGA_V1.0.md` → Roadmap
6. Others → Developer documentation

---

## PART 6: IMPLEMENTATION STATUS

### 6.1 What This Document Created

✅ Complete gap analysis  
✅ File usage plan with specific targets  
✅ Database schema (Prisma format)  
✅ KI-Agent TypeScript implementation  
✅ API endpoint structure  
✅ System prompt JSON format  
✅ File grades and priorities  

### 6.2 Next Actions

1. **Convert profile to JSON** - Create `/profile/system-prompt.json`
2. **Convert RECALL to JSON** - Create `/profile/recall-index.json`
3. **Initialize Next.js project** - Set up actual codebase
4. **Implement database** - Apply Prisma schema
5. **Build KI-Agent** - Implement `/lib/agent/`
6. **Create API routes** - Implement `/app/api/`
7. **Build UI** - Dashboard, Chat, Prompts

---

## CONCLUSION

This document bridges the gap between documentation and implementation. The existing profile files are excellent (A/A+ quality) but need format conversion for web consumption. The planning documents provide solid architecture but require actual code implementation.

**Key Insight:** The profile system (v3.0) is mature enough for production use as a KI-Agent system prompt. The main work is format conversion and application scaffolding.

**Estimated MVP Time:** 4-6 weeks following this plan.

---

**Document Status:** Complete Implementation Plan  
**Created:** 2025-11-29  
**Ready For:** Code implementation phase
