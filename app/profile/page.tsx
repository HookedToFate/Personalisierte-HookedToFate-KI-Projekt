'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import systemPromptData from '@/profile/system-prompt.json';
import recallIndexData from '@/profile/recall-index.json';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'recall' | 'settings'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const profile = systemPromptData;
  
  // Flatten recall index entries from all categories
  const recallEntries = Object.entries(recallIndexData)
    .filter(([key]) => !['version', 'description', 'totalEntries', 'lookupFunctions'].includes(key))
    .flatMap(([category, data]: [string, any]) => {
      if (data.entries) {
        return Object.entries(data.entries).map(([id, entry]: [string, any]) => ({
          id,
          category,
          key: entry.key,
          value: entry.value
        }));
      }
      return [];
    });

  // Filter RECALL entries
  const filteredRecall = recallEntries.filter((entry: any) => {
    const matchesSearch = 
      entry.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(entry.value).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(recallEntries.map((e: any) => e.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Andre Profile v3.0</h1>
            <p className="text-gray-400">Cognitive Chimera Edition - Complete Profile Data</p>
          </div>
          <Link 
            href="/"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg transition ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800/50 text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('recall')}
            className={`px-6 py-3 rounded-lg transition ${
              activeTab === 'recall'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800/50 text-gray-400 hover:text-white'
            }`}
          >
            RECALL Index ({recallEntries.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-lg transition ${
              activeTab === 'settings'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800/50 text-gray-400 hover:text-white'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Core Identity */}
            <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Core Identity</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-white text-lg">{profile.profile.identity.name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Age</p>
                  <p className="text-white text-lg">{profile.profile.identity.age} years</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white text-lg">{profile.profile.identity.location}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Languages</p>
                  <p className="text-white text-lg">{profile.profile.identity.language.primary}, {profile.profile.identity.language.secondary}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Archetype</p>
                  <p className="text-white text-lg">{profile.profile.cognition.archetype}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Base Mode</p>
                  <p className="text-white text-lg">{profile.profile.identity.baseMode}</p>
                </div>
              </div>
            </div>

            {/* Value Hierarchy */}
            <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Value Hierarchy</h2>
              <div className="space-y-3">
                {profile.profile.values.hierarchy.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-purple-400">{item.rank}</div>
                    <div className="flex-1 px-4 py-3 bg-slate-900/50 rounded-lg">
                      <p className="text-white font-semibold">{item.value}</p>
                      <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roles */}
            <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Roles & Identity Clusters</h2>
              <div className="grid grid-cols-2 gap-3">
                {profile.profile.roles.map((role: any, index: number) => (
                  <div key={index} className="px-4 py-3 bg-slate-900/50 rounded-lg">
                    <p className="text-white font-semibold">{role.name}</p>
                    <p className="text-gray-400 text-xs mt-1">{role.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Control Levels */}
            <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Fokus Levels</h2>
              <div className="space-y-2">
                {Object.entries(profile.execution.fokusLevels).map(([level, config]: [string, any]) => (
                  <div key={level} className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold">{level}:</span>
                    <span className="text-gray-300">{config.name} - {config.output}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modes */}
            <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Behavioral Modes</h2>
              <div className="space-y-4">
                {Object.entries(profile.modes).map(([mode, config]: [string, any]) => (
                  <div key={mode} className="px-4 py-3 bg-slate-900/50 rounded-lg">
                    <h3 className="text-white font-bold mb-2">{mode}</h3>
                    <p className="text-gray-400 text-sm mb-2">{config.logic}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-purple-400">Tone: {config.tone}</span>
                      <span className="text-purple-400">Goal: {config.goal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RECALL Index Tab */}
        {activeTab === 'recall' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search RECALL index..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-700 focus:outline-none focus:border-purple-500"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-700 focus:outline-none focus:border-purple-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat: string) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* RECALL Entries */}
            <div className="grid grid-cols-1 gap-4">
              {filteredRecall.map((entry: any) => (
                <div key={entry.id} className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-4 hover:border-purple-500 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-purple-400 font-mono text-sm">ID:{entry.id}</span>
                        <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded">{entry.category}</span>
                      </div>
                      <p className="text-white font-semibold mb-1">{entry.key}</p>
                      <p className="text-gray-400">{entry.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRecall.length === 0 && (
              <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-12 text-center">
                <p className="text-gray-400 text-lg">No entries match your search.</p>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Profile Settings</h2>
              <p className="text-gray-400 mb-6">Configure default behavior and preferences</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Default Fokus Level</label>
                  <select className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-700">
                    <option value="1">1 - Ultra Short</option>
                    <option value="2">2 - Kurz & knapp</option>
                    <option value="3" selected>3 - Standard (Default)</option>
                    <option value="4">4 - Deep Dive</option>
                    <option value="5">5 - Exhaustive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2">Default Zynismus Level</label>
                  <select className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-700">
                    <option value="0">0 - No Fun (Purely Factual)</option>
                    <option value="1">1 - Minimal</option>
                    <option value="2">2 - Light</option>
                    <option value="3" selected>3 - Standard (Default)</option>
                    <option value="4">4 - Strong</option>
                    <option value="5">5 - Maximum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2">Default Mode</label>
                  <select className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-700">
                    <option value="normal" selected>Normal - Balanced</option>
                    <option value="beast">Beast Mode - Maximum Efficiency</option>
                    <option value="creative">Creative Mode - Brainstorming</option>
                    <option value="absolute">Absolute Mode - Ultra Focused</option>
                  </select>
                </div>

                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition">
                  Save Settings
                </button>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Export Profile</h2>
              <p className="text-gray-400 mb-4">Download profile data for backup or analysis</p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">
                  Export as JSON
                </button>
                <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">
                  Export RECALL Index
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
