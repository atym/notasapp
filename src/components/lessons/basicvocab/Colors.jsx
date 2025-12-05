import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { LessonQuiz } from '../../LessonQuiz';
import { getSmartDistractors } from '../../../data';

const ColorsLesson = () => {
    const [mode, setMode] = useState('learn');
    
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "colors"));
                const items = querySnapshot.docs.map(doc => doc.data());
                const shuffled = items.sort(() => 0.5 - Math.random());
                setColors(shuffled);
            } catch (error) {
                console.error("Error fetching colors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const quizPool = useMemo(() => {
        if (colors.length === 0) return [];
        return colors.map(c => ({
            type: 'mc',
            q: `¿Qué color es ${c.emoji}?`,
            a: c.es,
            opts: [c.es, ...getSmartDistractors(c, colors, 2, 'es')].sort(()=>0.5-Math.random()),
            exp: `${c.emoji} es ${c.es} (${c.en})`
        }));
    }, [colors]);

    const ColorCard = ({ c }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-24 cursor-pointer perspective-1000 group`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner ${flipped ? 'rotate-y-180' : ''}`}>
                    <div style={{backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden'}} className={`absolute inset-0 ${c.hex} rounded-2xl flex flex-col items-center justify-center shadow-lg ${flipped ? 'z-0' : 'z-10'}`}>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all rounded-2xl"></div>
                        <span className="relative font-black text-xl text-white drop-shadow-md z-10">{c.es}</span>
                    </div>
                    <div style={{backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden'}} className={`absolute inset-0 bg-gray-800 rounded-2xl border border-gray-600 flex flex-col items-center justify-center rotate-y-180 ${flipped ? 'z-10' : 'z-0'}`}>
                        <span className="font-bold text-lg text-white">{c.en}</span>
                    </div>
                </div>
            </div>
        );
    }; 

    if (loading) return <div className="p-10 text-center text-gray-400">Cargando colores...</div>;

    if(mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;

    return (
        <div className="p-6 max-w-4xl mx-auto pb-24">
            <h2 className="text-2xl font-bold mb-4 text-white">Colores</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                {colors.map((c, i) => (
                    <ColorCard key={i} c={c} />
                ))}
            </div>
            <button onClick={() => setMode('quiz')} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-2xl shadow-lg mb-4">Prueba de Colores</button>
        </div>
    );
};

export default ColorsLesson;