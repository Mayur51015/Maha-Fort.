import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Sparkles, Loader } from 'lucide-react';
import FortCard from '../components/FortCard';
import { MOCK_FORTS } from '../constants';
import { Difficulty, Fort } from '../types';
import { searchFortsWithAI } from '../services/geminiService';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResults, setAiResults] = useState<Fort[] | null>(null);

  // Standard local filter
  const localFilteredForts = MOCK_FORTS.filter(fort => {
    const matchesSearch = fort.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          fort.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiff = filterDifficulty === 'All' || fort.difficulty === filterDifficulty;
    return matchesSearch && matchesDiff;
  });

  // Decide which list to show: AI results (if active) or standard local filter
  const displayedForts = aiResults || localFilteredForts;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setAiResults(null);
      return;
    }

    setIsSearching(true);
    // Use AI to understand natural language intent
    const matchedIds = await searchFortsWithAI(searchTerm, MOCK_FORTS);
    
    if (matchedIds.length > 0) {
      const results = MOCK_FORTS.filter(f => matchedIds.includes(f.id));
      setAiResults(results);
    } else {
      // Fallback to local search if AI returns nothing, or empty if it means "no match found"
      // But typically we trust the AI returned [] for a reason. 
      // Let's fallback to local string match just in case AI missed simple keyword
      const fallback = MOCK_FORTS.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        f.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setAiResults(fallback);
    }
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setAiResults(null);
    setFilterDifficulty('All');
  };

  return (
    <div className="min-h-screen pb-20 bg-stone-50">
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/id/1036/1920/1080" 
            alt="Sahyadri Mountains" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-4 mt-10">
          <span className="inline-block py-1 px-3 rounded-full bg-fort-500/20 border border-fort-400/30 backdrop-blur-md text-fort-100 text-sm font-medium mb-6">
            Explore Maharashtra's Heritage
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-sm">
            Legends of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-fort-300 to-emerald-200">Sahyadris</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            Your comprehensive guide to over 200 historical forts. Plan your trek, explore history, and trek safely.
          </p>
          
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-fort-400 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <form onSubmit={handleSearch} className="relative flex items-center bg-white rounded-xl shadow-2xl p-2 transition-transform active:scale-[0.99]">
              <Search className="ml-4 text-stone-400 w-6 h-6" />
              <input 
                type="text"
                placeholder="Try 'easy treks near Pune' or 'historical forts'..." 
                className="w-full pl-4 pr-4 py-3 text-lg bg-transparent text-stone-900 placeholder:text-stone-400 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isSearching}
                className="bg-fort-600 text-white p-3 rounded-lg hover:bg-fort-700 transition-colors disabled:bg-fort-400"
              >
                {isSearching ? <Loader className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Directory Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="bg-white/50 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl p-8 mb-12">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-800 flex items-center gap-2">
                {aiResults ? <><Sparkles className="w-6 h-6 text-purple-600" /> Smart Results</> : 'Fort Directory'}
              </h2>
              <p className="text-stone-500 mt-1">Found {displayedForts.length} destinations ready for exploration</p>
            </div>
            
            {!aiResults && (
              <div className="flex flex-wrap items-center gap-2 bg-stone-100/50 p-1.5 rounded-xl border border-stone-200">
                <button 
                  onClick={() => setFilterDifficulty('All')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterDifficulty === 'All' ? 'bg-white text-stone-900 shadow-sm ring-1 ring-black/5' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200/50'}`}
                >
                  All
                </button>
                {Object.values(Difficulty).map(d => (
                  <button 
                    key={d} 
                    onClick={() => setFilterDifficulty(d)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterDifficulty === d ? 'bg-white text-stone-900 shadow-sm ring-1 ring-black/5' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200/50'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
            
            {aiResults && (
              <button onClick={clearSearch} className="text-sm font-bold text-stone-500 hover:text-stone-800 underline">
                Clear Search
              </button>
            )}
          </div>
        </div>

        {isSearching ? (
           <div className="text-center py-32 animate-pulse">
             <div className="w-16 h-16 bg-fort-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Sparkles className="w-8 h-8 text-fort-600" />
             </div>
             <h3 className="text-xl font-bold text-stone-800">Searching intelligently...</h3>
             <p className="text-stone-500">Asking Gemini to find the best forts for you.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedForts.map(fort => (
              <FortCard key={fort.id} fort={fort} />
            ))}
          </div>
        )}

        {displayedForts.length === 0 && !isSearching && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
            <div className="bg-stone-50 inline-flex p-4 rounded-full mb-4">
              <Search className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">No forts found</h3>
            <p className="text-stone-500">Try adjusting your search or filters to find what you're looking for.</p>
            {aiResults && (
              <button onClick={clearSearch} className="mt-4 text-fort-600 font-bold hover:underline">
                Show All Forts
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;