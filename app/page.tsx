import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Effective Board of Fate
          </h1>
          <p className="text-xl text-gray-400">
            Zentralisierungs_Projekt_BIG.DATA.OMEGA V1.0
          </p>
          <p className="text-sm text-gray-500 mt-2">
            [ZL-D ID: "UntergrabungsLuftkampf"]
          </p>
        </header>

        {/* Status Banner */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-green-400 font-semibold">System Status: ONLINE</p>
                <p className="text-gray-400 text-sm">MVP successfully launched - Phase 1 implementation complete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {/* KI-Agent */}
          <Link href="/agent" className="group">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                KI-Agent
              </h3>
              <p className="text-gray-400 text-sm">
                Personalisierter KI-Agent mit Andre Profile v3.0 Integration
              </p>
              <div className="mt-4 text-blue-400 text-sm font-semibold">
                Launch Chat →
              </div>
            </div>
          </Link>

          {/* Prompt Management */}
          <Link href="/prompts" className="group">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                Prompt Manager
              </h3>
              <p className="text-gray-400 text-sm">
                Create, edit, and organize your prompts with AI enhancement
              </p>
              <div className="mt-4 text-purple-400 text-sm font-semibold">
                Manage Prompts →
              </div>
            </div>
          </Link>

          {/* Ideas & Blueprints */}
          <Link href="/ideas" className="group">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-green-500 transition-all hover:shadow-lg hover:shadow-green-500/20">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                Ideas & Blueprints
              </h3>
              <p className="text-gray-400 text-sm">
                Store and develop your creative projects and system designs
              </p>
              <div className="mt-4 text-green-400 text-sm font-semibold">
                View Ideas →
              </div>
            </div>
          </Link>

          {/* Tool Workshop */}
          <Link href="/tools" className="group">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-yellow-500 transition-all hover:shadow-lg hover:shadow-yellow-500/20">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                Tool Workshop
              </h3>
              <p className="text-gray-400 text-sm">
                Integrated tools and utilities for workflow automation
              </p>
              <div className="mt-4 text-yellow-400 text-sm font-semibold">
                Browse Tools →
              </div>
            </div>
          </Link>

          {/* Profile & Settings */}
          <Link href="/profile" className="group">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                Profile & Settings
              </h3>
              <p className="text-gray-400 text-sm">
                View Andre Profile v3.0 and configure system preferences
              </p>
              <div className="mt-4 text-cyan-400 text-sm font-semibold">
                View Profile →
              </div>
            </div>
          </Link>

          {/* Gamification */}
          <Link href="/quests" className="group">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-pink-500 transition-all hover:shadow-lg hover:shadow-pink-500/20">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">
                Quests & XP
              </h3>
              <p className="text-gray-400 text-sm">
                Playful side-quests, XP tracking, and achievement system
              </p>
              <div className="mt-4 text-pink-400 text-sm font-semibold">
                View Quests →
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">System Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-3xl font-bold text-blue-400">6</p>
                <p className="text-sm text-gray-400">Core Modules</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-400">267</p>
                <p className="text-sm text-gray-400">Profile Data Points</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-400">v3.0</p>
                <p className="text-sm text-gray-400">Andre Profile</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-400">MVP</p>
                <p className="text-sm text-gray-400">Phase 1 Ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm">
          <p className="mb-2">
            Built with Andre Profile v3.0 | Cognitive Chimera Edition
          </p>
          <p>
            Domain: General creative selfstructure Strategy | Mode: UNRESTRICTED
          </p>
        </footer>
      </div>
    </div>
  );
}
