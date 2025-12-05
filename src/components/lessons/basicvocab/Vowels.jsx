import React, { useState, useEffect } from 'react';
import { Volume2, ExternalLink, Play, AlertCircle, Loader2 } from 'lucide-react';
// FIX: Go up 3 levels to reach src/firebase.js
import { db } from '../../../firebase.js'; 
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const Vowels = () => {
  const [vowels, setVowels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // --- 1. Fetch Data from Firestore ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Query the 'lesson_vocales' collection
        const q = query(collection(db, "lesson_vocales"), orderBy("order"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        
        if (data.length > 0) {
            setVowels(data);
        } else {
            console.log("No vowels found in Firestore. Please seed data via Admin.");
        }
      } catch (error) {
        console.error("Error fetching vowels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Audio Logic ---
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    utterance.rate = 0.8; 
    window.speechSynthesis.speak(utterance);
  };

  const videoId = "PXFMC-g0Jt8";
  const youtubeWebUrl = `https://www.youtube.com/watch?v=${videoId}`;

  if (loading) {
    return (
        <div className="min-h-screen w-full bg-[#111827] flex items-center justify-center">
            <Loader2 className="animate-spin text-pink-500 w-8 h-8" />
        </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#111827] text-gray-100 p-6 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-white tracking-tight">
          Las vocales
        </h2>
        <p className="text-gray-400 text-xs font-medium">Escucha y repite los sonidos</p>
      </div>

      {vowels.length === 0 ? (
         <div className="p-4 border border-yellow-500/30 bg-yellow-500/10 rounded-xl text-yellow-200 text-sm text-center">
            ⚠️ No hay datos. Ve al Panel de Control y pulsa "Subir Vocales".
         </div>
      ) : (
        <>
            {/* SECTION 1: COMPACT VOWEL GRID */}
            <div className="grid grid-cols-5 gap-3">
                {vowels.map((item) => (
                <button
                    key={item.letter}
                    onClick={() => speak(item.letter.toLowerCase())}
                    className="group flex flex-col items-center justify-center py-4 rounded-xl border border-gray-700/50 hover:border-pink-500/50 hover:bg-white/5 transition-all active:scale-95"
                >
                    <span className="text-xl font-black text-white mb-1 group-hover:text-pink-400 transition-colors">
                    {item.letter}
                    </span>
                    <Volume2 className="w-3 h-3 text-gray-600 group-hover:text-pink-400" />
                </button>
                ))}
            </div>

            {/* SECTION 2: VIDEO LOGIC */}
            <div className="space-y-3">
                {!videoError && (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-800 bg-black shadow-lg">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="Canción de las Vocales"
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
                    <ExternalLink size={14} className={`${videoError ? 'text-pink-500' : 'text-gray-600 group-hover:text-white'} mr-2`} />
                </a>
            </div>

            {/* SECTION 3: RHYMES */}
            <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                Rimas de Práctica
                </h3>
                
                <div className="space-y-3">
                {vowels.map((item, idx) => (
                    <div 
                    key={idx}
                    onClick={() => speak(item.rhyme)}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-700/50 hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                    <div className="w-10 shrink-0 flex items-center">
                        <span className="text-xl font-black text-purple-400 group-hover:text-pink-400 transition-colors">
                            {item.letter}
                        </span>
                    </div>

                    <div className="flex-1 text-right">
                        <p className="text-sm font-medium text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                        {item.rhyme}
                        </p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </>
      )}

    </div>
  );
};

export default Vowels;