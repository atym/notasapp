import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { LessonQuiz } from '../../LessonQuiz';
import { getSmartDistractors } from '../../../data';

const FeelingsLesson = () => {
    const [mode, setMode] = useState('learn');
    
    // 1. New State for TWO collections
    const [greetings, setGreetings] = useState([]);
    const [feelings, setFeelings] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Fetch Both from DB
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Greetings
                const greetSnap = await getDocs(collection(db, "greetings"));
                const greetItems = greetSnap.docs.map(doc => doc.data());
                setGreetings(greetItems.sort(() => 0.5 - Math.random()));

                // Fetch Feelings
                const feelSnap = await getDocs(collection(db, "feelings"));
                const feelItems = feelSnap.docs.map(doc => doc.data());
                setFeelings(feelItems.sort(() => 0.5 - Math.random()));

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 3. Helper Component
    const FlipCard = ({ item }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-24 cursor-pointer perspective-1000 group`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner ${flipped ? 'rotate-y-180' : ''}`}>
                    <div className="absolute inset-0 bg-gray-800 rounded-xl border border-gray-700 flex flex-col items-center justify-center backface-hidden">
                        <div className="text-3xl mb-1">{item.emoji}</div>
                        <span className="font-bold text-sm text-center px-1">{item.es}</span>
                    </div>
                    <div className="absolute inset-0 bg-yellow-900/40 rounded-xl border border-yellow-500 flex flex-col items-center justify-center backface-hidden rotate-y-180">
                        <span className="font-bold text-sm text-yellow-200 text-center px-1">{item.en}</span>
                    </div>
                </div>
            </div>
        );
    };
    
    // 4. Dynamic Quiz Pool (combines both lists!)
    const quizPool = useMemo(() => {
        if (feelings.length === 0 || greetings.length === 0) return [];
        
        const base = [
            { type: 'mc', q: "Por la mañana decimos...", a: "Buenos días", opts: ["Buenas noches", "Hola", "Buenos días"].sort(()=>0.5-Math.random()), exp: "'Buenos días' se usa en la mañana." }
        ];
        
        // Add dynamic questions from the DB data
        feelings.slice(0, 6).forEach(f => {
            const sentence = f.en.startsWith("I am") 
                ? `En español: "${f.en}" se dice...`
                : `¿Qué significa "${f.es}"?`;
            
            base.push({ 
                type: 'mc', 
                q: sentence, 
                a: f.es, 
                opts: [f.es, ...getSmartDistractors(f.es, feelings)].sort(()=>0.5-Math.random()), 
                exp: `${f.es} significa ${f.en}` 
            });
        });
        
        return base.sort(() => 0.5 - Math.random());
    }, [feelings, greetings]);

    if (loading) return <div className="p-10 text-center text-gray-400">Cargando emociones...</div>;

    if (mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;

    return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-6">
            <div>
                <h3 className="font-bold text-yellow-400 mb-3 uppercase tracking-wider">Saludos</h3>
                <div className="grid grid-cols-2 gap-3">
                    {greetings.map((g, i) => <FlipCard key={i} item={g} />)}
                </div>
            </div>
            
            <div>
                <h3 className="font-bold text-yellow-400 mb-3 uppercase tracking-wider">Sentimientos</h3>
                <div className="grid grid-cols-2 gap-3">
                    {feelings.map((f, i) => <FlipCard key={i} item={f} />)}
                </div>
            </div>

            <button onClick={() => setMode('quiz')} className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Prueba</button>
        </div>
    );
};

export default FeelingsLesson;