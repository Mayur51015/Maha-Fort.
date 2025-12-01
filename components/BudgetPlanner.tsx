import React, { useState, useEffect } from 'react';
import { Calculator, Printer, Wallet } from 'lucide-react';
import { TripPlan } from '../types';

const BudgetPlanner: React.FC = () => {
  const [participants, setParticipants] = useState(1);
  const [distance, setDistance] = useState(50);
  const [transportMode, setTransportMode] = useState<'car' | 'bike' | 'bus'>('car');
  const [stayDays, setStayDays] = useState(0);
  const [foodPerPerson, setFoodPerPerson] = useState(300);
  
  const [plan, setPlan] = useState<TripPlan>({
    transportCost: 0,
    foodCost: 0,
    stayCost: 0,
    guideCost: 0,
    totalCost: 0,
    participants: 1
  });

  useEffect(() => {
    // Simple mock calculation logic
    let transportRate = 0;
    if (transportMode === 'car') transportRate = 12; // per km
    if (transportMode === 'bike') transportRate = 5;
    if (transportMode === 'bus') transportRate = 2; // per km per person

    let transportCost = 0;
    if (transportMode === 'bus') {
      transportCost = distance * 2 * transportRate * participants; // Round trip
    } else {
      transportCost = distance * 2 * transportRate; // Vehicle cost usually shared, but simplfied here
    }

    const foodCost = foodPerPerson * participants * (stayDays + 1);
    const stayCost = stayDays * 800 * participants; // Avg stay cost
    const guideCost = 500; // Flat fee estimate

    const total = transportCost + foodCost + stayCost + guideCost;

    setPlan({
      transportCost,
      foodCost,
      stayCost,
      guideCost,
      totalCost: total,
      participants
    });
  }, [participants, distance, transportMode, stayDays, foodPerPerson]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden print:shadow-none print:border-none">
      <div className="border-b border-stone-100 bg-stone-50/50 p-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-serif font-bold text-stone-800 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-fort-600" />
            Budget Planner
          </h3>
          <p className="text-stone-500 text-sm mt-1">Estimate your expenses based on current rates.</p>
        </div>
        <button 
          onClick={handlePrint}
          className="text-stone-400 hover:text-stone-700 hover:bg-stone-100 p-2 rounded-lg print:hidden transition-all"
          title="Print Trip Plan"
        >
          <Printer className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10 print:grid-cols-2">
        <div className="space-y-6 print:hidden">
          <div className="grid grid-cols-2 gap-5">
             <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Participants</label>
              <input 
                type="number" 
                min="1" 
                value={participants} 
                onChange={e => setParticipants(parseInt(e.target.value) || 1)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-fort-500/20 focus:border-fort-500 outline-none transition-all font-medium text-stone-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Distance (km)</label>
              <input 
                type="number" 
                value={distance} 
                onChange={e => setDistance(parseInt(e.target.value) || 0)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-fort-500/20 focus:border-fort-500 outline-none transition-all font-medium text-stone-800"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Transport Mode</label>
            <div className="grid grid-cols-3 gap-3">
              {['car', 'bike', 'bus'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTransportMode(mode as any)}
                  className={`py-3 rounded-xl text-sm font-medium capitalize border transition-all ${transportMode === mode ? 'bg-fort-50 border-fort-500 text-fort-700 shadow-sm' : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
             <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Stay (Nights)</label>
              <input 
                type="number" 
                min="0"
                value={stayDays} 
                onChange={e => setStayDays(parseInt(e.target.value) || 0)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-fort-500/20 focus:border-fort-500 outline-none transition-all font-medium text-stone-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Food/Person (₹)</label>
              <input 
                type="number" 
                value={foodPerPerson} 
                onChange={e => setFoodPerPerson(parseInt(e.target.value) || 0)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-fort-500/20 focus:border-fort-500 outline-none transition-all font-medium text-stone-800"
              />
            </div>
          </div>
        </div>

        <div className="bg-stone-900 text-white p-8 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          
          <div>
             <h4 className="text-lg font-serif font-bold text-white mb-6 flex items-center gap-2">
               <Wallet className="w-5 h-5 text-fort-300" /> Estimated Breakdown
             </h4>
             <div className="space-y-4 text-sm relative z-10">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-stone-400">Transport</span>
                <span className="font-medium">₹{plan.transportCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-stone-400">Food & Water</span>
                <span className="font-medium">₹{plan.foodCost.toLocaleString()}</span>
              </div>
               <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-stone-400">Accommodation</span>
                <span className="font-medium">₹{plan.stayCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-stone-400">Local Guide</span>
                <span className="font-medium">₹{plan.guideCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 relative z-10">
            <div className="flex justify-between items-end">
              <span className="text-stone-400 font-medium text-sm">Total Estimate</span>
              <span className="text-3xl font-bold text-fort-300">₹{plan.totalCost.toLocaleString()}</span>
            </div>
            <p className="text-xs text-stone-500 mt-2 text-right">
              ~ ₹{(plan.totalCost / participants).toFixed(0)} per person
            </p>
          </div>
        </div>
      </div>
      <div className="hidden print:block p-8 border-t border-stone-100">
        <p className="text-sm text-stone-500">Generated by Sahyadri Forts Explorer. Please carry cash as digital payments may not work in remote areas.</p>
        <div className="mt-4 border-t pt-4">
            <h5 className="font-bold">Emergency Contacts:</h5>
            <p>Police: 100 | Ambulance: 108 | Mountain Rescue: +91-9876543210</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;