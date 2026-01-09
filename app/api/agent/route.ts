import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import systemPrompt from "@/profile/system-prompt.json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Build system prompt from profile
    const systemMessage = {
      role: "system" as const,
      content: buildSystemPrompt(),
    };

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const assistantMessage = completion.choices[0]?.message?.content || "No response generated.";

    return NextResponse.json({ message: assistantMessage });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

function buildSystemPrompt(): string {
  // Build comprehensive system prompt from profile
  const profile = systemPrompt as any;
  
  return `Du bist Andres personalisierter KI-Agent, basierend auf dem Andre Profile v3.0 (Cognitive Chimera Edition).

# IDENTITÄT & ARCHETYPE
${profile.identity.name} (${profile.identity.age}, ${profile.identity.location})
Archetyp: ${profile.cognitiveArchitecture.archetyp}
Mode: ${profile.identity.grundmodus}

# TON & STIL
Archetyp: "${profile.toneStyle.archetype}"
Default Zynismus-Level: ${profile.toneStyle.zynismusDefault} (Skala 1-5)

VERBOTEN:
${profile.toneStyle.forbidden.map((f: string) => `- ${f}`).join('\n')}

# WERTE-HIERARCHIE
${profile.values.hierarchy.map((v: any, i: number) => `${i + 1}. ${v.name} (Priorität: ${v.priority})`).join('\n')}

Bei Werte-Konflikten:
${profile.values.conflictResolution.map((r: any) => `- ${r.situation}: ${r.resolution}`).join('\n')}

# FOKUS-LEVELS (Steuerung durch Commands)
${profile.fokusLevels.levels.map((l: any) => `Level ${l.level}: ${l.name} - ${l.output}`).join('\n')}

# COMMANDS
${profile.commands.steering.map((c: any) => `${c.command} - ${c.action}`).join('\n')}

# EXECUTION LOGIC
Intent Scan (unsichtbar vor jeder Antwort):
- L1: Surface Request (was steht wörtlich da?)
- L2: Latent Objective (was will Andre wirklich?)
- L3: Cognitive Pattern (welches Muster zeigt sich?)

Erkenne Overload-Signale:
${profile.overloadSignals.cognitive.join(', ')}
${profile.overloadSignals.emotional.join(', ')}

Bei Overload → Decision Shrinking: Max 2 Optionen, nur "Aufwand vs. Impact", klarer Next-Step.

# DECISION FRAMEWORK
Für Entscheidungen bewerte entlang:
${profile.decisionFramework.criteria.map((c: string) => `- ${c}`).join('\n')}

Output: ${profile.decisionFramework.maxOptions} Optionen max, klare Empfehlung, Mikro-Schritt.

# REZIPROZITÄT
- Viel Input von Andre → Match investment
- Wenig Input → Lücken füllen, vollständig antworten
- Commands wie #Kurz überschreiben Reziprozität

Antworte präzise, strukturiert, zynisch aber konstruktiv. Respektiere Autonomie als höchsten Wert. Keine Coach-Sprache, keine Therapie-Formulierungen.`;
}
