import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { LessonQuiz } from './LessonQuiz';
// Import our new smart brain
import { getSmartDistractors } from '../../../data';

export const FinalQuiz = ({ onComplete }) => {
    const [pool, setPool] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const generateFinalPool = async () => {
            try {
                const cols = ['colors', 'places', 'greetings', 'feelings', 'days', 'months'];
                let masterList = [];

                // 1. Fetch Standard Collections & Tag Them
                for (const col of cols) {
                    const s = await getDocs(collection(db, col));
                    // CRITICAL: We add 'category: col' so the brain knows what it is
                    masterList.push(...s.docs.map(d => ({...d.data(), category: col})));
                }
                
                // 2. Fetch Jobs (Tag as 'jobs')
                const jobsSnap = await getDocs(collection(db, 'jobs'));
                masterList.push(...jobsSnap.docs.map(d => ({ 
                    es: d.data().masc, 
                    en: d.data().eng, 
                    category: 'jobs' 
                })));

                // 3. Generate Questions
                let questions = [];
                // Shuffle master list
                masterList.sort(() => 0.5 - Math.random());

                // Pick first 25
                const targetItems = masterList.slice(0, 25);

                questions = targetItems.map(item => {
                    // USE THE NEW BRAIN
                    // We pass the whole 'item' and the whole 'masterList'
                    const distractors = getSmartDistractors(item, masterList);

                    return {
                        type: 'mc',
                        q: `¿Qué significa \"${item.es}\"?`,
                        a: item.en,
                        opts: [item.en, ...distractors].sort(() => 0.5 - Math.random()),
                        exp: `${item.es} = ${item.en}`
                    };
                });

                setPool(questions);

            } catch (error) {
                console.error("Error generating quiz:", error);
            } finally {
                setLoading(false);
            }
        };

        generateFinalPool();
    }, []);

    if (loading) return <div className="p-10 text-center text-gray-400">Generando examen final...</div>;

    if (pool.length === 0) return <div className="p-10 text-center text-red-400">No hay suficientes datos para el examen.</div>;

    return (
        <div className="p-6 max-w-md mx-auto pb-24">
            <h2 className="text-xl font-bold mb-4 text-yellow-500">Examen Final (25 Preguntas)</h2>
            <LessonQuiz 
                pool={pool} 
                questionCount={25} 
                onComplete={onComplete} 
            />
        </div>
    );
};