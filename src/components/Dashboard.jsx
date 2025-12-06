import { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const Dashboard = ({ onSelectLesson }) => {
    const [greeting, setGreeting] = useState("¡Hola! ¿Cómo estás?");

    useEffect(() => {
        const fetchGreeting = async () => {
            try {
                const snap = await getDocs(collection(db, "phrases"));
                if (!snap.empty) {
                    const items = snap.docs.map(doc => doc.data().text);
                    setGreeting(items[Math.floor(Math.random() * items.length)]);
                }
            } catch (error) {
                console.error("Error fetching greeting:", error);
            }
        };
        fetchGreeting();
    }, []);

    const categories = [
        {
            title: "Vocabulario Básico",
            color: "text-purple-400",
            lessons: [
                { id: 'alphabet', title: 'Alfabeto', icon: <Icons.Type />, color: 'bg-purple-600' },
                { id: 'vocales', title: 'Vocales', icon: <Icons.Type />, color: 'bg-pink-500' }, 
                { id: 'numbers', title: 'Números', icon: <Icons.Hash />, color: 'bg-blue-500' },
                { id: 'colors', title: 'Colores', icon: <Icons.Palette />, color: 'bg-red-500' },
                { id: 'calendar', title: 'Calendario', icon: <Icons.Clock />, color: 'bg-green-600' },
                { id: 'weather', title: 'El Clima', icon: <Icons.Sun />, color: 'bg-orange-500' },
            ]
        },
        {
            title: "Gramática",
            color: "text-indigo-400",
            lessons: [
                { id: 'pronouns', title: 'Pronombres', icon: <Icons.Users />, color: 'bg-indigo-500' },
                { id: 'verbs', title: 'Ser/Estar', icon: <Icons.BrainCircuit />, color: 'bg-emerald-600' },
                { id: 'conjugations', title: 'Conjugación', icon: <Icons.ListChecks />, color: 'bg-cyan-600' },
            ]
        },
        {
            title: "Situacional",
            color: "text-pink-400",
            lessons: [
                { id: 'intro', title: 'Presentarse', icon: <Icons.HeartHandshake />, color: 'bg-pink-500' },
                { id: 'interview', title: 'Entrevista', icon: <Icons.Mic />, color: 'bg-cyan-600' },
                { id: 'feelings', title: 'Saludos', icon: <Icons.SmilePlus />, color: 'bg-yellow-500' },
                { id: 'jobs', title: 'Profesiones', icon: <Icons.BriefcaseMedical />, color: 'bg-teal-600' },
                { id: 'nationalities', title: 'Países', icon: <Icons.Flag />, color: 'bg-rose-600' },
                { id: 'characters', title: 'Famosos', icon: <Icons.User />, color: 'bg-indigo-600' },
            ]
        },
        {
            title: "Pruebas",
            color: "text-yellow-400",
            lessons: [
                { id: 'vocabmix', title: 'Vocab Mix', icon: <Icons.BookA />, color: 'bg-pink-600' },
                { id: 'finalquiz', title: 'Examen Final', icon: <Icons.Award />, color: 'bg-yellow-600' },
            ]
        }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 pb-32 relative">
            
            {/* Header */}
            <div className="space-y-1 relative z-20"> 
                <div className="flex justify-between items-end">
                    <h1 className="text-3xl font-black bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                        Hola, estudiante
                    </h1>
                </div>
                <p className="text-gray-400 text-sm font-medium">{greeting}</p>
            </div>

            {/* Categories */}
            <div className="space-y-8 relative z-10">
                {categories.map((cat, idx) => (
                    <div key={idx} className="space-y-3">
                        <h3 className={`text-xs font-bold uppercase tracking-widest ${cat.color} ml-1`}>
                            {cat.title}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {cat.lessons.map(l => (
                                <button 
                                    key={l.id} 
                                    onClick={() => onSelectLesson(l.id)} 
                                    className="bg-gray-800 p-3 rounded-2xl border border-gray-700/50 hover:border-gray-500 hover:bg-gray-750 transition-all text-left group relative overflow-hidden flex flex-col justify-between min-h-[100px]"
                                >
                                    {/* Abstract shape background */}
                                    <div className={`absolute top-0 right-0 p-2 opacity-10 ${l.color} blur-xl w-16 h-16 rounded-full -mr-4 -mt-4 group-hover:opacity-20 transition-opacity pointer-events-none`}></div>
                                    
                                    <div className="relative z-10">
                                        <div className={`w-8 h-8 rounded-lg ${l.color} flex items-center justify-center text-white shadow-md mb-2 shrink-0`}>
                                            {l.icon} 
                                        </div>
                                    </div>
                                    <span className="font-bold text-gray-200 text-sm relative z-10">{l.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom-of-scroll Admin Button */}
            <div className="flex justify-center mt-8 opacity-20 hover:opacity-100 transition-opacity">
                <button 
                    onClick={() => onSelectLesson('admin')} 
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 hover:bg-gray-800 text-xs text-gray-500 transition-colors"
                >
                    <Icons.Briefcase size={14} />
                    <span>Panel de Control</span>
                </button>
            </div>
        </div>
    );
};