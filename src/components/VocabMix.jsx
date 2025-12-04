import { useState, useEffect } from 'react';
import { generateVocabBank } from '../data'; // Needed for the content

// --- VOCAB MIX (FIXED) ---
 export const VocabMix = ({ onComplete }) => {
    const [vocab, setVocab] = useState([]);
    
    useEffect(() => {
        // Generate and randomize on mount only
        const list = generateVocabBank().sort(() => 0.5 - Math.random());
        setVocab(list.map((v, i) => ({ ...v, id: i })));
    }, []);

    // Individual Card Component
    const VocabCard = ({ v }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div 
                onClick={() => setFlipped(!flipped)} 
                className={`relative h-24 cursor-pointer perspective-1000 group ${flipped ? 'flipped' : ''}`}
            >
                 <div className={`w-full h-full relative preserve-3d flip-card-inner transition-transform duration-300`}>
                    {/* Front (Spanish) */}
                    <div className="absolute inset-0 bg-gray-800 p-2 rounded-xl border border-gray-700 flex items-center justify-center backface-hidden shadow-lg">
                        <span className="text-white font-bold text-center text-lg">{v.es}</span>
                    </div>
                    {/* Back (English) */}
                    <div className="absolute inset-0 bg-pink-900/90 p-2 rounded-xl border border-pink-500 flex items-center justify-center backface-hidden rotate-y-180 shadow-lg">
                        <span className="text-pink-100 font-bold text-center text-lg">{v.en}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 max-w-md mx-auto h-[calc(100vh-80px)] flex flex-col">
            <div className="mb-4">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">Vocabulario Mix</h2>
                <p className="text-gray-400 text-xs">Toca para voltear. Desplázate para ver más.</p>
            </div>
            
            {/* 2 Column Grid */}
            <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
                <div className="grid grid-cols-2 gap-3">
                    {vocab.map(v => <VocabCard key={v.id} v={v} />)}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gray-900/95 backdrop-blur border-t border-gray-800 max-w-md mx-auto">
                <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl">Volver al Menú</button>
            </div>
        </div>
    );
};