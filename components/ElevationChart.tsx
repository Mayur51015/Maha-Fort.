import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrailPoint } from '../types';

interface ElevationChartProps {
  data: TrailPoint[];
}

const ElevationChart: React.FC<ElevationChartProps> = ({ data }) => {
  return (
    <div className="h-64 w-full bg-white rounded-xl p-4 border border-stone-100 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="distance" 
            label={{ value: 'Distance (km)', position: 'insideBottomRight', offset: -5, fontSize: 10, fill: '#94a3b8' }} 
            tick={{fontSize: 10, fill: '#64748b'}}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
             label={{ value: 'Elevation (m)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#94a3b8' }} 
             tick={{fontSize: 10, fill: '#64748b'}}
             tickLine={false}
             axisLine={false}
             domain={['dataMin - 50', 'dataMax + 50']}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
            cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
          />
          <Area 
            type="monotone" 
            dataKey="elevation" 
            stroke="#3e866d" 
            fill="url(#colorElev)" 
            fillOpacity={1} 
            strokeWidth={2}
          />
          <defs>
            <linearGradient id="colorElev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3e866d" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#3e866d" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ElevationChart;