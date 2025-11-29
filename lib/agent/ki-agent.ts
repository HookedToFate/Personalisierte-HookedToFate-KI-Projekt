/**
 * KI-Agent Core Implementation
 * Based on Andre_profil_full_refined.txt v3.0 (Cognitive Chimera Edition)
 * 
 * This module provides the core KI-Agent functionality for the personalized AI system.
 */

import { readFileSync } from 'fs';
import { join } from 'path';

// Types
export type FokusLevel = 1 | 2 | 3 | 4 | 5;
export type ZynismusLevel = 1 | 2 | 3 | 4 | 5;
export type AgentMode = 'normal' | 'beast' | 'creative' | 'absolute' | 'explorativ' | 'mehrdeutig';

export interface AgentConfig {
  fokusLevel: FokusLevel;
  zynismusLevel: ZynismusLevel;
  mode: AgentMode;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  metadata?: Record<string, unknown>;
}

export interface CommandParseResult {
  cleanMessage: string;
  commands: string[];
  recallQuery?: string;
}

// Load system prompt from JSON
function loadSystemPrompt(): Record<string, unknown> {
  const promptPath = join(process.cwd(), 'profile', 'system-prompt.json');
  const content = readFileSync(promptPath, 'utf-8');
  return JSON.parse(content);
}

// Load recall index from JSON
function loadRecallIndex(): Record<string, unknown> {
  const indexPath = join(process.cwd(), 'profile', 'recall-index.json');
  const content = readFileSync(indexPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Main KI-Agent class implementing the Cognitive Chimera architecture
 */
export class KIAgent {
  private config: AgentConfig;
  private conversationHistory: Message[];
  private systemPromptData: Record<string, unknown>;
  private recallIndex: Record<string, unknown>;

  constructor(config?: Partial<AgentConfig>) {
    this.config = {
      fokusLevel: config?.fokusLevel ?? 3,
      zynismusLevel: config?.zynismusLevel ?? 3,
      mode: config?.mode ?? 'normal',
    };
    this.conversationHistory = [];
    this.systemPromptData = loadSystemPrompt();
    this.recallIndex = loadRecallIndex();
  }

  /**
   * Parse commands from user message
   * Implements command detection from profile spec
   */
  parseCommands(message: string): CommandParseResult {
    const commands: string[] = [];
    let cleanMessage = message;
    let recallQuery: string | undefined;

    // Command patterns from profile
    const commandPatterns: [RegExp, string][] = [
      [/\/idee\b/gi, '/idee'],
      [/\/slash\s+RECALL\s+([^\n]+)/gi, '/slash RECALL'],
      [/#Fokus\s*(\d)/gi, '#Fokus'],
      [/#Kurz\b/gi, '#Kurz'],
      [/#DeepDive\b/gi, '#DeepDive'],
      [/#NoFun\b/gi, '#NoFun'],
      [/#MehrFun\b/gi, '#MehrFun'],
      [/#KeineMeta\b/gi, '#KeineMeta'],
      [/#Matrix\b/gi, '#Matrix'],
      [/!BEASTMODE\b/gi, '!BEASTMODE'],
      [/!UNRESTRICTED\b/gi, '!UNRESTRICTED'],
    ];

    // Extract RECALL query if present
    const recallMatch = message.match(/\/slash\s+RECALL\s+([^\n]+)/i);
    if (recallMatch) {
      recallQuery = recallMatch[1].trim();
    }

    // Extract fokus level if specified
    const fokusMatch = message.match(/#Fokus\s*(\d)/i);
    if (fokusMatch) {
      const level = parseInt(fokusMatch[1]);
      if (level >= 1 && level <= 5) {
        this.config.fokusLevel = level as FokusLevel;
      }
    }

    // Process all commands
    for (const [pattern, cmd] of commandPatterns) {
      if (pattern.test(message)) {
        commands.push(cmd);
        cleanMessage = cleanMessage.replace(pattern, '').trim();
      }
    }

    // Apply command effects
    this.applyCommands(commands);

    return { cleanMessage, commands, recallQuery };
  }

  /**
   * Apply command effects to agent configuration
   */
  private applyCommands(commands: string[]): void {
    for (const cmd of commands) {
      switch (cmd) {
        case '#Kurz':
          this.config.fokusLevel = 1;
          break;
        case '#DeepDive':
          this.config.fokusLevel = 5;
          break;
        case '#NoFun':
          this.config.zynismusLevel = 1;
          break;
        case '#MehrFun':
          this.config.zynismusLevel = 5;
          break;
        case '!BEASTMODE':
          this.config.mode = 'beast';
          break;
        case '/idee':
          this.config.mode = 'creative';
          break;
        case '#Matrix':
          this.config.fokusLevel = 5;
          break;
        case '!UNRESTRICTED':
          // Unlock all modes
          break;
      }
    }
  }

  /**
   * Get fokus level instructions
   */
  getFokusInstructions(): string {
    const instructions: Record<FokusLevel, string> = {
      1: 'FOKUS 1 (Ultra-Kurz): Max. 1-3 Sätze. Nur das Ergebnis/Befehl. Keine Begründung, keine Meta, kein Fun.',
      2: 'FOKUS 2 (Pragmatisch): 1 Absatz + Bulletpoints. Die Lösung + wichtigste Schritte. Minimaler Kontext.',
      3: 'FOKUS 3 (Standard): Strukturierte Antwort mit Kontext, Lösung, Schritte, Begründung. Zynismus Level 3.',
      4: 'FOKUS 4 (Deep Dive): Ausführliche Analyse. Hintergründe, Edge-Cases, "Warum"-Ebene, Alternativen.',
      5: 'FOKUS 5 (Matrix/Total): Vollständige Abhandlung. Philosophische Implikationen, Cross-Domain-Verbindungen, maximale Tiefe.',
    };
    return instructions[this.config.fokusLevel];
  }

  /**
   * Get mode-specific instructions
   */
  getModeInstructions(): string {
    const modes: Record<AgentMode, string> = {
      normal: '',
      beast: 'MODE: BEAST - Maximale Effizienz. Ton extrem direkt. Keine Rücksicht auf Befindlichkeit. Nur Ergebnisse.',
      creative: 'MODE: CREATIVE - Assoziativ, divergierend. "Ja, und..." Spielerisch, metaphorisch, inspirierend.',
      absolute: 'MODE: ABSOLUTE - Binär, Hart, Faktenbasiert. Trocken, emotionslos, präzise. Schnelle Wahrheitsfindung.',
      explorativ: 'MODE: EXPLORATIV - Forschend, Fragen stellend, Hypothesen bildend. Neugierig, akademisch, offen.',
      mehrdeutig: 'MODE: MEHRDEUTIG-LOYAL - Akzeptiert Widersprüche, hält Spannungen aus. Loyalität gilt Andre.',
    };
    return modes[this.config.mode];
  }

  /**
   * Get zynismus level description
   */
  getZynismusInstructions(): string {
    const levels: Record<ZynismusLevel, string> = {
      1: 'ZYNISMUS 1: Rein sachlich, keine Ironie.',
      2: 'ZYNISMUS 2: Minimal trocken, gelegentlich ein Bild.',
      3: 'ZYNISMUS 3: Standard - Trocken-zynisch, Metaphern wo sie helfen.',
      4: 'ZYNISMUS 4: Deutlich sarkastisch, schneidend, aber nicht verletzend.',
      5: 'ZYNISMUS 5: Maximaler Zynismus, Respekt bleibt gewahrt.',
    };
    return levels[this.config.zynismusLevel];
  }

  /**
   * Search recall index for relevant context
   */
  searchRecall(query: string): string[] {
    const results: string[] = [];
    const queryLower = query.toLowerCase();

    // Search through all categories
    for (const [category, data] of Object.entries(this.recallIndex)) {
      if (typeof data === 'object' && data !== null && 'entries' in data) {
        const entries = (data as { entries: Record<string, { key: string; value: string }> }).entries;
        for (const [id, entry] of Object.entries(entries)) {
          if (
            entry.value.toLowerCase().includes(queryLower) ||
            entry.key.toLowerCase().includes(queryLower)
          ) {
            results.push(`[ID:${id}] ${entry.key}: ${entry.value}`);
          }
        }
      }
    }

    return results.slice(0, 10); // Limit results
  }

  /**
   * Build the complete system prompt
   */
  buildSystemPrompt(context?: { recallQuery?: string }): string {
    const profile = this.systemPromptData.profile as Record<string, unknown>;
    const tone = this.systemPromptData.tone as Record<string, unknown>;
    const execution = this.systemPromptData.execution as Record<string, unknown>;

    // Core identity
    const identity = profile.identity as Record<string, unknown>;
    
    // Build recall context if query provided
    let recallContext = '';
    if (context?.recallQuery) {
      const results = this.searchRecall(context.recallQuery);
      if (results.length > 0) {
        recallContext = `\n\nRECALL CONTEXT for "${context.recallQuery}":\n${results.join('\n')}`;
      }
    }

    return `ANDRE_PROFILE v3.0 — Cognitive Chimera Edition
═══════════════════════════════════════════════════

IDENTITY:
- Name: ${identity.name} (Aliases: ${(identity.aliases as string[]).join(', ')})
- Mode: ${identity.baseMode}
- Language: ${(identity.language as Record<string, string>).primary} (primary), ${(identity.language as Record<string, string>).secondary} (secondary)

TONE ARCHETYPE:
"${tone.archetype}"

${this.getZynismusInstructions()}

${this.getFokusInstructions()}

${this.getModeInstructions()}

CORE RULES:
1. Keine Coach-Sprüche, keine Therapie-Formulierungen
2. Keine Emojis, kein Smalltalk
3. Direktheit ist Respekt
4. Bei Overload-Signalen: Decision Shrinking (max 2 Optionen)
5. Investment-Matching: Viel Input = Viel Output
6. Metaphern nur bei Klarheitsgewinn

FORBIDDEN:
- "Du schaffst das!", "Ich glaube an dich"
- "Wie fühlst du dich damit?"
- "Das ist so spannend!", "Wow!"
- Defensive Rechtfertigungen
- Zufriedenheitsfragen

GOOD TONE EXAMPLES:
- "Das Setup ist ungefähr so stabil wie ein Ikea-Regal im Erdbeben. Lass uns das fixen."
- "17 Tabs offen für die perfekte Lösung, während die pragmatische seit 10 Minuten vor dir liegt."
${recallContext}

═══════════════════════════════════════════════════
EXECUTE WITH THESE PARAMETERS. START.`;
  }

  /**
   * Process a user message and generate response
   * This would integrate with OpenAI API in production
   */
  async processMessage(userMessage: string): Promise<{
    systemPrompt: string;
    processedMessage: string;
    config: AgentConfig;
  }> {
    const { cleanMessage, recallQuery } = this.parseCommands(userMessage);
    const systemPrompt = this.buildSystemPrompt({ recallQuery });

    // Add to conversation history
    this.conversationHistory.push({
      role: 'user',
      content: cleanMessage,
      timestamp: new Date(),
    });

    return {
      systemPrompt,
      processedMessage: cleanMessage,
      config: { ...this.config },
    };
  }

  /**
   * Get current configuration
   */
  getConfig(): AgentConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<AgentConfig>): void {
    if (updates.fokusLevel !== undefined) {
      this.config.fokusLevel = updates.fokusLevel;
    }
    if (updates.zynismusLevel !== undefined) {
      this.config.zynismusLevel = updates.zynismusLevel;
    }
    if (updates.mode !== undefined) {
      this.config.mode = updates.mode;
    }
  }

  /**
   * Clear conversation history
   */
  clearHistory(): void {
    this.conversationHistory = [];
  }

  /**
   * Get conversation history
   */
  getHistory(): Message[] {
    return [...this.conversationHistory];
  }
}

// Export default instance factory
export function createAgent(config?: Partial<AgentConfig>): KIAgent {
  return new KIAgent(config);
}
