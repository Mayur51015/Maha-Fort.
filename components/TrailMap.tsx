import React, { useEffect, useRef, memo, useState } from 'react';
import L from 'leaflet';
import { Sun, Moon } from 'lucide-react';
import { Coordinates } from '../types';

interface TrailMapProps {
  coordinates: Coordinates;
  trailGeoJSON: any;
  fortName: string;
}

const TrailMap: React.FC<TrailMapProps> = memo(({ coordinates, trailGeoJSON, fortName }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const trailLayerRef = useRef<L.Layer | null>(null);
  const tileLayersRef = useRef<{ light: L.TileLayer; dark: L.TileLayer } | null>(null);
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize Map (Run once)
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Define Base Layers
    const voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
      crossOrigin: true
    });

    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      crossOrigin: true
    });
    
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      crossOrigin: true
    });

    const darkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
      crossOrigin: true
    });

    // Store references for the toggle
    tileLayersRef.current = {
      light: voyager,
      dark: darkMatter
    };

    // Initialize Map with Performance Optimizations
    const map = L.map(mapContainerRef.current, {
      center: [coordinates.lat, coordinates.lng],
      zoom: 14,
      layers: [voyager], // Default layer
      zoomControl: false, // Disable default to add manually
      preferCanvas: true, // PERFORMANCE: Use Canvas renderer for Vector Layers (GeoJSON)
      fadeAnimation: true,
      markerZoomAnimation: true
    });

    // Add Zoom Control (Standard Leaflet buttons)
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    // Add Layer Control
    const baseMaps = {
      "Clean Map": voyager,
      "Satellite": satellite,
      "Open Street Map": osm,
      "Dark Theme": darkMatter
    };
    
    L.control.layers(baseMaps, undefined, { position: 'topright' }).addTo(map);

    mapInstanceRef.current = map;

    // Cleanup on unmount
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle Updates (Coordinates, GeoJSON, FortName)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Cleanup previous layers safely
    if (markerRef.current) {
      map.removeLayer(markerRef.current);
      markerRef.current = null;
    }
    if (trailLayerRef.current) {
      map.removeLayer(trailLayerRef.current);
      trailLayerRef.current = null;
    }

    // Defer heavy rendering to next animation frame to prevent blocking UI
    requestAnimationFrame(() => {
      // Add Summit Marker
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: #3e866d; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      const marker = L.marker([coordinates.lat, coordinates.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<b>${fortName}</b><br>Summit: ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`);
      
      markerRef.current = marker;

      // Add GeoJSON Trail
      if (trailGeoJSON) {
        const trailLayer = L.geoJSON(trailGeoJSON, {
          style: {
            color: '#ef4444', 
            weight: 4,
            opacity: 0.8,
            dashArray: '5, 10'
          },
          onEachFeature: (feature, layer) => {
            if (feature.properties && feature.properties.name) {
              layer.bindPopup(feature.properties.name);
            }
          }
        }).addTo(map);
        
        trailLayerRef.current = trailLayer;

        // Fit bounds to show both marker and trail
        try {
          const group = new L.FeatureGroup([marker, trailLayer]);
          map.fitBounds(group.getBounds(), { padding: [50, 50], animate: true });
        } catch (e) {
          // Fallback if bounds calculation fails
          map.setView([coordinates.lat, coordinates.lng], 14, { animate: true });
        }
      } else {
          // Just center on marker if no trail
          map.setView([coordinates.lat, coordinates.lng], 14, { animate: true });
          marker.openPopup();
      }
    });

  }, [coordinates, trailGeoJSON, fortName]); // Run when these props change

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent map click
    const map = mapInstanceRef.current;
    const layers = tileLayersRef.current;
    
    if (map && layers) {
      if (isDarkMode) {
        // Switch to Light
        if (map.hasLayer(layers.dark)) map.removeLayer(layers.dark);
        if (!map.hasLayer(layers.light)) map.addLayer(layers.light);
        setIsDarkMode(false);
      } else {
        // Switch to Dark
        if (map.hasLayer(layers.light)) map.removeLayer(layers.light);
        if (!map.hasLayer(layers.dark)) map.addLayer(layers.dark);
        setIsDarkMode(true);
      }
    }
  };

  return (
    <div className="relative w-full h-full z-0 rounded-xl overflow-hidden group">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* Custom Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-md p-2.5 rounded-lg shadow-md border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-white transition-all active:scale-95 group-hover:opacity-100 transition-opacity"
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  );
});

export default TrailMap;