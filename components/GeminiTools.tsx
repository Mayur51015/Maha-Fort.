import React, { useState, useRef } from 'react';
import { Camera, Video, Sparkles, Loader, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { analyzeFortImage, generateVeoVideo } from '../services/geminiService';

const GeminiTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vision' | 'video'>('vision');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
        setVideoUrl(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setError(null);
    try {
      const base64 = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];
      const text = await analyzeFortImage(base64, mimeType);
      setResult(text);
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!selectedImage) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // API Key Selection for Veo
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
         const hasKey = await window.aistudio.hasSelectedApiKey();
         if (!hasKey) {
            await window.aistudio.openSelectKey();
         }
      }

      const base64 = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];
      
      const url = await generateVeoVideo(base64, mimeType, "Cinematic flyover of the fort structure");
      setVideoUrl(url);
    } catch (err: any) {
      setError(err.message || "Failed to generate video. Ensure you have selected a valid paid API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      <div className="border-b border-stone-100 bg-stone-50/50 p-4 flex gap-4">
        <button
          onClick={() => setActiveTab('vision')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'vision' ? 'bg-white text-fort-700 shadow-sm ring-1 ring-black/5' : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          <Camera className="w-4 h-4" /> Visual Analysis
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'video' ? 'bg-white text-fort-700 shadow-sm ring-1 ring-black/5' : 'text-stone-500 hover:text-stone-700'
          }`}
        >
          <Video className="w-4 h-4" /> Veo Video Gen
        </button>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-stone-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-stone-50 transition-colors h-64 relative overflow-hidden"
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" className="absolute inset-0 w-full h-full object-contain bg-stone-100" />
            ) : (
              <div className="text-center text-stone-400">
                <ImageIcon className="w-10 h-10 mx-auto mb-2" />
                <p className="text-sm font-medium">Click to upload a fort image</p>
                <p className="text-xs">Supports JPG, PNG</p>
              </div>
            )}
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*" 
              onChange={handleImageSelect} 
              className="hidden" 
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl text-sm flex items-start gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {activeTab === 'vision' && (
          <div>
            <div className="flex justify-end mb-4">
              <button 
                onClick={handleAnalyze} 
                disabled={!selectedImage || loading}
                className="bg-fort-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-fort-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Analyze Image
              </button>
            </div>
            {result && (
              <div className="bg-stone-50 p-6 rounded-xl border border-stone-100 animate-in fade-in slide-in-from-bottom-2">
                <h4 className="text-sm font-bold text-stone-800 mb-2 uppercase tracking-wide flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-fort-500" /> Analysis Result
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">{result}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'video' && (
          <div>
             <div className="mb-4 bg-blue-50 p-4 rounded-xl text-xs text-blue-800 border border-blue-100">
               <strong>Note:</strong> Video generation requires a paid Google Cloud Project API Key. It takes a few minutes to generate.
               <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline ml-1">Billing Info</a>
            </div>

            <div className="flex justify-end mb-4">
              <button 
                onClick={handleGenerateVideo} 
                disabled={!selectedImage || loading}
                className="bg-purple-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-md"
              >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
                Generate Cinematic Video
              </button>
            </div>
            
            {loading && !videoUrl && (
              <div className="text-center py-10">
                 <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                 <p className="text-stone-500 text-sm animate-pulse">Dreaming up a video... (this may take 1-2 mins)</p>
              </div>
            )}

            {videoUrl && (
              <div className="rounded-xl overflow-hidden border border-stone-200 shadow-md bg-black animate-in fade-in zoom-in">
                <video src={videoUrl} controls autoPlay loop className="w-full aspect-video" />
                <div className="p-3 bg-white border-t border-stone-100 flex justify-between items-center">
                   <span className="text-xs font-bold text-stone-500 uppercase">Veo Generation</span>
                   <a href={videoUrl} download="fort_cinematic.mp4" className="text-xs text-purple-600 font-bold hover:underline">Download MP4</a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiTools;