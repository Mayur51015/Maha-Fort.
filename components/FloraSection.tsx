import React from 'react';
import { Leaf, AlertTriangle, CheckCircle, Info, Heart } from 'lucide-react';
import { Plant, PlantCategory } from '../types';
import { MOCK_PLANTS } from '../constants';

interface FloraSectionProps {
  plantIds: string[];
}

const FloraSection: React.FC<FloraSectionProps> = ({ plantIds }) => {
  const plants = plantIds.map(id => MOCK_PLANTS[id]).filter(Boolean);

  if (plants.length === 0) return null;

  const getCategoryColor = (cat: PlantCategory) => {
    switch (cat) {
      case PlantCategory.HARMFUL: return 'text-red-700 bg-red-100 border-red-200';
      case PlantCategory.MEDICINAL: return 'text-blue-700 bg-blue-100 border-blue-200';
      case PlantCategory.EDIBLE: return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  const getCategoryIcon = (cat: PlantCategory) => {
    switch (cat) {
      case PlantCategory.HARMFUL: return <AlertTriangle className="w-3.5 h-3.5" />;
      case PlantCategory.MEDICINAL: return <Heart className="w-3.5 h-3.5" />;
      case PlantCategory.EDIBLE: return <Leaf className="w-3.5 h-3.5" />;
      case PlantCategory.SAFE: return <CheckCircle className="w-3.5 h-3.5" />;
      default: return <Info className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Leaf className="w-5 h-5 text-fort-600" />
        Flora & Botanical Safety
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plants.map(plant => (
          <div key={plant.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="h-40 bg-slate-100 relative overflow-hidden">
               <img src={plant.imageUrl} alt={plant.localName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <span className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-sm ${getCategoryColor(plant.category)}`}>
                 {getCategoryIcon(plant.category)}
                 {plant.category}
               </span>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-lg text-slate-800">{plant.localName}</h4>
              <p className="text-xs text-slate-500 italic mb-2">{plant.scientificName}</p>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{plant.description}</p>
              
              {plant.firstAid && (
                <div className="bg-orange-50 p-2.5 rounded-md text-xs text-orange-800 border border-orange-100 flex gap-2 items-start">
                  <div className="mt-0.5"><Info className="w-3 h-3 text-orange-600" /></div>
                  <div>
                    <span className="font-bold">First Aid:</span> {plant.firstAid}
                  </div>
                </div>
              )}
              
              <div className="mt-3">
                <p className="text-xs font-semibold text-slate-500 mb-1">ID Tips:</p>
                <div className="flex flex-wrap gap-1">
                  {plant.identificationTips.map((tip, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600 border border-slate-200">
                      {tip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloraSection;