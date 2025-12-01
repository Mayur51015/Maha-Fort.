import React, { useState } from 'react';
import { Search, MapPin, Sparkles, Loader } from 'lucide-react';
import FortCard from '../components/FortCard';
import { MOCK_FORTS } from '../constants';
import { Difficulty, Fort } from '../types';
import { searchFortsWithAI } from '../services/geminiService';

const Directory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [filterRegion, setFilterRegion] = useState<string>('All');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResults, setAiResults] = useState<Fort[] | null>(null);

  const regions = Array.from(new Set(MOCK_FORTS.map(f => f.region)));

  // Local filter logic
  const localFilteredForts = MOCK_FORTS.filter(fort => {
    const matchesSearch = fort.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          fort.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiff = filterDifficulty === 'All' || fort.difficulty === filterDifficulty;
    const matchesRegion = filterRegion === 'All' || fort.region === filterRegion;
    return matchesSearch && matchesDiff && matchesRegion;
  });

  // Display either AI results or local filter results
  const displayedForts = aiResults || localFilteredForts;

  const handleSearch = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setAiResults(null);
      return;
    }

    setIsSearching(true);
    const matchedIds = await searchFortsWithAI(searchTerm, MOCK_FORTS);
    
    if (matchedIds.length > 0) {
      setAiResults(MOCK_FORTS.filter(f => matchedIds.includes(f.id)));
    } else {
      // Fallback
      setAiResults(MOCK_FORTS.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        f.region.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setAiResults(null);
    setFilterDifficulty('All');
    setFilterRegion('All');
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Fort Directory</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Browse our complete collection of historical forts. Filter by difficulty or use AI search to find your next adventure.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 mb-8 sticky top-20 z-10">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              {aiResults ? (
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 w-5 h-5" />
              ) : (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
              )}
              <input 
                type="text"
                placeholder="Search or ask AI (e.g. 'easy forts')..."
                className={`w-full pl-10 pr-12 py-2.5 bg-stone-50 border rounded-xl focus:ring-2 outline-none transition-all ${aiResults ? 'border-purple-200 focus:border-purple-500 focus:ring-purple-500/20' : 'border-stone-200 focus:border-fort-500 focus:ring-fort-500/20'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {isSearching && (
                 <div className="absolute right-3 top-1/2 -translate-y-1/2">
                   <Loader className="w-4 h-4 animate-spin text-fort-600" />
                 </div>
              )}
            </div>

            <div className="relative">
              <select 
                className="w-full pl-4 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-fort-500/20 focus:border-fort-500 outline-none appearance-none cursor-pointer disabled:opacity-50"
                value={filterDifficulty}
                onChange={(e) => { setFilterDifficulty(e.target.value); setAiResults(null); }}
                disabled={!!aiResults}
              >
                <option value="All">All Difficulties</option>
                {Object.values(Difficulty).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
              <select 
                className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-fort-500/20 focus:border-fort-500 outline-none appearance-none cursor-pointer disabled:opacity-50"
                value={filterRegion}
                onChange={(e) => { setFilterRegion(e.target.value); setAiResults(null); }}
                disabled={!!aiResults}
              >
                <option value="All">All Regions</option>
                {regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </form>
           {aiResults && (
              <div className="mt-3 text-right">
                <button onClick={clearSearch} className="text-xs font-bold text-stone-400 hover:text-stone-700">
                  Clear AI Results
                </button>
              </div>
            )}
        </div>

        {/* Grid */}
        {isSearching ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
             {[1,2,3].map(i => (
               <div key={i} className="bg-white rounded-2xl h-80 border border-stone-100"></div>
             ))}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedForts.map(fort => (
              <FortCard key={fort.id} fort={fort} />
            ))}
          </div>
        )}

        {displayedForts.length === 0 && !isSearching && (
          <div className="text-center py-20">
            <p className="text-stone-500">No forts found matching your criteria.</p>
            <button 
              onClick={clearSearch}
              className="mt-4 text-fort-600 hover:text-fort-700 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;