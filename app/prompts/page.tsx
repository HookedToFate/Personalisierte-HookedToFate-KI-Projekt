'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  version: number;
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: ''
  });

  // Load prompts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('prompts');
    if (stored) {
      setPrompts(JSON.parse(stored));
    }
  }, []);

  // Save prompts to localStorage whenever they change
  useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem('prompts', JSON.stringify(prompts));
    }
  }, [prompts]);

  const categories = ['general', 'creative', 'technical', 'business', 'personal'];

  const handleCreate = () => {
    if (!formData.title || !formData.content) return;
    
    const newPrompt: Prompt = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      category: formData.category,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1
    };
    
    setPrompts([newPrompt, ...prompts]);
    setFormData({ title: '', content: '', category: 'general', tags: '' });
    setIsCreating(false);
  };

  const handleUpdate = (id: string) => {
    setPrompts(prompts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          title: formData.title,
          content: formData.content,
          category: formData.category,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
          updatedAt: new Date().toISOString(),
          version: p.version + 1
        };
      }
      return p;
    }));
    setFormData({ title: '', content: '', category: 'general', tags: '' });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this prompt?')) {
      setPrompts(prompts.filter(p => p.id !== id));
    }
  };

  const handleEdit = (prompt: Prompt) => {
    setFormData({
      title: prompt.title,
      content: prompt.content,
      category: prompt.category,
      tags: prompt.tags.join(', ')
    });
    setEditingId(prompt.id);
    setIsCreating(true);
  };

  const handleEnhance = async (id: string) => {
    const prompt = prompts.find(p => p.id === id);
    if (!prompt) return;

    try {
      const response = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.content })
      });

      if (response.ok) {
        const { enhanced } = await response.json();
        setPrompts(prompts.map(p => {
          if (p.id === id) {
            return {
              ...p,
              content: enhanced,
              updatedAt: new Date().toISOString(),
              version: p.version + 1
            };
          }
          return p;
        }));
      }
    } catch (error) {
      console.error('Enhancement failed:', error);
      alert('Failed to enhance prompt. Make sure OpenAI API is configured.');
    }
  };

  const filteredPrompts = prompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const exportPrompts = () => {
    const dataStr = JSON.stringify(prompts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `prompts_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Prompt Management</h1>
            <p className="text-gray-400">Create, organize, and enhance your prompts</p>
          </div>
          <Link 
            href="/"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur p-4 rounded-lg border border-slate-700">
            <div className="text-2xl font-bold text-white">{prompts.length}</div>
            <div className="text-sm text-gray-400">Total Prompts</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur p-4 rounded-lg border border-slate-700">
            <div className="text-2xl font-bold text-white">{new Set(prompts.flatMap(p => p.tags)).size}</div>
            <div className="text-sm text-gray-400">Unique Tags</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur p-4 rounded-lg border border-slate-700">
            <div className="text-2xl font-bold text-white">{new Set(prompts.map(p => p.category)).size}</div>
            <div className="text-sm text-gray-400">Categories</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur p-4 rounded-lg border border-slate-700">
            <div className="text-2xl font-bold text-white">{prompts.reduce((sum, p) => sum + p.version, 0)}</div>
            <div className="text-sm text-gray-400">Total Versions</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-4 mb-6">
          <div className="flex gap-4 items-center">
            <button
              onClick={() => {
                setIsCreating(!isCreating);
                setEditingId(null);
                setFormData({ title: '', content: '', category: 'general', tags: '' });
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
            >
              {isCreating ? 'Cancel' : '+ New Prompt'}
            </button>
            
            <input
              type="text"
              placeholder="Search prompts..."
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
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>

            <button
              onClick={exportPrompts}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              Export
            </button>
          </div>
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Edit Prompt' : 'Create New Prompt'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-700 focus:outline-none focus:border-purple-500"
                  placeholder="Enter prompt title..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-700 focus:outline-none focus:border-purple-500 min-h-[200px]"
                  placeholder="Enter prompt content..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-700 focus:outline-none focus:border-purple-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg border border-slate-700 focus:outline-none focus:border-purple-500"
                    placeholder="tag1, tag2, tag3..."
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => editingId ? handleUpdate(editingId) : handleCreate()}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                >
                  {editingId ? 'Update Prompt' : 'Create Prompt'}
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    setFormData({ title: '', content: '', category: 'general', tags: '' });
                  }}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Prompts List */}
        <div className="space-y-4">
          {filteredPrompts.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-12 text-center">
              <p className="text-gray-400 text-lg">
                {prompts.length === 0 ? 'No prompts yet. Create your first prompt!' : 'No prompts match your search.'}
              </p>
            </div>
          ) : (
            filteredPrompts.map(prompt => (
              <div key={prompt.id} className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 p-6 hover:border-purple-500 transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{prompt.title}</h3>
                    <div className="flex gap-2 items-center mb-2">
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded">
                        {prompt.category}
                      </span>
                      <span className="text-xs text-gray-500">v{prompt.version}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">
                        {new Date(prompt.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    {prompt.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {prompt.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-700 text-gray-400 text-xs rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(prompt)}
                      className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleEnhance(prompt.id)}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition"
                    >
                      ✨ Enhance
                    </button>
                    <button
                      onClick={() => handleDelete(prompt.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-300 whitespace-pre-wrap">{prompt.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
