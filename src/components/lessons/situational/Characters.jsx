import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Icons } from '../../Icons';

const CharacterLesson = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [revealed, setRevealed] = useState({});
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snap = await getDocs(collection(db, "characters"));
                const items = snap.docs.map(doc => doc.data());
                setCharacters(items.sort(() => 0.5 - Math.random()));
            } catch (error) {
                console.error("Error fetching characters:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || characters.length === 0) return <div className="p-10 text-center text-gray-400">Cargando personajes...</div>;

    const nextPerson = () => { 
        setRevealed({}); 
        if (index < characters.length - 1) {
            setIndex(index + 1); 
        } else {
            setIsComplete(true);
        }
    };

    if (isComplete) {
        return (
            <div className="text-center p-8 bg-gray-800 rounded-xl animate-fade-in">
                <h2 className="text-2xl font-bold text-green-400 mb-4">¡Lección Completada!</h2>
                <p className="text-gray-300">Has repasado todos los personajes.</p>
            </div>
        )
    }
    
    const person = characters[index];
    const toggleReveal = (key) => setRevealed(prev => ({ ...prev, [key]: !prev[key] }));
    
    const questions = [
        { id: 'name', q: '¿Cómo se llama?', a: `Se llama ${person.firstName}.`, icon: <Icons.User size={18}/> },
        { id: 'lastname', q: '¿Cómo se apellida?', a: `Se apellida ${person.lastName}.`, icon: <Icons.User size={18}/> },
        { id: 'age', q: '¿Cuántos años tiene?', a: `Tiene ${person.age} años.`, icon: <Icons.Calendar size={18}/> },
        { id: 'origin', q: '¿De dónde es?', a: `Es de ${person.origin}.`, icon: <Icons.MapPin size={18}/> },
        { id: 'nat', q: '¿Cuál es su nacionalidad?', a: `Es ${person.nationality}.`, icon: <Icons.Flag size={18}/> },
        { id: 'lang', q: '¿Qué idioma habla?', a: `Habla ${person.language}.`, icon: <Icons.MessageCircle size={18}/> },
    ];

    return (
        <div className="flex flex-col h-full max-w-md mx-auto p-4 pt-0">
            <div className="relative w-full aspect-video bg-gradient-to-br from-indigo-900 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 mb-6 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <div className="text-center animate-fade-in" key={person.id || index}>
                    <div className="text-6xl mb-2">{person.flag}</div>
                    <h2 className="text-3xl font-black text-white tracking-tight">{person.firstName} {person.lastName}</h2>
                    <p className="text-indigo-300 font-medium mt-1 uppercase tracking-widest text-sm">{person.job}</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pb-24 scrollbar-hide">
                {questions.map((item) => (
                    <div key={item.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                        <button onClick={() => toggleReveal(item.id)} className="w-full flex items-center justify-between p-4 text-left active:bg-gray-700 transition-colors">
                            <div className="flex items-center gap-3"><div className="text-pink-400">{item.icon}</div><span className="font-medium text-gray-200">{item.q}</span></div>
                            <Icons.ChevronDown size={16} className={`text-gray-500 transition-transform ${revealed[item.id] ? 'rotate-180' : ''}`} />
                        </button>
                        {revealed[item.id] && <div className="bg-gray-900/50 p-4 pt-0 border-t border-gray-700/50 text-indigo-300 font-semibold animate-in slide-in-from-top-2 duration-200"><div className="pt-3">{item.a}</div></div>}
                    </div>
                ))}
            </div>
            <div className="fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto">
                <button onClick={nextPerson} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2 active:scale-95 transition-all">
                    {index === characters.length - 1 ? "Terminar Lección" : "Siguiente Personaje"} <Icons.ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default CharacterLesson;