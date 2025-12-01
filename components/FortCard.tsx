import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mountain, TrendingUp } from 'lucide-react';
import { Fort, Difficulty } from '../types';

interface FortCardProps {
  fort: Fort;
}

const FortCard: React.FC<FortCardProps> = ({ fort }) => {
  const difficultyConfig = 
    fort.difficulty === Difficulty.EASY ? { color: 'text-emerald-700', bg: 'bg-emerald-50' } :
    fort.difficulty === Difficulty.MODERATE ? { color: 'text-amber-700', bg: 'bg-amber-50' } :
    { color: 'text-rose-700', bg: 'bg-rose-50' };

  return (
    <Link to={`/fort/${fort.id}`} className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1 border border-stone-100">
      <div className="h-56 overflow-hidden relative">
        <img 
          src={fort.images[0]} 
          alt={fort.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-fort-100 transition-colors">{fort.name}</h3>
          <p className="text-white/80 text-xs font-medium flex items-center gap-1.5 uppercase tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-fort-300" /> {fort.region}
          </p>
        </div>
        
        <div className="absolute top-4 right-4">
           <span className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md bg-white/90 shadow-sm ${difficultyConfig.color}`}>
            {fort.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <p className="text-stone-600 text-sm line-clamp-2 mb-5 leading-relaxed">
          {fort.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-stone-500 pt-4 border-t border-stone-100">
          <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded-md">
            <TrendingUp className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-medium">{fort.distanceFromPune} km from Pune</span>
          </div>
          <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded-md">
             <Mountain className="w-3.5 h-3.5 text-stone-400" />
             <span className="font-medium">{fort.elevation}m</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FortCard;