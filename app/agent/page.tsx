"use client";

import { useState } from "react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Fehler: Verbindung zum KI-Agent fehlgeschlagen.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-400 mb-2">
              KI-Agent Chat
            </h1>
            <p className="text-gray-400">
              Powered by Andre Profile v3.0 | Cognitive Chimera Edition
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-300"
          >
            ← Back
          </Link>
        </div>

        {/* Chat Interface */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                <p className="text-xl mb-4">🤖</p>
                <p className="mb-2">
                  KI-Agent bereit. Starte eine Conversation.
                </p>
                <p className="text-sm">
                  Commands: /idee, #Fokus [1-5], #Kurz, #DeepDive, !BEASTMODE
                </p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <div className="text-xs opacity-70 mb-1">
                    {msg.role === "user" ? "You" : "KI-Agent"}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-semibold"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-400 mb-2">Quick Commands</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>/idee - Creative Mode</li>
              <li>#Fokus [1-5] - Set Detail Level</li>
              <li>#Kurz - Ultra Short</li>
              <li>#DeepDive - Deep Analysis</li>
            </ul>
          </div>
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
            <h3 className="font-semibold text-purple-400 mb-2">Tone Control</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>#NoFun - Zynismus 0</li>
              <li>#MehrFun - Zynismus 4-5</li>
              <li>!BEASTMODE - Max Efficiency</li>
            </ul>
          </div>
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4">
            <h3 className="font-semibold text-green-400 mb-2">Profile Active</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>✓ Value Hierarchy</li>
              <li>✓ Intent Scan L1/L2/L3</li>
              <li>✓ Overload Detection</li>
              <li>✓ Reciprocity Protocol</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
