import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect, useMemo } from 'react';
import { FiArrowLeft, FiChevronRight } from 'react-icons/fi';
import { LessonQuiz } from '../../LessonQuiz';

const ConjugationLesson = () => {
    const [mode, setMode] = useState('list');
    const [selectedVerb, setSelectedVerb] = useState(null);
    
    const [conjugations, setConjugations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snap = await getDocs(collection(db, "conjugations"));
                const items = snap.docs.map(doc => doc.data());
                items.sort((a, b) => a.v.localeCompare(b.v));
                setConjugations(items);
            } catch (error) {
                console.error("Error fetching conjugations:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    const quizPool = useMemo(() => {
        if (conjugations.length === 0) return [];
        const base = [
            { type: 'mc', q: "Yo ___ (Ser)", a: "Soy", opts: ["Soy", "Eres", "Es"].sort(()=>0.5-Math.random()), exp: "Yo soy." },
            { type: 'mc', q: "Tú ___ (Tener)", a: "Tienes", opts: ["Tengo", "Tienes", "Tiene"].sort(()=>0.5-Math.random()), exp: "Tú tienes." }
        ];
        
        conjugations.slice(0, 5).forEach(verb => {
            if(verb.c && verb.c.length >= 3) {
                base.push({
                    type: 'mc',
                    q: `Ella ___ (${verb.v})`,
                    a: verb.c[2],
                    opts: [verb.c[0], verb.c[1], verb.c[2]].sort(()=>0.5-Math.random()),
                    exp: `Ella ${verb.c[2]}.`
                });
            }
        });
        
        return base.sort(() => 0.5 - Math.random());
    }, [conjugations]);

    if(loading) return <div className="p-10 text-center text-gray-400">Cargando verbos...</div>;

    if (mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('list')} /></div>;
    
    if (selectedVerb) return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-4">
            <button onClick={() => setSelectedVerb(null)} className="flex items-center gap-2 text-cyan-400 mb-2"><FiArrowLeft size={20}/> Volver</button>
            <h2 className="text-2xl font-bold text-white">{selectedVerb.v} <span className="text-gray-500 text-lg">({selectedVerb.t})</span></h2>
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                <div className="divide-y divide-gray-700">
                    {["Yo", "Tú", "Él/Ella", "Nosotros", "Ellos"].map((p, i) => (
                        <div key={i} className="grid grid-cols-2 p-3 text-sm">
                            <span className="text-cyan-200">{p}</span>
                            <span className="font-bold">{selectedVerb.c && selectedVerb.c[i]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Verbos</h2>
            <div className="grid grid-cols-1 gap-3">
                {conjugations.map((v, i) => (
                    <button key={i} onClick={() => setSelectedVerb(v)} className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex justify-between items-center text-left hover:bg-gray-700">
                        <div>
                            <span className="block font-bold text-lg text-white">{v.v}</span>
                            <span className="text-xs text-gray-400">{v.t}</span>
                        </div>
                        <FiChevronRight size={20} className="text-gray-600"/>
                    </button>
                ))}
            </div>
            <button onClick={() => setMode('quiz')} className="w-full bg-cyan-600 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Prueba</button>
        </div>
    );
};

export default ConjugationLesson;
