import React, { useState, useEffect } from 'react';
import { Volume2, ExternalLink, Play, AlertCircle, Loader2 } from 'lucide-react';
import { db } from '../../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const Alphabet = () => {
  const [alphabet, setAlphabet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDocs(collection(db, "alphabet"));
        const items = snap.docs.map(doc => doc.data());
        items.sort((a, b) => a.l.localeCompare(b.l));
        setAlphabet(items);
      } catch (error) {
        console.error("Error fetching alphabet:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const pronunciationFixes = {
      'b': 'be',
      'v': 'uve'
    };
    const textToSpeak = pronunciationFixes[text] || text;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'es-MX';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const videoId = "1wJIkTuckEI";
  const youtubeWebUrl = `https://www.youtube.com/watch?v=${videoId}`;

  if (loading) {
    return (
        <div className="min-h-screen w-full bg-[#111827] flex items-center justify-center">
            <Loader2 className="animate-spin text-pink-500 w-8 h-8" />
        </div>
    );
  }

  return (
    <div className="w-full bg-[#111827] text-gray-100 space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="space-y-1">
            <h2 className="text-2xl font-black text-white tracking-tight">Alfabeto</h2>
            <p className="text-gray-400 text-xs font-medium">Letras y sonidos</p>
        </div>

        {/* Video Section */}
        <div className="space-y-3">
            {!videoError && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-800 bg-black shadow-lg">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="Canción del Alfabeto"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0"
                        onError={() => setVideoError(true)} 
                    ></iframe>
                </div>
            )}
            
            <a 
                href={youtubeWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-3 w-full py-4 rounded-xl border ${videoError ? 'border-pink-500/30 bg-pink-500/10' : 'border-gray-700/50 hover:bg-white/5'} transition-all group`}
            >
                {videoError ? <AlertCircle size={18} className="text-pink-500" /> : <Play size={18} className="text-gray-400 group-hover:text-white" />}
                <span className={`text-sm font-medium ${videoError ? 'text-pink-200' : 'text-gray-400 group-hover:text-white'}`}>
                    {videoError ? "Video no disponible - Ver en YouTube" : "Abrir en YouTube App"}
                </span>
                <ExternalLink size={14} className={`${videoError ? 'text-pink-500' : 'text-gray-600 group-hover:text-white'}`} />
            </a>
        </div>

        {/* Static Tips */}
        <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10">
            <h3 className="font-bold text-sm text-indigo-300 mb-2 flex items-center gap-2">
                Claves de Pronunciación
            </h3>
            <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside opacity-80">
                <li><b className="text-white">H</b> es siempre silenciosa.</li>
                <li><b className="text-white">LL</b> suena como 'Y'.</li>
                <li><b className="text-white">Ñ</b> suena como 'ni' en 'onion'.</li>
            </ul>
        </div>
        
        {/* Letter List */}
        <div className="grid grid-cols-1 gap-2">
            {alphabet.map((item, idx) => (
                <button 
                    key={idx} 
                    onClick={() => speak(item.l.charAt(0).toLowerCase())}
                    className="group flex justify-between items-center p-4 rounded-xl border border-gray-700/50 hover:bg-white/5 hover:border-purple-500/50 transition-all active:scale-95 text-left"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-black text-purple-400 group-hover:text-purple-300 min-w-[5rem] whitespace-nowrap">
                            {item.l}
                        </span>
                    </div>
                    
                    {/* FIX: Moved Volume Icon to the right side next to tips */}
                    <div className="flex items-center gap-3 text-right">
                        <div>
                            <span className="block text-white font-bold text-lg">{item.s}</span>
                            <span className="text-xs text-gray-500 italic group-hover:text-gray-400">{item.tip}</span>
                        </div>
                        <Volume2 className="w-5 h-5 text-gray-600 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </button>
            ))}
        </div>
    </div>
  );
};

export default Alphabet;