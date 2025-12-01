import React from 'react';
import { Book, ShieldAlert, Backpack, ChevronDown } from 'lucide-react';
import { GLOSSARY_TERMS } from '../constants';

const Resources: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Trekker's Resources</h1>
          <p className="text-stone-600">Essential guides, terminology, and safety checklists for your Sahyadri adventures.</p>
        </div>

        {/* Dictionary Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-100 bg-stone-50/50 flex items-center gap-3">
            <div className="bg-fort-100 p-2 rounded-lg">
              <Book className="w-5 h-5 text-fort-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-800">Fort Dictionary</h2>
              <p className="text-sm text-stone-500">Common Marathi architectural terms</p>
            </div>
          </div>
          <div className="divide-y divide-stone-100">
            {GLOSSARY_TERMS.map((item, idx) => (
              <div key={idx} className="p-5 hover:bg-stone-50 transition-colors">
                <h3 className="font-bold text-stone-800 mb-1">{item.term}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Safety Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-100 p-2 rounded-lg">
                  <ShieldAlert className="w-5 h-5 text-red-700" />
                </div>
                <h2 className="text-xl font-bold text-stone-800">Safety Guidelines</h2>
             </div>
             <ul className="space-y-4 text-sm text-stone-700">
               <li className="flex gap-3">
                 <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0" />
                 <span>Avoid trekking alone in remote forts; always inform someone about your plan.</span>
               </li>
               <li className="flex gap-3">
                 <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0" />
                 <span>Carry at least 2-3 liters of water. Dehydration is the #1 risk.</span>
               </li>
               <li className="flex gap-3">
                 <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0" />
                 <span>Wear good grip shoes. Monsoon trails are extremely slippery.</span>
               </li>
               <li className="flex gap-3">
                 <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0" />
                 <span>Do not disturb honeycombs; bee attacks are common on cliffs.</span>
               </li>
             </ul>
          </section>

          {/* Packing Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Backpack className="w-5 h-5 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold text-stone-800">Packing Checklist</h2>
             </div>
             <div className="space-y-3">
               {['Water (3L)', 'Good Trekking Shoes', 'Sun Cap & Sunglasses', 'Raincoat / Windcheater', 'Basic First Aid Kit', 'Torch / Headlamp', 'Dry Snacks / Energy Bars', 'Power Bank'].map((item, i) => (
                 <div key={i} className="flex items-center gap-3">
                   <input type="checkbox" className="rounded border-stone-300 text-fort-600 focus:ring-fort-500" />
                   <span className="text-sm text-stone-700">{item}</span>
                 </div>
               ))}
             </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Resources;