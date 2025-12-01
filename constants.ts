import { Fort, Difficulty, Plant, PlantCategory, TripPlan } from './types';

// Helper to generate a mock trail for forts without specific GeoJSON data
// This ensures the map component works for all 60+ forts
const createTrail = (lat: number, lng: number, name: string = "Standard Route") => ({
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name },
      geometry: {
        type: "LineString",
        coordinates: [
          [lng - 0.008, lat - 0.008],
          [lng - 0.004, lat - 0.005],
          [lng - 0.002, lat - 0.003],
          [lng, lat]
        ]
      }
    }
  ]
});

// Helper for generic elevation profile
const genericProfile = (maxElev: number) => [
  { distance: 0, elevation: Math.max(0, maxElev - 400) },
  { distance: 1.0, elevation: Math.max(0, maxElev - 300) },
  { distance: 2.0, elevation: Math.max(0, maxElev - 150) },
  { distance: 3.5, elevation: maxElev }
];

export const GLOSSARY_TERMS = [
  { term: 'Machi (माची)', definition: 'A plateau or terrace on a fort, usually fortified. (e.g., Padmavati Machi on Rajgad).' },
  { term: 'Balekilla (बालेकिल्ला)', definition: 'The highest and most fortified part of the fort, housing the main administrative buildings.' },
  { term: 'Buruj (बुरुज)', definition: 'A bastion or tower projecting from the fort wall, used for surveillance and cannons.' },
  { term: 'Nedhe (नेढे)', definition: 'A natural hole or needle-hole created in the rock face by wind erosion (e.g., at Ratangad).' },
  { term: 'Chor Darwaza (चोर दरवाजा)', definition: 'A secret back door or escape route used during emergencies.' },
  { term: 'Taka (टाकं)', definition: 'Rock-cut water cisterns used to store rainwater, a crucial feature of Sahyadri forts.' },
  { term: 'Gomukhi (गोमुखी)', definition: 'A gate design resembling a cow\'s mouth, where the entrance is hidden between two curved bastions to prevent direct attacks.' },
  { term: 'Sadar (सदर)', definition: 'The main court or administrative office on the fort.' }
];

export const MOCK_PLANTS: Record<string, Plant> = {
  'p1': {
    id: 'p1',
    scientificName: 'Carissa carandas',
    localName: 'Karvand (करवंद)',
    category: PlantCategory.EDIBLE,
    description: 'A hardy, spiny shrub producing berry-sized fruits that are tart when unripe and sweet when dark purple.',
    identificationTips: ['White star-shaped flowers', 'Long sharp thorns', 'Dark purple berries'],
    imageUrl: 'https://picsum.photos/id/108/200/200'
  },
  'p2': {
    id: 'p2',
    scientificName: 'Strobilanthes callosa',
    localName: 'Karvi (कारवी)',
    category: PlantCategory.MEDICINAL,
    description: 'A shrub found in the Western Ghats that blooms once every seven years.',
    identificationTips: ['Large green leaves', 'Rough texture', 'Purple flowers during bloom'],
    firstAid: 'Generally safe, but dried stems are used for hut walls.',
    imageUrl: 'https://picsum.photos/id/112/200/200'
  },
  'p3': {
    id: 'p3',
    scientificName: 'Gnidia glauca',
    localName: 'Datpadi (दटपदी)',
    category: PlantCategory.HARMFUL,
    description: 'A fish poison plant. Crushed leaves are toxic to aquatic life and can irritate human skin.',
    identificationTips: ['Yellow flower heads', 'Lance-shaped leaves', 'Smooth bark'],
    firstAid: 'Wash affected area immediately with water. Do not ingest.',
    imageUrl: 'https://picsum.photos/id/292/200/200'
  }
};

export const INITIAL_TRIP_PLAN: TripPlan = {
  transportCost: 0,
  foodCost: 0,
  stayCost: 0,
  guideCost: 0,
  totalCost: 0,
  participants: 1
};

export const MOCK_FORTS: Fort[] = [
  // --- PUNE REGION ---
  {
    id: 'sinhagad',
    name: 'Sinhagad (सिंहगड)',
    region: 'Pune',
    coordinates: { lat: 18.366, lng: 73.755 },
    elevation: 1312,
    difficulty: Difficulty.MODERATE,
    era: 'Maratha Empire',
    description: 'Previously known as Kondhana, famous for the battle where Tanaji Malusare sacrificed his life.',
    history: 'The fort was strategically important due to its steep slopes. Renamed Sinhagad (Lion\'s Fort) by Shivaji Maharaj. Key features include Kanyagad, Kalyan Darwaza, and Pune Darwaza.',
    bestMonth: 'June - February',
    distanceFromPune: 35,
    images: ['https://picsum.photos/seed/sinhagad/800/400', 'https://picsum.photos/seed/sinhagad_2/800/400'],
    plants: ['p1', 'p2'],
    references: [
      { type: 'Web', title: 'Wikipedia: Sinhagad', url: 'https://en.wikipedia.org/wiki/Sinhagad' },
      { type: 'Book', title: 'Raja Shivchatrapati', author: 'Babasaheb Purandare' },
      { type: 'Book', title: 'Gadkot', author: 'P.K. Ghanekar' }
    ],
    trailProfile: [
      { distance: 0, elevation: 700 }, { distance: 1.5, elevation: 1100 }, { distance: 2.7, elevation: 1312 }
    ],
    trailGeoJSON: {
      type: "FeatureCollection",
      features: [{
        type: "Feature", properties: { name: "Main Trekking Route" },
        geometry: { type: "LineString", coordinates: [[73.761, 18.350], [73.758, 18.355], [73.755, 18.366]] }
      }]
    }
  },
  {
    id: 'torna',
    name: 'Torna (तोरणा)',
    region: 'Pune',
    coordinates: { lat: 18.277, lng: 73.619 },
    elevation: 1405,
    difficulty: Difficulty.HARD,
    era: 'Maratha (1646 Capture)',
    description: 'Also known as Prachandagad, the first fort captured by Shivaji Maharaj at age 16.',
    history: 'Torna is the highest hill-fort in Pune district. Features include Zunjar Machi and Budhla Machi.',
    bestMonth: 'September - January',
    distanceFromPune: 60,
    images: ['https://picsum.photos/seed/torna/800/400'],
    plants: ['p1', 'p3'],
    references: [
      { type: 'Web', title: 'Wikipedia: Torna Fort', url: 'https://en.wikipedia.org/wiki/Torna_Fort' },
      { type: 'Book', title: 'Forts of Maharashtra', author: 'P.K. Ghanekar' }
    ],
    trailProfile: genericProfile(1405),
    trailGeoJSON: createTrail(18.277, 73.619)
  },
  {
    id: 'rajgad',
    name: 'Rajgad (राजगड)',
    region: 'Pune',
    coordinates: { lat: 18.251, lng: 73.689 },
    elevation: 1376,
    difficulty: Difficulty.HARD,
    era: 'Maratha Capital (1648-1671)',
    description: 'The first capital of the Maratha Empire, known for its specific construction and Balekilla.',
    history: 'Rajgad has three machis: Padmavati, Suvela, and Sanjeevani. It was the capital for 26 years.',
    bestMonth: 'August - February',
    distanceFromPune: 55,
    images: ['https://picsum.photos/seed/rajgad/800/400'],
    plants: ['p2', 'p3'],
    references: [
      { type: 'Web', title: 'Wikipedia: Rajgad Fort', url: 'https://en.wikipedia.org/wiki/Rajgad_Fort' },
      { type: 'Book', title: 'Sadhyadrichi Bhramanti', author: 'P.K. Ghanekar' }
    ],
    trailProfile: genericProfile(1376),
    trailGeoJSON: createTrail(18.251, 73.689)
  },
  {
    id: 'lohagad',
    name: 'Lohagad (लोहगड)',
    region: 'Pune',
    coordinates: { lat: 18.723, lng: 73.479 },
    elevation: 1033,
    difficulty: Difficulty.EASY,
    era: 'Satavahana / Maratha',
    description: 'One of the most robust forts, famously known for the Vinchu Kata (Scorpion\'s tail) machi.',
    history: 'Used by many dynasties including Satavahanas, Chalukyas, Rashtrakutas, and Marathas. It was a treasury for Shivaji Maharaj.',
    bestMonth: 'June - February',
    distanceFromPune: 65,
    images: ['https://picsum.photos/seed/lohagad/800/400'],
    plants: ['p1'],
    references: [
      { type: 'Web', title: 'Wikipedia: Lohagad', url: 'https://en.wikipedia.org/wiki/Lohagad' }
    ],
    trailProfile: genericProfile(1033),
    trailGeoJSON: createTrail(18.723, 73.479)
  },
  {
    id: 'visapur',
    name: 'Visapur (विसापूर)',
    region: 'Pune',
    coordinates: { lat: 18.721, lng: 73.489 },
    elevation: 1084,
    difficulty: Difficulty.MODERATE,
    era: 'Maratha (18th Century)',
    description: 'Located adjacent to Lohagad, famous for its massive waterfall stairs during monsoon.',
    history: 'Built by Balaji Vishwanath, the first Peshwa. It is larger and higher than Lohagad.',
    bestMonth: 'June - September',
    distanceFromPune: 65,
    images: ['https://picsum.photos/seed/visapur/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Visapur Fort', url: 'https://en.wikipedia.org/wiki/Visapur_Fort' }
    ],
    trailProfile: genericProfile(1084),
    trailGeoJSON: createTrail(18.721, 73.489)
  },
  {
    id: 'shivneri',
    name: 'Shivneri (शिवनेरी)',
    region: 'Pune',
    coordinates: { lat: 19.203, lng: 73.861 },
    elevation: 1067,
    difficulty: Difficulty.EASY,
    era: 'Yadava / Maratha',
    description: 'The birthplace of Chhatrapati Shivaji Maharaj.',
    history: 'A formidable fort with seven gates. It houses the building where Shivaji Maharaj was born and a temple of Goddess Shivai.',
    bestMonth: 'All Year',
    distanceFromPune: 95,
    images: ['https://picsum.photos/seed/shivneri/800/400'],
    plants: ['p2'],
    references: [
      { type: 'Web', title: 'Wikipedia: Shivneri', url: 'https://en.wikipedia.org/wiki/Shivneri' },
      { type: 'Book', title: 'Shivneri Gatha', author: 'Local Historians' }
    ],
    trailProfile: genericProfile(1067),
    trailGeoJSON: createTrail(19.203, 73.861)
  },
  {
    id: 'purandar',
    name: 'Purandar (पुरंदर)',
    region: 'Pune',
    coordinates: { lat: 18.283, lng: 73.983 },
    elevation: 1387,
    difficulty: Difficulty.MODERATE,
    era: 'Yadava / Maratha',
    description: 'Famous for the Treaty of Purandar signed between Shivaji Maharaj and Jai Singh I.',
    history: 'It is actually a twin fort system (Purandar and Vajragad). Murarbaji Deshpande died here defending the fort.',
    bestMonth: 'August - February',
    distanceFromPune: 40,
    images: ['https://picsum.photos/seed/purandar/800/400'],
    plants: [],
    references: [
       { type: 'Web', title: 'Wikipedia: Purandar Fort', url: 'https://en.wikipedia.org/wiki/Purandar_fort' }
    ],
    trailProfile: genericProfile(1387),
    trailGeoJSON: createTrail(18.283, 73.983)
  },
  {
    id: 'tikona',
    name: 'Tikona (तिकोना)',
    region: 'Pune',
    coordinates: { lat: 18.631, lng: 73.507 },
    elevation: 1066,
    difficulty: Difficulty.EASY,
    era: 'Maratha',
    description: 'Also known as Vitandgad, a triangular fort offering views of Pawna Dam.',
    history: 'A small but strategic fort overlooking the Pawna Maval region.',
    bestMonth: 'June - March',
    distanceFromPune: 50,
    images: ['https://picsum.photos/seed/tikona/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Tikona', url: 'https://en.wikipedia.org/wiki/Tikona' }
    ],
    trailProfile: genericProfile(1066),
    trailGeoJSON: createTrail(18.631, 73.507)
  },
  {
    id: 'tung',
    name: 'Tung (तुंग)',
    region: 'Pune',
    coordinates: { lat: 18.660, lng: 73.460 },
    elevation: 1075,
    difficulty: Difficulty.MODERATE,
    era: 'Adil Shahi',
    description: 'Kathingad, difficult to approach, surrounded by Pawna backwaters on three sides.',
    history: 'Mainly used as a watchtower. Its sharp conical shape is distinct.',
    bestMonth: 'September - February',
    distanceFromPune: 60,
    images: ['https://picsum.photos/seed/tung/800/400'],
    plants: [],
    references: [
       { type: 'Web', title: 'Wikipedia: Tung Fort', url: 'https://en.wikipedia.org/wiki/Tung_Fort' }
    ],
    trailProfile: genericProfile(1075),
    trailGeoJSON: createTrail(18.660, 73.460)
  },
  {
    id: 'korigad',
    name: 'Korigad (कोरीगड)',
    region: 'Pune',
    coordinates: { lat: 18.625, lng: 73.385 },
    elevation: 923,
    difficulty: Difficulty.EASY,
    era: 'Maratha',
    description: 'Located near Aamby Valley, known for its intact fortification wall.',
    history: 'Captured by Shivaji Maharaj in 1657. It has two large lakes on the top.',
    bestMonth: 'June - September',
    distanceFromPune: 90,
    images: ['https://picsum.photos/seed/korigad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Korigad', url: 'https://en.wikipedia.org/wiki/Korigad' }
    ],
    trailProfile: genericProfile(923),
    trailGeoJSON: createTrail(18.625, 73.385)
  },
  {
    id: 'rohida',
    name: 'Rohida (रोहिडा)',
    region: 'Pune',
    coordinates: { lat: 18.106, lng: 73.824 },
    elevation: 1116,
    difficulty: Difficulty.MODERATE,
    era: 'Yadava',
    description: 'Also known as Vichitragad, located near Bhor.',
    history: 'Famous for the wind speeds and the Rohideshwar temple.',
    bestMonth: 'July - February',
    distanceFromPune: 60,
    images: ['https://picsum.photos/seed/rohida/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Rohida Fort', url: 'https://en.wikipedia.org/wiki/Rohida_fort' }
    ],
    trailProfile: genericProfile(1116),
    trailGeoJSON: createTrail(18.106, 73.824)
  },
  {
    id: 'hadsar',
    name: 'Hadsar (हडसर)',
    region: 'Pune',
    coordinates: { lat: 19.183, lng: 73.817 },
    elevation: 1100,
    difficulty: Difficulty.MODERATE,
    era: 'Satavahana',
    description: 'Known for its unique entrance gate carved out of a single rock.',
    history: 'Located in the Junnar region, guarding the trade route.',
    bestMonth: 'June - February',
    distanceFromPune: 100,
    images: ['https://picsum.photos/seed/hadsar/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Hadsar', url: 'https://en.wikipedia.org/wiki/Hadsar' }
    ],
    trailProfile: genericProfile(1100),
    trailGeoJSON: createTrail(19.183, 73.817)
  },
  {
    id: 'jivdhan',
    name: 'Jivdhan (जीवधन)',
    region: 'Pune',
    coordinates: { lat: 19.283, lng: 73.700 },
    elevation: 1145,
    difficulty: Difficulty.HARD,
    era: 'Satavahana',
    description: 'Guards the Naneghat pass, an ancient trade route.',
    history: 'Requires climbing gear for the final pinnacle in some routes.',
    bestMonth: 'November - February',
    distanceFromPune: 110,
    images: ['https://picsum.photos/seed/jivdhan/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Jivdhan', url: 'https://en.wikipedia.org/wiki/Jivdhan' }
    ],
    trailProfile: genericProfile(1145),
    trailGeoJSON: createTrail(19.283, 73.700)
  },
  {
    id: 'chavand',
    name: 'Chavand (चावंड)',
    region: 'Pune',
    coordinates: { lat: 19.25, lng: 73.75 },
    elevation: 1036,
    difficulty: Difficulty.MODERATE,
    era: 'Nizam Shahi',
    description: 'Part of the famous 5 forts trek in Junnar region.',
    history: 'Named Prasannagad by Shivaji Maharaj.',
    bestMonth: 'All Year',
    distanceFromPune: 100,
    images: ['https://picsum.photos/seed/chavand/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Chavand Fort', url: 'https://en.wikipedia.org/wiki/Chavand_Fort' }
    ],
    trailProfile: genericProfile(1036),
    trailGeoJSON: createTrail(19.25, 73.75)
  },

  // --- RAIGAD REGION ---
  {
    id: 'raigad',
    name: 'Raigad (रायगड)',
    region: 'Raigad',
    coordinates: { lat: 18.234, lng: 73.446 },
    elevation: 820,
    difficulty: Difficulty.MODERATE,
    era: 'Maratha Capital (1674)',
    description: 'The Gibraltar of the East, the capital of the Maratha Empire where Shivaji Maharaj was crowned.',
    history: 'Selected as the capital for its impregnable nature. Features the Maha Darwaza, Takmak Tok, Hirkani Buruj, and the Samadhi of Shivaji Maharaj.',
    bestMonth: 'June - March',
    distanceFromPune: 130,
    images: ['https://picsum.photos/seed/raigad/800/400', 'https://picsum.photos/seed/raigad_2/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Raigad Fort', url: 'https://en.wikipedia.org/wiki/Raigad_Fort' },
      { type: 'Book', title: 'Raigad - The Capital of Maratha Empire', author: 'Historical Archives' }
    ],
    trailProfile: genericProfile(820),
    trailGeoJSON: createTrail(18.234, 73.446, "Rajmarg")
  },
  {
    id: 'sudhagad',
    name: 'Sudhagad (सुधागड)',
    region: 'Raigad',
    coordinates: { lat: 18.558, lng: 73.319 },
    elevation: 620,
    difficulty: Difficulty.EASY,
    era: 'Bahmani',
    description: 'Bhorapgad, a popular camping destination with a massive plateau.',
    history: 'Almost selected as the capital before Raigad.',
    bestMonth: 'June - February',
    distanceFromPune: 100,
    images: ['https://picsum.photos/seed/sudhagad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Sudhagad', url: 'https://en.wikipedia.org/wiki/Sudhagad' }
    ],
    trailProfile: genericProfile(620),
    trailGeoJSON: createTrail(18.558, 73.319)
  },
  {
    id: 'sarasgad',
    name: 'Sarasgad (सरसगड)',
    region: 'Raigad',
    coordinates: { lat: 18.535, lng: 73.220 },
    elevation: 490,
    difficulty: Difficulty.MODERATE,
    era: 'Maratha',
    description: 'Twin of Sudhagad, located near Pali Ganpati.',
    history: 'Used for surveillance over the region.',
    bestMonth: 'November - February',
    distanceFromPune: 110,
    images: ['https://picsum.photos/seed/sarasgad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Sarasgad', url: 'https://en.wikipedia.org/wiki/Sarasgad' }
    ],
    trailProfile: genericProfile(490),
    trailGeoJSON: createTrail(18.535, 73.220)
  },
  {
    id: 'karnala',
    name: 'Karnala (कर्नाळा)',
    region: 'Raigad',
    coordinates: { lat: 18.891, lng: 73.111 },
    elevation: 439,
    difficulty: Difficulty.EASY,
    era: 'Yadava',
    description: 'Famous for the Karnala Bird Sanctuary and the thumb-shaped pinnacle.',
    history: 'Strategically important for trade routes passing through Panvel.',
    bestMonth: 'July - March',
    distanceFromPune: 120,
    images: ['https://picsum.photos/seed/karnala/800/400'],
    plants: ['p1'],
    references: [
      { type: 'Web', title: 'Wikipedia: Karnala Fort', url: 'https://en.wikipedia.org/wiki/Karnala_Fort' }
    ],
    trailProfile: genericProfile(439),
    trailGeoJSON: createTrail(18.891, 73.111)
  },
  {
    id: 'mangad',
    name: 'Mangad (मानगड)',
    region: 'Raigad',
    coordinates: { lat: 18.33, lng: 73.33 },
    elevation: 250,
    difficulty: Difficulty.EASY,
    era: 'Maratha',
    description: 'Located in Mangaon, known for the temple of Vinzai Devi.',
    history: 'Used to keep watch on the Tamhini Ghat trade route.',
    bestMonth: 'June - February',
    distanceFromPune: 110,
    images: ['https://picsum.photos/seed/mangad/800/400'],
    plants: [],
    references: [
       { type: 'Web', title: 'Wikipedia: Mangad', url: 'https://en.wikipedia.org/wiki/Mangad' }
    ],
    trailProfile: genericProfile(250),
    trailGeoJSON: createTrail(18.33, 73.33)
  },
  {
    id: 'avchitgad',
    name: 'Avchitgad (अवचितगड)',
    region: 'Raigad',
    coordinates: { lat: 18.45, lng: 73.11 },
    elevation: 300,
    difficulty: Difficulty.EASY,
    era: 'Shilahara',
    description: 'Located near Roha, surrounded by thick forest.',
    history: 'Built by Shilahara kings, later captured by Marathas.',
    bestMonth: 'October - February',
    distanceFromPune: 130,
    images: ['https://picsum.photos/seed/avchitgad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Avchitgad', url: 'https://en.wikipedia.org/wiki/Avchitgad' }
    ],
    trailProfile: genericProfile(300),
    trailGeoJSON: createTrail(18.45, 73.11)
  },
  {
    id: 'kolaba',
    name: 'Kolaba Fort (कुलाबा)',
    region: 'Raigad',
    coordinates: { lat: 18.636, lng: 72.866 },
    elevation: 0,
    difficulty: Difficulty.EASY,
    era: 'Maratha Navy',
    description: 'A sea fort located off the coast of Alibag.',
    history: 'A stronghold of the Maratha Navy under Kanhoji Angre.',
    bestMonth: 'November - May',
    distanceFromPune: 140,
    images: ['https://picsum.photos/seed/kolaba/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Kolaba Fort', url: 'https://en.wikipedia.org/wiki/Kolaba_Fort' }
    ],
    trailProfile: genericProfile(10),
    trailGeoJSON: createTrail(18.636, 72.866)
  },
  {
    id: 'padmadurg',
    name: 'Padmadurg (पद्मदुर्ग)',
    region: 'Raigad',
    coordinates: { lat: 18.28, lng: 72.96 },
    elevation: 0,
    difficulty: Difficulty.MODERATE,
    era: 'Maratha',
    description: 'Also known as Kasa fort, built to counter the Siddis of Janjira.',
    history: 'Built by Sambhaji Maharaj. Requires boat access.',
    bestMonth: 'November - May',
    distanceFromPune: 160,
    images: ['https://picsum.photos/seed/padmadurg/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Padmadurg', url: 'https://en.wikipedia.org/wiki/Padmadurg' }
    ],
    trailProfile: genericProfile(10),
    trailGeoJSON: createTrail(18.28, 72.96)
  },

  // --- SATARA REGION ---
  {
    id: 'pratapgad',
    name: 'Pratapgad (प्रतापगड)',
    region: 'Satara',
    coordinates: { lat: 17.930, lng: 73.585 },
    elevation: 1080,
    difficulty: Difficulty.EASY,
    era: 'Maratha (1656)',
    description: 'Famous for the encounter between Shivaji Maharaj and Afzal Khan.',
    history: 'Built by Moropant Trimbak Pingle on the orders of Shivaji Maharaj to secure the banks of Nira and Koyna rivers.',
    bestMonth: 'All Year',
    distanceFromPune: 140,
    images: ['https://picsum.photos/seed/pratapgad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Pratapgad', url: 'https://en.wikipedia.org/wiki/Pratapgad' },
      { type: 'Book', title: 'Pratapgad Charitra', author: 'Historical Texts' }
    ],
    trailProfile: genericProfile(1080),
    trailGeoJSON: createTrail(17.930, 73.585)
  },
  {
    id: 'vasota',
    name: 'Vasota (वासोटा)',
    region: 'Satara',
    coordinates: { lat: 17.65, lng: 73.68 },
    elevation: 1171,
    difficulty: Difficulty.MODERATE,
    era: 'Shilahara',
    description: 'Jungle fort located in the Koyna Wildlife Sanctuary. Known as Vyaghragad.',
    history: 'Used as a prison. Requires a boat ride and forest department permission.',
    bestMonth: 'October - March',
    distanceFromPune: 180,
    images: ['https://picsum.photos/seed/vasota/800/400'],
    plants: ['p2'],
    references: [
      { type: 'Web', title: 'Wikipedia: Vasota', url: 'https://en.wikipedia.org/wiki/Vasota_Fort' }
    ],
    trailProfile: genericProfile(1171),
    trailGeoJSON: createTrail(17.65, 73.68)
  },
  {
    id: 'ajinkyatara',
    name: 'Ajinkyatara (अजिंक्यतारा)',
    region: 'Satara',
    coordinates: { lat: 17.67, lng: 74.00 },
    elevation: 1000,
    difficulty: Difficulty.EASY,
    era: 'Shilahara',
    description: 'Located right in Satara city, providing panoramic views.',
    history: 'Served as a capital for a brief period. Controlled by Mughals, Marathas, and British.',
    bestMonth: 'All Year',
    distanceFromPune: 115,
    images: ['https://picsum.photos/seed/ajinkyatara/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Ajinkyatara', url: 'https://en.wikipedia.org/wiki/Ajinkyatara' }
    ],
    trailProfile: genericProfile(1000),
    trailGeoJSON: createTrail(17.67, 74.00)
  },
  {
    id: 'sajjangad',
    name: 'Sajjangad (सज्जनगड)',
    region: 'Satara',
    coordinates: { lat: 17.64, lng: 73.90 },
    elevation: 900,
    difficulty: Difficulty.EASY,
    era: 'Bahmani',
    description: 'Final resting place of Saint Ramdas Swami.',
    history: 'Named Asvalgad earlier. Renamed Sajjangad by Shivaji Maharaj.',
    bestMonth: 'All Year',
    distanceFromPune: 125,
    images: ['https://picsum.photos/seed/sajjangad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Sajjangad', url: 'https://en.wikipedia.org/wiki/Sajjangad' }
    ],
    trailProfile: genericProfile(900),
    trailGeoJSON: createTrail(17.64, 73.90)
  },
  {
    id: 'chandan-vandan',
    name: 'Chandan-Vandan (चंदन-वंदन)',
    region: 'Satara',
    coordinates: { lat: 17.78, lng: 74.03 },
    elevation: 1150,
    difficulty: Difficulty.MODERATE,
    era: 'Shilahara',
    description: 'Twin forts protecting the Satara region.',
    history: 'Built by King Bhoj II.',
    bestMonth: 'October - February',
    distanceFromPune: 100,
    images: ['https://picsum.photos/seed/chandan-vandan/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Chandan-Vandan', url: 'https://en.wikipedia.org/wiki/Chandan-Vandan' }
    ],
    trailProfile: genericProfile(1150),
    trailGeoJSON: createTrail(17.78, 74.03)
  },
  {
    id: 'mahimangad',
    name: 'Mahimangad (महिमानगड)',
    region: 'Satara',
    coordinates: { lat: 17.80, lng: 74.40 },
    elevation: 900,
    difficulty: Difficulty.EASY,
    era: 'Maratha',
    description: 'A small hill fort in Man taluka.',
    history: 'Less explored, offers great views of the dry plains of eastern Satara.',
    bestMonth: 'November - February',
    distanceFromPune: 130,
    images: ['https://picsum.photos/seed/mahimangad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Mahimangad', url: 'https://en.wikipedia.org/wiki/Mahimangad' }
    ],
    trailProfile: genericProfile(900),
    trailGeoJSON: createTrail(17.80, 74.40)
  },
  {
    id: 'vardhangad',
    name: 'Vardhangad (वर्धनगड)',
    region: 'Satara',
    coordinates: { lat: 17.70, lng: 74.25 },
    elevation: 1060,
    difficulty: Difficulty.MODERATE,
    era: 'Maratha',
    description: 'Located on the Satara-Pandharpur road.',
    history: 'Built to overlook the trade route.',
    bestMonth: 'October - February',
    distanceFromPune: 135,
    images: ['https://picsum.photos/seed/vardhangad/800/400'],
    plants: [],
    references: [
       { type: 'Web', title: 'Wikipedia: Vardhangad', url: 'https://en.wikipedia.org/wiki/Vardhangad' }
    ],
    trailProfile: genericProfile(1060),
    trailGeoJSON: createTrail(17.70, 74.25)
  },
  {
    id: 'vasantgad',
    name: 'Vasantgad (वसंतगड)',
    region: 'Satara',
    coordinates: { lat: 17.28, lng: 74.15 },
    elevation: 900,
    difficulty: Difficulty.MODERATE,
    era: 'Shilahara',
    description: 'Located near Karad, overlooking the Koyna river.',
    history: 'Named after King Vasant.',
    bestMonth: 'November - February',
    distanceFromPune: 160,
    images: ['https://picsum.photos/seed/vasantgad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Vasantgad', url: 'https://en.wikipedia.org/wiki/Vasantgad' }
    ],
    trailProfile: genericProfile(900),
    trailGeoJSON: createTrail(17.28, 74.15)
  },
  {
    id: 'sadashivgad',
    name: 'Sadashivgad (सदाशिवगड)',
    region: 'Satara',
    coordinates: { lat: 17.23, lng: 74.20 },
    elevation: 950,
    difficulty: Difficulty.EASY,
    era: 'Maratha',
    description: 'Near Karad.',
    history: 'Maintained by Shivaji Maharaj for regional security.',
    bestMonth: 'All Year',
    distanceFromPune: 165,
    images: ['https://picsum.photos/seed/sadashivgad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Sadashivgad', url: 'https://en.wikipedia.org/wiki/Sadashivgad' }
    ],
    trailProfile: genericProfile(950),
    trailGeoJSON: createTrail(17.23, 74.20)
  },
  {
    id: 'bhushangad',
    name: 'Bhushangad (भूषणगड)',
    region: 'Satara',
    coordinates: { lat: 17.45, lng: 74.45 },
    elevation: 900,
    difficulty: Difficulty.EASY,
    era: 'Yadava',
    description: 'A distinct rounded hill fort.',
    history: 'Known for its temple of Harinarayan.',
    bestMonth: 'November - February',
    distanceFromPune: 170,
    images: ['https://picsum.photos/seed/bhushangad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Bhushangad', url: 'https://en.wikipedia.org/wiki/Bhushangad' }
    ],
    trailProfile: genericProfile(900),
    trailGeoJSON: createTrail(17.45, 74.45)
  },

  // --- AHMEDNAGAR REGION ---
  {
    id: 'harishchandragad',
    name: 'Harishchandragad (हरिश्चंद्रगड)',
    region: 'Ahmednagar',
    coordinates: { lat: 19.386, lng: 73.777 },
    elevation: 1422,
    difficulty: Difficulty.HARD,
    era: 'Kalchuri (6th Century)',
    description: 'Famous for the Konkan Kada (massive cliff) and Taramati peak.',
    history: 'Ancient fort with caves dating back to the 6th century. Kedareshwar cave has a massive Shiva linga surrounded by water.',
    bestMonth: 'August - February',
    distanceFromPune: 160,
    images: ['https://picsum.photos/seed/harishchandragad/800/400'],
    plants: ['p2', 'p3'],
    references: [
      { type: 'Web', title: 'Wikipedia: Harishchandragad', url: 'https://en.wikipedia.org/wiki/Harishchandragad' }
    ],
    trailProfile: genericProfile(1422),
    trailGeoJSON: createTrail(19.386, 73.777)
  },
  {
    id: 'ratangad',
    name: 'Ratangad (रतनगड)',
    region: 'Ahmednagar',
    coordinates: { lat: 19.50, lng: 73.71 },
    elevation: 1297,
    difficulty: Difficulty.MODERATE,
    era: 'Maratha',
    description: 'The Jewel Fort, famous for the natural rock hole (Nedhe) at the top.',
    history: 'Overlooks the Bhandardara dam. A favorite of Shivaji Maharaj.',
    bestMonth: 'August - February',
    distanceFromPune: 180,
    images: ['https://picsum.photos/seed/ratangad/800/400'],
    plants: ['p1'],
    references: [
      { type: 'Web', title: 'Wikipedia: Ratangad', url: 'https://en.wikipedia.org/wiki/Ratangad' }
    ],
    trailProfile: genericProfile(1297),
    trailGeoJSON: createTrail(19.50, 73.71)
  },
  {
    id: 'alang',
    name: 'Alang (अलंग)',
    region: 'Nashik',
    coordinates: { lat: 19.58, lng: 73.65 },
    elevation: 1479,
    difficulty: Difficulty.EXTREME,
    era: 'Maratha',
    description: 'Part of the AMK trio (Alang-Madan-Kulang). Known for technical climbing.',
    history: 'One of the most difficult treks in Sahyadris due to steep rock faces.',
    bestMonth: 'November - February',
    distanceFromPune: 190,
    images: ['https://picsum.photos/seed/alang/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Alang Fort', url: 'https://en.wikipedia.org/wiki/Alang_Fort' }
    ],
    trailProfile: genericProfile(1479),
    trailGeoJSON: createTrail(19.58, 73.65)
  },
  {
    id: 'madan',
    name: 'Madangad (मदनगड)',
    region: 'Nashik',
    coordinates: { lat: 19.59, lng: 73.64 },
    elevation: 1400,
    difficulty: Difficulty.EXTREME,
    era: 'Maratha',
    description: 'Requires technical rock climbing to reach the top.',
    history: 'Very small summit area.',
    bestMonth: 'November - February',
    distanceFromPune: 190,
    images: ['https://picsum.photos/seed/madan/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Madangad', url: 'https://en.wikipedia.org/wiki/Madangad' }
    ],
    trailProfile: genericProfile(1400),
    trailGeoJSON: createTrail(19.59, 73.64)
  },
  {
    id: 'kulang',
    name: 'Kulang (कुलंग)',
    region: 'Nashik',
    coordinates: { lat: 19.60, lng: 73.63 },
    elevation: 1470,
    difficulty: Difficulty.HARD,
    era: 'Maratha',
    description: 'Highest of the AMK trio with a massive plateau.',
    history: 'Offers spectacular views of Kalsubai and other peaks.',
    bestMonth: 'November - February',
    distanceFromPune: 190,
    images: ['https://picsum.photos/seed/kulang/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Kulang', url: 'https://en.wikipedia.org/wiki/Kulang_Fort' }
    ],
    trailProfile: genericProfile(1470),
    trailGeoJSON: createTrail(19.60, 73.63)
  },

  // --- NASHIK REGION ---
  {
    id: 'salher',
    name: 'Salher (साल्हेर)',
    region: 'Nashik',
    coordinates: { lat: 20.72, lng: 73.94 },
    elevation: 1567,
    difficulty: Difficulty.MODERATE,
    era: 'Maratha',
    description: 'Highest fort in Maharashtra.',
    history: 'Site of the Battle of Salher (1672), a massive open field battle won by Marathas.',
    bestMonth: 'November - February',
    distanceFromPune: 260,
    images: ['https://picsum.photos/seed/salher/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Salher', url: 'https://en.wikipedia.org/wiki/Salher' }
    ],
    trailProfile: genericProfile(1567),
    trailGeoJSON: createTrail(20.72, 73.94)
  },
  {
    id: 'salota',
    name: 'Salota (सालोटा)',
    region: 'Nashik',
    coordinates: { lat: 20.73, lng: 73.93 },
    elevation: 1500,
    difficulty: Difficulty.HARD,
    era: 'Maratha',
    description: 'Twin fort of Salher.',
    history: 'Often trekked together with Salher.',
    bestMonth: 'November - February',
    distanceFromPune: 260,
    images: ['https://picsum.photos/seed/salota/800/400'],
    plants: [],
    references: [
       { type: 'Web', title: 'Wikipedia: Salota Fort', url: 'https://en.wikipedia.org/wiki/Salota_Fort' }
    ],
    trailProfile: genericProfile(1500),
    trailGeoJSON: createTrail(20.73, 73.93)
  },
  {
    id: 'dhodap',
    name: 'Dhodap (धोडप)',
    region: 'Nashik',
    coordinates: { lat: 20.38, lng: 74.03 },
    elevation: 1472,
    difficulty: Difficulty.HARD,
    era: 'Maratha',
    description: 'Second highest fort in Maharashtra.',
    history: 'Has a unique needle hole in the rock.',
    bestMonth: 'October - February',
    distanceFromPune: 230,
    images: ['https://picsum.photos/seed/dhodap/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Dhodap', url: 'https://en.wikipedia.org/wiki/Dhodap' }
    ],
    trailProfile: genericProfile(1472),
    trailGeoJSON: createTrail(20.38, 74.03)
  },
  {
    id: 'ahivantgad',
    name: 'Ahivantgad (अहिवंतगड)',
    region: 'Nashik',
    coordinates: { lat: 20.40, lng: 73.90 },
    elevation: 1200,
    difficulty: Difficulty.MODERATE,
    era: 'Maratha',
    description: 'Large plateau fort near Vani.',
    history: 'Mentioned in ancient texts. British destroyed much of it.',
    bestMonth: 'November - February',
    distanceFromPune: 240,
    images: ['https://picsum.photos/seed/ahivantgad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Ahivantgad', url: 'https://en.wikipedia.org/wiki/Ahivantgad' }
    ],
    trailProfile: genericProfile(1200),
    trailGeoJSON: createTrail(20.40, 73.90)
  },
  {
    id: 'markandeya',
    name: 'Markandeya Fort (मार्कंडेय)',
    region: 'Nashik',
    coordinates: { lat: 20.38, lng: 73.95 },
    elevation: 1300,
    difficulty: Difficulty.MODERATE,
    era: 'Maratha',
    description: 'Named after Sage Markandeya.',
    history: 'Used as a watchtower.',
    bestMonth: 'October - February',
    distanceFromPune: 235,
    images: ['https://picsum.photos/seed/markandeya/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Markandeya Fort', url: 'https://en.wikipedia.org/wiki/Markandeya_Fort' }
    ],
    trailProfile: genericProfile(1300),
    trailGeoJSON: createTrail(20.38, 73.95)
  },
  {
    id: 'galna',
    name: 'Galna Fort (गाळणा)',
    region: 'Nashik',
    coordinates: { lat: 20.78, lng: 74.53 },
    elevation: 700,
    difficulty: Difficulty.MODERATE,
    era: 'Bagul Dynasty',
    description: 'Located near Malegaon.',
    history: 'Important fort in Khandesh region.',
    bestMonth: 'November - February',
    distanceFromPune: 270,
    images: ['https://picsum.photos/seed/galna/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Galna', url: 'https://en.wikipedia.org/wiki/Galna_Fort' }
    ],
    trailProfile: genericProfile(700),
    trailGeoJSON: createTrail(20.78, 74.53)
  },

  // --- KONKAN (RATNAGIRI / SINDHUDURG) ---
  {
    id: 'sindhudurg',
    name: 'Sindhudurg (सिंधुदुर्ग)',
    region: 'Sindhudurg',
    coordinates: { lat: 16.04, lng: 73.47 },
    elevation: 0,
    difficulty: Difficulty.EASY,
    era: 'Maratha Navy',
    description: 'Marine fort built by Shivaji Maharaj.',
    history: 'Built on Kurte Island. Foundation laid with lead. Has a temple of Shivaji Maharaj.',
    bestMonth: 'October - May',
    distanceFromPune: 350,
    images: ['https://picsum.photos/seed/sindhudurg/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Sindhudurg Fort', url: 'https://en.wikipedia.org/wiki/Sindhudurg_Fort' }
    ],
    trailProfile: genericProfile(10),
    trailGeoJSON: createTrail(16.04, 73.47)
  },
  {
    id: 'vijaydurg',
    name: 'Vijaydurg (विजयदुर्ग)',
    region: 'Sindhudurg',
    coordinates: { lat: 16.55, lng: 73.33 },
    elevation: 0,
    difficulty: Difficulty.EASY,
    era: 'Shilahara / Maratha',
    description: 'Oldest fort on Sindhudurg coast.',
    history: 'Naval base of the Maratha Admiral Kanhoji Angre. Known for its underwater wall.',
    bestMonth: 'October - May',
    distanceFromPune: 330,
    images: ['https://picsum.photos/seed/vijaydurg/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Vijaydurg Fort', url: 'https://en.wikipedia.org/wiki/Vijaydurg_Fort' }
    ],
    trailProfile: genericProfile(20),
    trailGeoJSON: createTrail(16.55, 73.33)
  },
  {
    id: 'ratnagiri',
    name: 'Ratnagiri Fort (रत्नागिरी)',
    region: 'Ratnagiri',
    coordinates: { lat: 16.99, lng: 73.27 },
    elevation: 100,
    difficulty: Difficulty.EASY,
    era: 'Bahmani',
    description: 'Also known as Ratnadurg. Surrounded by sea on three sides.',
    history: 'Has a famous lighthouse and Bhagwati temple.',
    bestMonth: 'All Year',
    distanceFromPune: 300,
    images: ['https://picsum.photos/seed/ratnagiri/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Ratnadurg Fort', url: 'https://en.wikipedia.org/wiki/Ratnadurg_Fort' }
    ],
    trailProfile: genericProfile(100),
    trailGeoJSON: createTrail(16.99, 73.27)
  },
  {
    id: 'jaigad',
    name: 'Jaigad (जयगड)',
    region: 'Ratnagiri',
    coordinates: { lat: 17.29, lng: 73.21 },
    elevation: 50,
    difficulty: Difficulty.EASY,
    era: 'Bijapur',
    description: 'Located at the confluence of Shastri river and Arabian Sea.',
    history: 'Protects the creek.',
    bestMonth: 'All Year',
    distanceFromPune: 280,
    images: ['https://picsum.photos/seed/jaigad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Jaigad Fort', url: 'https://en.wikipedia.org/wiki/Jaigad_Fort' }
    ],
    trailProfile: genericProfile(50),
    trailGeoJSON: createTrail(17.29, 73.21)
  },
  {
    id: 'suvarnadurg',
    name: 'Suvarnadurg (सुवर्णदुर्ग)',
    region: 'Ratnagiri',
    coordinates: { lat: 17.81, lng: 73.09 },
    elevation: 0,
    difficulty: Difficulty.EASY,
    era: 'Adil Shahi / Maratha',
    description: 'Golden Fort, an island fort near Harnai.',
    history: 'Ship building base for Maratha navy.',
    bestMonth: 'October - May',
    distanceFromPune: 200,
    images: ['https://picsum.photos/seed/suvarnadurg/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Suvarnadurg', url: 'https://en.wikipedia.org/wiki/Suvarnadurg' }
    ],
    trailProfile: genericProfile(10),
    trailGeoJSON: createTrail(17.81, 73.09)
  },
  {
    id: 'kelshi',
    name: 'Kelshi Fort (केळशी)',
    region: 'Ratnagiri',
    coordinates: { lat: 17.92, lng: 73.05 },
    elevation: 30,
    difficulty: Difficulty.EASY,
    era: 'Unknown',
    description: 'Small coastal fort near Dapoli.',
    history: 'Ruined condition, scenic beach nearby.',
    bestMonth: 'All Year',
    distanceFromPune: 210,
    images: ['https://picsum.photos/seed/kelshi/800/400'],
    plants: [],
    references: [
       { type: 'Web', title: 'Local History Blog', url: '#' }
    ],
    trailProfile: genericProfile(30),
    trailGeoJSON: createTrail(17.92, 73.05)
  },
  {
    id: 'shirgaon',
    name: 'Shirgaon Fort (शिरगाव)',
    region: 'Palghar',
    coordinates: { lat: 19.69, lng: 72.73 },
    elevation: 20,
    difficulty: Difficulty.EASY,
    era: 'Portuguese',
    description: 'Located near Palghar.',
    history: 'Captured by Marathas in 1739 campaign.',
    bestMonth: 'All Year',
    distanceFromPune: 180,
    images: ['https://picsum.photos/seed/shirgaon/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Shirgaon Fort', url: 'https://en.wikipedia.org/wiki/Shirgaon_Fort' }
    ],
    trailProfile: genericProfile(20),
    trailGeoJSON: createTrail(19.69, 72.73)
  },

  // --- KOLHAPUR REGION ---
  {
    id: 'panhala',
    name: 'Panhala (पन्हाळा)',
    region: 'Kolhapur',
    coordinates: { lat: 16.81, lng: 74.11 },
    elevation: 845,
    difficulty: Difficulty.EASY,
    era: 'Shilahara (12th Century)',
    description: 'A massive fort and a hill station. Site of the brave stand by Baji Prabhu Deshpande nearby (Pavan Khind).',
    history: 'Shivaji Maharaj stayed here for over 500 days. Famous for the escape to Vishalgad.',
    bestMonth: 'June - February',
    distanceFromPune: 240,
    images: ['https://picsum.photos/seed/panhala/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Panhala Fort', url: 'https://en.wikipedia.org/wiki/Panhala_Fort' }
    ],
    trailProfile: genericProfile(845),
    trailGeoJSON: createTrail(16.81, 74.11)
  },
  {
    id: 'pavangad',
    name: 'Pavangad (पावनगड)',
    region: 'Kolhapur',
    coordinates: { lat: 16.815, lng: 74.12 },
    elevation: 850,
    difficulty: Difficulty.MODERATE,
    era: 'Maratha',
    description: 'Twin fort of Panhala.',
    history: 'Built to strengthen Panhala defenses.',
    bestMonth: 'June - February',
    distanceFromPune: 240,
    images: ['https://picsum.photos/seed/pavangad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Pavangad', url: 'https://en.wikipedia.org/wiki/Pavangad' }
    ],
    trailProfile: genericProfile(850),
    trailGeoJSON: createTrail(16.815, 74.12)
  },
  {
    id: 'vishalgad',
    name: 'Vishalgad (विशाळगड)',
    region: 'Kolhapur',
    coordinates: { lat: 16.86, lng: 73.76 },
    elevation: 1130,
    difficulty: Difficulty.MODERATE,
    era: 'Shilahara',
    description: 'Destination of the famous Panhala-Vishalgad trek.',
    history: 'Known as Khelna. Baji Prabhu Deshpande fought the rear guard battle at Pavan Khind nearby.',
    bestMonth: 'June - February',
    distanceFromPune: 260,
    images: ['https://picsum.photos/seed/vishalgad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Vishalgad', url: 'https://en.wikipedia.org/wiki/Vishalgad' }
    ],
    trailProfile: genericProfile(1130),
    trailGeoJSON: createTrail(16.86, 73.76)
  },

  // --- MARATHWADA ---
  {
    id: 'naldurg',
    name: 'Naldurg (नळदुर्ग)',
    region: 'Osmanabad',
    coordinates: { lat: 17.81, lng: 76.29 },
    elevation: 600,
    difficulty: Difficulty.EASY,
    era: 'Chalukya / Bahmani',
    description: 'Land fort famous for its massive dam and waterfall (Nar-Madi) built inside the fort.',
    history: 'Engineering marvel of medieval times.',
    bestMonth: 'August - February',
    distanceFromPune: 280,
    images: ['https://picsum.photos/seed/naldurg/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Naldurg Fort', url: 'https://en.wikipedia.org/wiki/Naldurg_Fort' }
    ],
    trailProfile: genericProfile(600),
    trailGeoJSON: createTrail(17.81, 76.29)
  },
  {
    id: 'ausa',
    name: 'Ausa Fort (औसा)',
    region: 'Latur',
    coordinates: { lat: 18.25, lng: 76.50 },
    elevation: 630,
    difficulty: Difficulty.EASY,
    era: 'Bahmani',
    description: 'Land fort located in a depression, making it invisible from distance.',
    history: 'Captured by Mughals, then Marathas.',
    bestMonth: 'All Year',
    distanceFromPune: 300,
    images: ['https://picsum.photos/seed/ausa/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Ausa Fort', url: 'https://en.wikipedia.org/wiki/Ausa_Fort' }
    ],
    trailProfile: genericProfile(630),
    trailGeoJSON: createTrail(18.25, 76.50)
  },
  {
    id: 'paranda',
    name: 'Paranda Fort (परांडा)',
    region: 'Osmanabad',
    coordinates: { lat: 18.27, lng: 75.44 },
    elevation: 550,
    difficulty: Difficulty.EASY,
    era: 'Bahmani',
    description: 'A solid land fort with strong bastions and a moat.',
    history: 'One of the best preserved land forts.',
    bestMonth: 'All Year',
    distanceFromPune: 250,
    images: ['https://picsum.photos/seed/paranda/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Paranda Fort', url: 'https://en.wikipedia.org/wiki/Paranda_Fort' }
    ],
    trailProfile: genericProfile(550),
    trailGeoJSON: createTrail(18.27, 75.44)
  },
  {
    id: 'mahuli',
    name: 'Mahuli (माहुली)',
    region: 'Thane',
    coordinates: { lat: 19.45, lng: 73.23 },
    elevation: 850,
    difficulty: Difficulty.MODERATE,
    era: 'Mughal / Maratha',
    description: 'Complex of peaks near Asangaon.',
    history: 'Shahaji Raje (Shivaji\'s father) had his last stand here against Mughals.',
    bestMonth: 'June - February',
    distanceFromPune: 140,
    images: ['https://picsum.photos/seed/mahuli/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Mahuli', url: 'https://en.wikipedia.org/wiki/Mahuli' }
    ],
    trailProfile: genericProfile(850),
    trailGeoJSON: createTrail(19.45, 73.23)
  },

  // --- VIDARBHA ---
  {
    id: 'narnala',
    name: 'Narnala (नरनाळा)',
    region: 'Akola',
    coordinates: { lat: 21.23, lng: 77.02 },
    elevation: 973,
    difficulty: Difficulty.MODERATE,
    era: 'Gond / Mughal',
    description: 'Located in Melghat Tiger Reserve.',
    history: 'Famous for the massive 27-foot cannon "Nau-gaji-toph".',
    bestMonth: 'October - February',
    distanceFromPune: 550,
    images: ['https://picsum.photos/seed/narnala/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Narnala', url: 'https://en.wikipedia.org/wiki/Narnala' }
    ],
    trailProfile: genericProfile(973),
    trailGeoJSON: createTrail(21.23, 77.02)
  },
  {
    id: 'gavilgad',
    name: 'Gavilgad (गाविलगड)',
    region: 'Amravati',
    coordinates: { lat: 21.36, lng: 77.33 },
    elevation: 1000,
    difficulty: Difficulty.MODERATE,
    era: 'Bahmani',
    description: 'Near Chikhaldara hill station.',
    history: 'Site of the Second Anglo-Maratha War battle (1803) where Arthur Wellesley defeated Marathas.',
    bestMonth: 'October - February',
    distanceFromPune: 600,
    images: ['https://picsum.photos/seed/gavilgad/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Gavilghur', url: 'https://en.wikipedia.org/wiki/Gavilghur' }
    ],
    trailProfile: genericProfile(1000),
    trailGeoJSON: createTrail(21.36, 77.33)
  },
  {
    id: 'chandrapur',
    name: 'Chandrapur Fort (चंद्रपूर)',
    region: 'Chandrapur',
    coordinates: { lat: 19.95, lng: 79.29 },
    elevation: 200,
    difficulty: Difficulty.EASY,
    era: 'Gond',
    description: 'Land fort enclosing the old city of Chandrapur.',
    history: 'Built by Gond Kings. Has impressive gates.',
    bestMonth: 'October - February',
    distanceFromPune: 700,
    images: ['https://picsum.photos/seed/chandrapur/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Chandrapur Fort', url: 'https://en.wikipedia.org/wiki/Chandrapur_Fort' }
    ],
    trailProfile: genericProfile(200),
    trailGeoJSON: createTrail(19.95, 79.29)
  },
  {
    id: 'ballarpur',
    name: 'Ballarpur Fort (बल्लारपूर)',
    region: 'Chandrapur',
    coordinates: { lat: 19.84, lng: 79.34 },
    elevation: 180,
    difficulty: Difficulty.EASY,
    era: 'Gond',
    description: 'Located on the banks of Wardha river.',
    history: 'Capital of Gond King Khandkya Ballal.',
    bestMonth: 'October - February',
    distanceFromPune: 710,
    images: ['https://picsum.photos/seed/ballarpur/800/400'],
    plants: [],
    references: [
      { type: 'Web', title: 'Wikipedia: Ballarpur Fort', url: 'https://en.wikipedia.org/wiki/Ballarpur_Fort' }
    ],
    trailProfile: genericProfile(180),
    trailGeoJSON: createTrail(19.84, 79.34)
  },
  {
    id: 'supa',
    name: 'Supa Fort (सुपा)',
    region: 'Pune',
    coordinates: { lat: 18.35, lng: 74.38 },
    elevation: 600,
    difficulty: Difficulty.EASY,
    era: 'Maratha',
    description: 'A small land fort (Garhi) in Baramati region.',
    history: 'Less known, local historical significance.',
    bestMonth: 'All Year',
    distanceFromPune: 70,
    images: ['https://picsum.photos/seed/supa/800/400'],
    plants: [],
    references: [],
    trailProfile: genericProfile(600),
    trailGeoJSON: createTrail(18.35, 74.38)
  }
];