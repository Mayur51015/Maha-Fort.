import { GoogleGenAI, Type } from "@google/genai";
import { Fort } from "../types";

// Initialize Gemini Client (default instance)
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 1. AI Historian Chatbot - Upgraded to gemini-3-pro-preview
export const askGeminiHistorian = async (fortName: string, historyContext: string, userQuestion: string): Promise<string> => {
  try {
    const systemPrompt = `
      You are an expert historian specializing in the Maratha Empire and the forts of Maharashtra. 
      You are helpful, accurate, and concise.
      
      Context about the fort '${fortName}':
      ${historyContext}
      
      Answer the user's question based on this context and your general historical knowledge. 
      Keep the answer under 100 words if possible.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + "\n\nUser Question: " + userQuestion }] }
      ],
    });

    return response.text || "I couldn't find an answer to that specific question.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the history archives right now.";
  }
};

// 2. Fast AI Trip Advice - Upgraded to gemini-2.5-flash-lite
export const getGeminiTripAdvice = async (fortName: string, month: string): Promise<string> => {
  try {
     const prompt = `Give me 3 short, bulleted safety and packing tips for trekking to ${fortName} in ${month}.`;
     
     const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
    });
    
    return response.text || "Pack water, good shoes, and a first aid kit.";
  } catch (error) {
    return "Pack water, good shoes, and a first aid kit.";
  }
}

// 3. Search Grounding - Live Updates
export const getLiveFortUpdates = async (fortName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `What are the latest tourism news, weather alerts, or recent events regarding ${fortName} in Maharashtra?`,
      config: {
        tools: [{googleSearch: {}}],
      },
    });
    
    return {
      text: response.text || "No recent updates found.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Grounding Error:", error);
    return { text: "Unable to fetch live updates.", chunks: [] };
  }
};

// 4. Maps Grounding - Nearby Amenities
export const getNearbyAmenities = async (fortName: string, lat: number, lng: number) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find 3 good restaurants or hotels near ${fortName}.`,
      config: {
        tools: [{googleMaps: {}}],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng
            }
          }
        }
      },
    });

    return {
      text: response.text || "No nearby amenities found.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Maps Grounding Error:", error);
    return { text: "Unable to fetch nearby places.", chunks: [] };
  }
};

// 5. Image Analysis - gemini-3-pro-preview
export const analyzeFortImage = async (base64Image: string, mimeType: string) => {
  try {
    // Create new instance to ensure key validity if needed, though mostly relevant for Veo
    const client = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await client.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: "Identify this location or feature. If it looks like a fort in Maharashtra, describe its architectural style, condition, and any visible historical features."
          }
        ]
      }
    });

    return response.text || "Could not analyze the image.";
  } catch (error) {
    console.error("Image Analysis Error:", error);
    throw error;
  }
};

// 6. Veo Video Generation - veo-3.1-fast-generate-preview
export const generateVeoVideo = async (base64Image: string, mimeType: string, prompt: string) => {
  // Create a NEW instance with the latest key from the dialog
  const client = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let operation = await client.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    image: {
      imageBytes: base64Image,
      mimeType: mimeType,
    },
    prompt: prompt || "A cinematic drone shot of this historical fort, sunny day, 4k",
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  // Poll for completion
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await client.operations.getVideosOperation({operation: operation});
  }

  if (operation.error) {
    throw new Error(String(operation.error.message));
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) throw new Error("No video generated");

  // Fetch the actual video bytes using the key
  const videoResponse = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
  if (!videoResponse.ok) throw new Error("Failed to download video");
  
  const videoBlob = await videoResponse.blob();
  return URL.createObjectURL(videoBlob);
};

// 7. Smart Search - gemini-2.5-flash
export const searchFortsWithAI = async (query: string, allForts: Fort[]): Promise<string[]> => {
  try {
    // Simplify the dataset to reduce token usage and latency
    const fortIndex = allForts.map(f => ({
      id: f.id,
      name: f.name,
      region: f.region,
      difficulty: f.difficulty,
      description: f.description,
      tags: `${f.bestMonth} ${f.era}`
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User Query: "${query}"
      
      Database of Forts: ${JSON.stringify(fortIndex)}
      
      Task: Return a JSON array of string IDs (e.g. ["sinhagad", "torna"]) for forts that best match the query. 
      - If the user asks for "easy forts", filter by difficulty "Easy".
      - If "near Pune", filter by region "Pune" or distance.
      - If "waterfalls", look for description keywords.
      - Return ONLY the JSON array of IDs. If no match, return empty array [].`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const jsonStr = response.text || "[]";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("AI Search Error:", error);
    return [];
  }
};