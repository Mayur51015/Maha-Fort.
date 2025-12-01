import React, { useState } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import { askGeminiHistorian } from '../services/geminiService';

interface GeminiChatProps {
  fortName: string;
  historyContext: string;
}

const GeminiChat: React.FC<GeminiChatProps> = ({ fortName, historyContext }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const answer = await askGeminiHistorian(fortName, historyContext, query);
    setResponse(answer);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-stone-50 to-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      <div className="bg-white border-b border-stone-100 px-6 py-4 flex items-center gap-3">
        <div className="bg-fort-100 p-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-fort-600" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-stone-800">Ask the Historian</h3>
          <p className="text-xs text-stone-500">AI-powered insights about {fortName}</p>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {response ? (
           <div className="space-y-4">
             <div className="flex justify-end">
               <div className="bg-stone-800 text-white py-3 px-5 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-md">
                 {query}
               </div>
             </div>
             <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-fort-100 flex items-center justify-center flex-shrink-0 mt-1">
                 <Bot className="w-5 h-5 text-fort-600" />
               </div>
               <div className="bg-white border border-stone-200 p-5 rounded-2xl rounded-tl-sm text-stone-700 text-sm leading-relaxed shadow-sm">
                 {response}
               </div>
             </div>
           </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-stone-400">
            <Bot className="w-12 h-12 mb-3 opacity-20" />
            <p className="text-sm">Curious about a specific battle or legend?<br/>Ask me anything about {fortName}.</p>
          </div>
        )}

        <form onSubmit={handleAsk} className="relative mt-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question..."
            className="w-full pl-5 pr-14 py-4 rounded-xl bg-white border border-stone-200 text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-fort-500/20 focus:border-fort-500 outline-none transition-all shadow-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-fort-600 text-white rounded-lg hover:bg-fort-700 disabled:bg-stone-300 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Send className="w-5 h-5" />}
          </button>
        </form>
        <p className="text-[10px] text-stone-400 text-center">
          Powered by Gemini AI. Responses may vary in accuracy.
        </p>
      </div>
    </div>
  );
};

export default GeminiChat;