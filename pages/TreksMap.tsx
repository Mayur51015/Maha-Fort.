import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MOCK_FORTS } from '../constants';
import { useNavigate } from 'react-router-dom';

const TreksMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [18.5204, 73.8567], // Pune center
      zoom: 8,
      zoomControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 20
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Add Markers
    const markers = L.featureGroup();

    MOCK_FORTS.forEach(fort => {
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="background-color: #3e866d; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      const marker = L.marker([fort.coordinates.lat, fort.coordinates.lng], { icon: customIcon })
        .bindTooltip(fort.name, { direction: 'top', offset: [0, -10] })
        .on('click', () => {
          navigate(`/fort/${fort.id}`);
        });
      
      marker.addTo(markers);
    });

    markers.addTo(map);

    // Fit bounds if forts exist
    if (MOCK_FORTS.length > 0) {
      map.fitBounds(markers.getBounds(), { padding: [50, 50] });
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [navigate]);

  return (
    <div className="h-[calc(100vh-64px)] w-full relative">
       <div ref={mapContainerRef} className="h-full w-full z-0" />
       
       <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-stone-200 max-w-xs">
         <h2 className="font-serif font-bold text-stone-800 text-lg mb-1">Explore Map</h2>
         <p className="text-xs text-stone-500">Click on any marker to view details about the fort.</p>
       </div>
    </div>
  );
};

export default TreksMap;