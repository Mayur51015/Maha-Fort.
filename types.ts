export enum Difficulty {
  EASY = 'Easy',
  MODERATE = 'Moderate',
  HARD = 'Hard',
  EXTREME = 'Extreme'
}

export enum PlantCategory {
  SAFE = 'Safe',
  MEDICINAL = 'Medicinal',
  HARMFUL = 'Harmful',
  EDIBLE = 'Edible'
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface TrailPoint {
  distance: number; // km from start
  elevation: number; // meters
}

export interface Plant {
  id: string;
  scientificName: string;
  localName: string;
  category: PlantCategory;
  description: string;
  identificationTips: string[];
  firstAid?: string;
  imageUrl: string;
}

export interface Reference {
  type: 'Book' | 'Web' | 'Paper';
  title: string;
  author?: string;
  url?: string;
}

export interface Fort {
  id: string;
  name: string;
  region: string;
  coordinates: Coordinates;
  elevation: number;
  difficulty: Difficulty;
  era: string;
  description: string;
  history: string;
  bestMonth: string;
  distanceFromPune: number; // km
  images: string[];
  references: Reference[];
  plants: string[]; // IDs of plants found here
  trailProfile: TrailPoint[]; // For elevation chart
  trailGeoJSON: any; // GeoJSON FeatureCollection
}

export interface TripPlan {
  transportCost: number;
  foodCost: number;
  stayCost: number;
  guideCost: number;
  totalCost: number;
  participants: number;
}

// Grounding Types
export type GroundingChunk = any;

// Window interface for AI Studio
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}