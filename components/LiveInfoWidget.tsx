import React, { useEffect, useState } from 'react';
import { Newspaper, MapPin, ExternalLink, Loader, Utensils } from 'lucide-react';
import { getLiveFortUpdates, getNearbyAmenities } from '../services/geminiService';
import { GroundingChunk } from '../types';

interface LiveInfoWidgetProps {
  fortName: string;
  lat: number;
  lng: number;
}

const LiveInfoWidget: React.FC<LiveInfoWidgetProps> = ({ fortName, lat, lng }) => {
  const [updates, setUpdates] = useState<{ text: string; chunks: GroundingChunk[] } | null>(null);
  const [amenities, setAmenities] = useState<{ text: string; chunks: GroundingChunk[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [updatesData, amenitiesData] = await Promise.all([
        getLiveFortUpdates(fortName),
        getNearbyAmenities(fortName, lat, lng)
      ]);
      setUpdates(updatesData);
      setAmenities(amenitiesData);
      setLoading(false);
    };

    fetchData();
  }, [fortName, lat, lng]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm animate-pulse">
        <div className="h-4 bg-stone-200 rounded w-1/3 mb-4"></div>
        <div className="h-20 bg-stone-100 rounded mb-4"></div>
        <div className="h-4 bg-stone-200 rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 print:hidden">
      {/* Live Updates */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-100">
          <Newspaper className="w-5 h-5 text-blue-600" />
          <h4 className="font-bold text-stone-800 text-sm">Live Updates & News</h4>
        </div>
        <p className="text-sm text-stone-600 leading-relaxed mb-4">{updates?.text}</p>
        {updates?.chunks && updates.chunks.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {updates.chunks.map((chunk, idx) => chunk.web ? (
              <a 
                key={idx} 
                href={chunk.web.uri} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition-colors border border-blue-100"
              >
                {chunk.web.title} <ExternalLink className="w-2 h-2" />
              </a>
            ) : null)}
          </div>
        )}
      </div>

      {/* Nearby Amenities */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-100">
          <Utensils className="w-5 h-5 text-orange-600" />
          <h4 className="font-bold text-stone-800 text-sm">Nearby Amenities</h4>
        </div>
        <p className="text-sm text-stone-600 leading-relaxed mb-4">{amenities?.text}</p>
        {amenities?.chunks && amenities.chunks.length > 0 && (
          <div className="space-y-2">
            {amenities.chunks.map((chunk, idx) => chunk.maps ? (
              <a 
                key={idx} 
                href={chunk.maps.uri} 
                target="_blank" 
                rel="noreferrer"
                className="block bg-orange-50 hover:bg-orange-100 p-2 rounded-lg transition-colors border border-orange-100"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-orange-800 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {chunk.maps.title}
                  </span>
                  <ExternalLink className="w-3 h-3 text-orange-400" />
                </div>
                {chunk.maps.placeAnswerSources?.[0]?.reviewSnippets?.[0] && (
                   <p className="text-[10px] text-stone-500 mt-1 italic line-clamp-1">
                     "{chunk.maps.placeAnswerSources[0].reviewSnippets[0].content}"
                   </p>
                )}
              </a>
            ) : null)}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveInfoWidget;