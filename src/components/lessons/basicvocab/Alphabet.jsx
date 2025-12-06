import React, { useState, useEffect, useRef } from 'react';
import { Volume2, ExternalLink, Play, AlertCircle, Loader2, Youtube, HelpCircle } from 'lucide-react';
import { db } from '../../../firebase'; 
import { collection, getDocs, query } from 'firebase/firestore';
import { LessonQuiz } from '../quizzes/LessonQuiz';

const Alphabet = () => {
  const [letters, setLetters] = useState([]);
  const [sounds, setSounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const [quizActive, setQuizActive] = useState(false);
  const [questionPool, setQuestionPool] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "alphabet"));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => doc.data());
        
        items.sort((a, b) => a.letter.localeCompare(b.letter, 'es', { sensitivity: 'base' }));

        const coreLetters = items.filter(item => item.category === 'letter');
        const specialSounds = items.filter(item => item.category === 'sound');

        setLetters(coreLetters);
        setSounds(specialSounds);

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
    let utterance;

    if (text === 'B') {
      utterance = new SpeechSynthesisUtterance('be');
    } else if (text === 'V') {
      utterance = new SpeechSynthesisUtterance('uve');
    } else if (text === 'LL') {
      utterance = new SpeechSynthesisUtterance('ye');
    } else if (text === 'RR') {
      utterance = new SpeechSynthesisUtterance('erre');
    } else if (text === 'Y') {
        utterance = new SpeechSynthesisUtterance('i griega');
    } else if (text === 'W') {
        utterance = new SpeechSynthesisUtterance('doble u');
    } else {
      utterance = new SpeechSynthesisUtterance(text.toLowerCase());
    }
    
    utterance.lang = 'es-MX';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const generateQuestionPool = () => {
    const confusables = {
        'B': ['V'], 
        'V': ['B'],
        'C': ['S', 'Z', 'K', 'Q'],
        'S': ['Z', 'C', 'X'],
        'Z': ['S', 'C'],
        'G': ['J'],
        'J': ['G', 'X'],
        'LL': ['Y'], 
        'Y': ['LL', 'I'],
        'I': ['Y'],
        'M': ['N', 'Ñ'], 
        'N': ['M', 'Ñ'], 
        'Ñ': ['M', 'N'],
        'K': ['Q', 'C'],
        'Q': ['K', 'C'],
        'X': ['J', 'S']
    };

    const shuffledLetters = [...letters].sort(() => 0.5 - Math.random()).slice(0, 15);

    const pool = shuffledLetters.map(letter => {
        const correctAnswer = letter.letter;
        const options = [correctAnswer];

        // Add confusable letters
        if (confusables[correctAnswer]) {
            const confusableOptions = confusables[correctAnswer].filter(c => !options.includes(c));
            if (confusableOptions.length > 0) {
                options.push(confusableOptions[Math.floor(Math.random() * confusableOptions.length)]);
            }
        }

        // Add other random letters
        while (options.length < 4) {
            const randomLetter = letters[Math.floor(Math.random() * letters.length)].letter;
            if (!options.includes(randomLetter)) {
                options.push(randomLetter);
            }
        }

        return {
            q: (
                <button onClick={() => speak(correctAnswer)} className="w-full h-full flex items-center justify-center gap-2 text-indigo-400 text-lg font-bold">
                    <Volume2 size={24} /> Escuchar Sonido
                </button>
            ),
            a: correctAnswer,
            opts: options.sort(() => 0.5 - Math.random()),
            type: 'mc'
        };
    });

    setQuestionPool(pool);
    setQuizActive(true);
};

  const videoId = "1wJIkTuckEI";
  const youtubeWebUrl = `https://www.youtube.com/watch?v=${videoId}`;

  if (loading) {
    return (
        <div className="w-full flex items-center justify-center p-8">
            <Loader2 className="animate-spin text-indigo-400 w-8 h-8" />
        </div>
    );
  }

  if (quizActive) {
    return (
        <div className="w-full bg-[#111827] text-gray-100 space-y-8 animate-fade-in p-4">
            <h2 className="text-xl font-black text-white tracking-tight">Prueba de Alfabeto</h2>
            <LessonQuiz
                onComplete={() => setQuizActive(false)}
                questionCount={15}
                pool={questionPool}
            />
        </div>
    );
  }

  const scrollToVideo = () => {
    videoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  const renderListItem = (item, isSound = false) => {
    const colorClass = isSound ? 'teal' : 'purple';
    return (
        <button 
            key={item.letter} 
            onClick={() => speak(item.letter)}
            className={`group flex justify-between items-center p-4 rounded-xl border border-gray-700/50 hover:bg-white/5 hover:border-${colorClass}-500/50 transition-all active:scale-95 text-left`}
        >
            <div className="flex items-center gap-4">
                <span className={`text-2xl font-black text-${colorClass}-400 group-hover:text-${colorClass}-300 w-16 text-center`}>
                    {item.display}
                </span>
            </div>
            
            <div className="flex items-center gap-3 text-right flex-1 justify-end">
                <div className="flex-grow text-right">
                    <span className="block text-white font-bold text-lg">{item.sound}</span>
                    <span className="text-xs text-gray-500 italic group-hover:text-gray-400">{item.notes}</span>
                </div>
                <Volume2 className={`w-5 h-5 text-gray-600 group-hover:text-${colorClass}-400 opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
        </button>
    );
  }

  return (
    <div className="w-full bg-[#111827] text-gray-100 space-y-8 animate-fade-in">
        
        <div className="space-y-1">
            <h2 className="text-2xl font-black text-white tracking-tight">Alfabeto Español</h2>
            <p className="text-gray-400 text-xs font-medium">Letras, sonidos y pronunciación</p>
        </div>

        <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10">
            <h3 className="font-bold text-sm text-indigo-300 mb-2 flex items-center gap-2">
                Claves de Pronunciación
            </h3>
            <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside opacity-90">
                <li><b className="text-white">H</b> es siempre silenciosa.</li>
                <li><b className="text-white">LL</b> y <b className="text-white">Y</b> suenan como 'Y' en 'yes'.</li>
                <li><b className="text-white">RR</b> es una vibración fuerte (trilled R).</li>
                <li><b className="text-white">C</b> y <b className="text-white">G</b> cambian su sonido dependiendo de la vocal que sigue.</li>
            </ul>
        </div>

        <div className="grid grid-cols-2 gap-2">
            <button 
                onClick={scrollToVideo}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 transition-all font-medium text-sm">
                <Youtube size={16} />
                Ver video
            </button>
            <button
                onClick={generateQuestionPool}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all font-medium text-sm">
                <HelpCircle size={16} />
                Empezar Prueba
            </button>
        </div>
        
        {/* Letter List */}
        <div className="grid grid-cols-1 gap-2">
            {letters.map(item => renderListItem(item, false))}
        </div>

        {/* Special Sounds */}
        {sounds.length > 0 && (
            <div className="pt-4">
                <h3 className="text-base font-bold text-gray-400 tracking-wide uppercase pb-3">Sonidos Únicos</h3>
                <div className="grid grid-cols-1 gap-2">
                    {sounds.map(item => renderListItem(item, true))}
                </div>
            </div>
        )}

        {/* Video Section */}
        <div ref={videoRef} className="space-y-3 pt-8">
            <h3 className="text-base font-bold text-gray-400 tracking-wide uppercase pb-3">Video de Práctica</h3>
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
                <span className={`text-sm font-medium ${videoError ? 'text-pink-200' : 'text-gray-400 group-hover:text-white'}`}>{videoError ? "Video no disponible - Ver en YouTube" : "Abrir en YouTube App"}</span>
                <ExternalLink size={14} className={`${videoError ? 'text-pink-500' : 'text-gray-600 group-hover:text-white'}`} />
            </a>
        </div>
    </div>
  );
};

export default Alphabet;