import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const VocabMix = ({ onComplete }) => {
    const [vocab, setVocab] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // 1. Define which collections to fetch
                const collectionsToFetch = ['colors', 'places', 'greetings', 'feelings', 'days', 'months'];
                let combined = [];

                // 2. Fetch standard collections (simple es/en objects)
                for (const colName of collectionsToFetch) {
                    const snap = await getDocs(collection(db, colName));
                    const items = snap.docs.map(doc => ({ ...doc.data(), category: colName }));
                    combined = [...combined, ...items];
                }

                // 3. Fetch Jobs (special handling because of masc/fem fields)
                const jobsSnap = await getDocs(collection(db, 'jobs'));
                const jobsItems = jobsSnap.docs.map(doc => {
                    const data = doc.data();
                    return { es: data.masc, en: data.eng, category: 'jobs' }; // Normalize to es/en
                });
                combined = [...combined, ...jobsItems];

                // 4. Shuffle everything
                setVocab(combined.sort(() => 0.5 - Math.random()));

            } catch (error) {
                console.error("Error fetching vocab mix:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

// Individual Card Component
const VocabCard = ({ v }) => {
    const [flipped, setFlipped] = useState(false);
    return (
        <div 
            onClick={() => setFlipped(!flipped)} 
            className={`relative h-24 cursor-pointer perspective-1000 group`}
        >
             <div className={`w-full h-full relative preserve-3d flip-card-inner ${flipped ? 'rotate-y-180' : ''} transition-transform duration-500`}>
                {/* Front (Spanish ONLY) */}
                <div className="absolute inset-0 bg-gray-800 p-2 rounded-xl border border-gray-700 flex flex-col items-center justify-center backface-hidden shadow-lg">
                    <span className="text-white font-bold text-center text-lg">{v.es}</span>
                </div>
                
                {/* Back (English + Category) */}
                <div className="absolute inset-0 bg-pink-900/90 p-2 rounded-xl border border-pink-500 flex flex-col items-center justify-center backface-hidden rotate-y-180 shadow-lg">
                    <span className="text-pink-100 font-bold text-center text-lg">{v.en}</span>
                    {/* Moved Category Here */}
                    <span className="text-[10px] text-pink-300 uppercase tracking-widest mt-1 opacity-75">{v.category}</span>
                </div>
            </div>
        </div>
    );
};

    if (loading) return <div className="p-10 text-center text-gray-400">Generando mix de vocabulario...</div>;

    return (
        <div className="p-4 max-w-md mx-auto h-[calc(100vh-80px)] flex flex-col">
            <div className="mb-4">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">Vocabulario Mix</h2>
                <p className="text-gray-400 text-xs">Se encontraron {vocab.length} tarjetas.</p>
            </div>
            
            {/* 2 Column Grid */}
            <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
                <div className="grid grid-cols-2 gap-3">
                    {vocab.map((v, i) => <VocabCard key={i} v={v} />)}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gray-900/95 backdrop-blur border-t border-gray-800 max-w-md mx-auto">
                <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl">Volver al Menú</button>
            </div>
        </div>
    );
};