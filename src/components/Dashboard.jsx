import { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { AdminSeeder } from './AdminSeeder';
// NEW: Database imports
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const Dashboard = ({ onSelectLesson }) => {
    const [greeting, setGreeting] = useState("¡Hola! ¿Cómo estás?"); // Default

    // NEW: Fetch random phrase from DB
    useEffect(() => {
        const fetchGreeting = async () => {
            try {
                const snap = await getDocs(collection(db, "phrases"));
                if (!snap.empty) {
                    // Extract just the text from each document
                    const items = snap.docs.map(doc => doc.data().text);
                    // Pick a random one
                    const random = items[Math.floor(Math.random() * items.length)];
                    setGreeting(random);
                }
            } catch (error) {
                console.error("Error fetching greeting:", error);
            }
        };
        fetchGreeting();
    }, []);

    const lessons = [
        { id: 'alphabet', title: 'El Alfabeto', desc: 'Pronunciación y sonidos.', icon: <Icons.Type size={24} />, color: 'bg-purple-600' },
        { id: 'intro', title: 'Presentarse', desc: 'Nombre, edad, origen.', icon: <Icons.HeartHandshake size={24} />, color: 'bg-pink-500' },
        { id: 'interview', title: 'Entrevista', desc: 'Preguntas y Respuestas clave.', icon: <Icons.Mic size={24} />, color: 'bg-cyan-600' },
        { id: 'pronouns', title: 'Pronombres: Su/Se', desc: 'Su vs Se, Tu vs Te, Nos.', icon: <Icons.Users size={24} />, color: 'bg-indigo-500' },
        { id: 'feelings', title: 'Saludos y Sentimientos', desc: 'Hola, adiós y emociones.', icon: <Icons.SmilePlus size={24} />, color: 'bg-yellow-500' },
        { id: 'numbers', title: 'Los Números', desc: 'Contar del 0 al 1000.', icon: <Icons.Hash size={24} />, color: 'bg-blue-500' },
        { id: 'colors', title: 'Colores', desc: 'Rojo, Azul, Verde...', icon: <Icons.Palette size={24} />, color: 'bg-red-500' },
        { id: 'calendar', title: 'Días y Meses', desc: 'Calendario y fechas.', icon: <Icons.Clock size={24} />, color: 'bg-green-600' },
        { id: 'characters', title: 'Personajes Famosos', desc: 'Identifica nombre y origen.', icon: <Icons.Users size={24} />, color: 'bg-indigo-600' },
        { id: 'jobs', title: 'Profesiones y Lugares', desc: 'Trabajos y lugares.', icon: <Icons.BriefcaseMedical size={24} />, color: 'bg-teal-600' },
        { id: 'nationalities', title: 'Nacionalidades', desc: 'Países y plurales.', icon: <Icons.Flag size={24} />, color: 'bg-rose-600' },
        { id: 'verbs', title: 'Verbos: Ser/Estar/Tener', desc: 'Reglas y Usos.', icon: <Icons.BrainCircuit size={24} />, color: 'bg-emerald-600' },
        { id: 'conjugations', title: 'Conjugación de Verbos', desc: 'Tablas y Práctica.', icon: <Icons.ListChecks size={24} />, color: 'bg-cyan-600' },
        { id: 'weather', title: 'El Clima Completo', desc: 'Términos del tiempo.', icon: <Icons.Sun size={24} />, color: 'bg-orange-500' },
        { id: 'vocabmix', title: 'Vocabulario Mix', desc: 'Flashcards de todo.', icon: <Icons.BookA size={24} />, color: 'bg-pink-600' },
        { id: 'finalquiz', title: 'Examen Final', desc: '25 preguntas aleatorias.', icon: <Icons.Award size={24} />, color: 'bg-yellow-600' },
    ];

    return (
        <div className="p-6 max-w-md mx-auto space-y-6 pb-32">
            <AdminSeeder />
            <div className="space-y-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">Hola, estudiante</h1>
                <p className="text-gray-400">{greeting}</p>
            </div>
            <div className="grid gap-4">
                {lessons.map(l => (
                    <button key={l.id} onClick={() => onSelectLesson(l.id)} className="relative overflow-hidden group rounded-2xl bg-gray-800 p-1 text-left border border-gray-700">
                        <div className={`absolute top-0 right-0 p-3 opacity-20 ${l.color} blur-xl w-24 h-24 rounded-full -mr-10 -mt-10`}></div>
                        <div className="relative p-5 flex items-center justify-between">
                            <div className="space-y-2">
                                <div className={`w-10 h-10 rounded-lg ${l.color} flex items-center justify-center text-white shadow-lg`}>{l.icon}</div>
                                <div><h3 className="font-bold text-lg text-white">{l.title}</h3><p className="text-sm text-gray-400">{l.desc}</p></div>
                            </div>
                            <Icons.ChevronRight size={20} className="text-gray-600" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};