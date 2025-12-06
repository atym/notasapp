import { useState, useMemo } from 'react';
import { LessonQuiz } from '../quizzes/LessonQuiz';

const ToBeLesson = () => {
    const [mode, setMode] = useState('learn');
    const quizPool = useMemo(() => {
        return [
            { type: 'mc', q: "Para hablar de la hora, usamos...", a: "Ser", opts: ["Ser", "Estar", "Tener"].sort(()=>0.5-Math.random()), exp: "La hora es permanente/esencia (Son las 2)." },
            { type: 'mc', q: "Para hablar de ubicación, usamos...", a: "Estar", opts: ["Ser", "Estar", "Tener"].sort(()=>0.5-Math.random()), exp: "Ubicación = Estar (No matter how permanent)." },
            { type: 'mc', q: "Para decir la edad, usamos...", a: "Tener", opts: ["Ser", "Estar", "Tener"].sort(()=>0.5-Math.random()), exp: "En español, 'tienes' años." },
            { type: 'mc', q: "Yo ___ feliz hoy (emoción).", a: "Estoy", opts: ["Soy", "Estoy", "Tengo"].sort(()=>0.5-Math.random()), exp: "Emoción temporal = Estar." },
            { type: 'mc', q: "Nosotros ___ altos (descripción).", a: "Somos", opts: ["Somos", "Estamos", "Tenemos"].sort(()=>0.5-Math.random()), exp: "Descripción física = Ser." },
        ];
    }, []);

    if (mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={5} onComplete={() => setMode('learn')} /></div>;

    return (
    <div className="p-6 max-w-md mx-auto pb-24 space-y-6">
        <div className="bg-gray-800 p-4 rounded-xl border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-blue-400 text-xl">SER</h3>
                <span className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded">Permanente</span>
            </div>
            <p className="text-sm text-gray-300 mb-2 italic">"To be" (Esencia)</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-900 p-2 rounded border border-gray-700"><span className="text-blue-300 font-bold">D</span>escription</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-700"><span className="text-blue-300 font-bold">O</span>ccupation</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-700"><span className="text-blue-300 font-bold">C</span>haracteristic</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-700"><span className="text-blue-300 font-bold">T</span>ime/Date</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-700"><span className="text-blue-300 font-bold">O</span>rigin</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-700"><span className="text-blue-300 font-bold">R</span>elationship</div>
            </div>
            <p className="mt-3 text-xs text-center text-gray-400">Ej: "Soy alto", "Son las dos".</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl border-l-4 border-orange-500">
             <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-orange-400 text-xl">ESTAR</h3>
                <span className="text-xs bg-orange-900 text-orange-200 px-2 py-1 rounded">Temporal</span>
            </div>
            <p className="text-sm text-gray-300 mb-2 italic">"To be" (Estado)</p>
             <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-900 p-2 rounded border border-gray-700"><span className="text-orange-300 font-bold">P</span>osition</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-700"><span className="text-orange-300 font-bold">L</span>ocation</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-700"><span className="text-orange-300 font-bold">A</span>ction (-ing)</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-700"><span className="text-orange-300 font-bold">C</span>ondition</div>
                <div className="bg-gray-900 p-2 rounded border border-gray-700"><span className="text-orange-300 font-bold">E</span>motion</div>
            </div>
            <p className="mt-3 text-xs text-center text-gray-400">Ej: "Estoy triste", "Está en Madrid".</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl border-l-4 border-green-500">
             <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-green-400 text-xl">TENER</h3>
                <span className="text-xs bg-green-900 text-green-200 px-2 py-1 rounded">Posesión</span>
            </div>
            <p className="text-sm text-gray-300 mb-2 italic">"To have" (Usado en modismos)</p>
            <ul className="text-sm space-y-1 list-disc list-inside text-gray-300">
                <li>Edad ("Tengo 20 años")</li>
                <li>Hambre / Sed ("Tengo hambre")</li>
                <li>Calor / Frío ("Tengo calor")</li>
                <li>Miedo / Sueño</li>
            </ul>
        </div>
        
        <button onClick={() => setMode('quiz')} className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Prueba de Verbos</button>
    </div>
    );
};

export default ToBeLesson;