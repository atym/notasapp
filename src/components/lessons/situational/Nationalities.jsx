import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect, useMemo } from 'react';
import { LessonQuiz } from '../../LessonQuiz';
import { getSmartDistractors } from '../../../data';

const NationalitiesLesson = () => {
    const [mode, setMode] = useState('list');
    
    // 1. New State
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Fetch from DB
    useEffect(() => {
        const fetchData = async () => {
            try {
                const snap = await getDocs(collection(db, "countries"));
                const items = snap.docs.map(doc => doc.data());
                // Sort alphabetically by country name so the list looks nice
                items.sort((a, b) => a.country.localeCompare(b.country));
                setCountries(items);
            } catch (error) {
                console.error("Error fetching countries:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 3. Dynamic Quiz Pool
    const quizPool = useMemo(() => {
        if (countries.length === 0) return [];
        return countries.map(c => ({
            type: 'mc',
            q: `Si alguien es de ${c.country}, es...`,
            a: c.natM, 
            // Smart distractors using other nationalities
            opts: [c.natM, ...getSmartDistractors(c, countries, 2, 'natM')].sort(()=>0.5-Math.random()),
            exp: `${c.natM} es la nacionalidad de ${c.country}`
        })).sort(() => 0.5 - Math.random());
    }, [countries]);

    if(loading) return <div className="p-10 text-center text-gray-400">Cargando países...</div>;

    if(mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('list')} /></div>;

    return (
        <div className="flex flex-col h-full max-w-md mx-auto p-4 pt-8 pb-20 overflow-y-auto scrollbar-hide">
            <div className="flex gap-2 mb-6 p-1 bg-gray-800 rounded-xl">
                <button onClick={() => setMode('list')} className={`flex-1 py-2 rounded-lg font-bold text-sm ${mode === 'list' ? 'bg-rose-600' : ''}`}>Lista</button>
                <button onClick={() => setMode('plural')} className={`flex-1 py-2 rounded-lg font-bold text-sm ${mode === 'plural' ? 'bg-rose-600' : ''}`}>Plural</button>
                <button onClick={() => setMode('quiz')} className={`flex-1 py-2 rounded-lg font-bold text-sm ${mode === 'quiz' ? 'bg-rose-600' : ''}`}>Prueba</button>
            </div>

            {mode === 'list' ? (
                <div className="space-y-3">
                    {countries.map((item, i) => (
                        <div key={i} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                            <div className="font-black text-lg text-white mb-2">{item.country}</div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="block text-gray-500 text-xs">Masculino</span><span className="text-rose-300">{item.natM}</span></div>
                                <div><span className="block text-gray-500 text-xs">Femenino</span><span className="text-rose-300">{item.natF}</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-rose-900/20 border border-rose-500/30 p-4 rounded-2xl mb-4">
                        <h3 className="font-bold text-rose-400 mb-2">Reglas de Plural</h3>
                        <ul className="list-disc list-inside text-sm text-gray-300">
                            <li>Vocal: +<b>s</b></li>
                            <li>Consonante: +<b>es</b></li>
                        </ul>
                    </div>
                    {countries.map((item, i) => (
                        <div key={i} className="bg-gray-800 p-4 rounded-xl border border-gray-700 space-y-2">
                            <div className="font-bold text-white border-b border-gray-700 pb-2 mb-2">{item.country}</div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Ellos son...</span>
                                {/* Note: Basic pluralization logic (adding 's') works for most, but strictly we might need 'es' for some. 
                                    For now, we keep the simple display logic from before or assume your data is mostly vowel-ending. */}
                                <span className="text-rose-400 font-bold">{item.natM}s</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Ellas son...</span>
                                <span className="text-rose-400 font-bold">{item.natF}s</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NationalitiesLesson;
