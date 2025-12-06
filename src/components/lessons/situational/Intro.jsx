import { useState, useMemo } from 'react';
import { LessonQuiz } from '../../LessonQuiz';

const IntroLesson = () => {
    const [mode, setMode] = useState('learn');
    const [tab, setTab] = useState('first'); 
    
    const firstPerson = [
        { q: "¿Cómo te llamas?", a: "Me llamo...", l: "Name" },
        { q: "¿Cómo te apellidas?", a: "Me apellido...", l: "Last Name" },
        { q: "¿De dónde eres?", a: "Soy de...", l: "Origin" },
        { q: "¿Cuántos años tienes?", a: "Tengo ... años.", l: "Age" },
        { q: "¿A qué te dedicas?", a: "Soy... / Trabajo...", l: "Job" },
        { q: "¿Qué idiomas hablas?", a: "Hablo...", l: "Language" },
        { q: "¿Dónde vives?", a: "Vivo en...", l: "Home" },
    ];

    const thirdPerson = [
        { q: "¿Cómo se llama?", a: "Se llama...", l: "Name" },
        { q: "¿Cómo se apellida?", a: "Se apellida...", l:"Last Name" },
        { q: "¿De dónde es?", a: "Es de...", l: "Origin" },
        { q: "¿Cuántos años tiene?", a: "Tiene ... años.", l: "Age" },
        { q: "¿A qué se dedica?", a: "Es... / Trabaja...", l: "Job" },
        { q: "¿Qué idiomas habla?", a: "Habla...", l: "Language" },
        { q: "¿Dónde vive?", a: "Vive en...", l: "Home" },
    ];

    const quizPool = useMemo(() => {
        const base = [
            { type: 'mc', q: "Pregunta: ¿Cómo te llamas? Respuesta: ___", a: "Me llamo...", opts: ["Me llamo...", "Tengo...", "Soy de..."].sort(()=>0.5-Math.random()), exp: "Para responder al nombre usamos 'Me llamo'." },
            { type: 'mc', q: "Pregunta: ¿De dónde eres? Respuesta: ___", a: "Soy de...", opts: ["Soy...", "Me llamo...", "Soy de..."].sort(()=>0.5-Math.random()), exp: "Origen requiere 'Soy de'." },
            { type: 'mc', q: "En tercera persona: Él ___ alto.", a: "Es", opts: ["Soy", "Eres", "Es"].sort(()=>0.5-Math.random()), exp: "'Es' es la conjugación para Él/Ella." },
            { type: 'mc', q: "Pregunta: ¿Cuántos años tienes? Respuesta: ___", a: "Tengo...", opts: ["Soy...", "Tengo...", "Estoy..."].sort(()=>0.5-Math.random()), exp: "En español, la edad se 'tiene' (Tener), no se 'es'." },
        ];
        return base;
    }, []);

    if(mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;

    return (
        <div className="p-6 max-w-4xl mx-auto pb-24 space-y-6">
            <div className="flex gap-2 p-1 bg-gray-800 rounded-xl max-w-sm mx-auto">
                <button onClick={() => setTab('first')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${tab === 'first' ? 'bg-pink-600 text-white' : 'text-gray-400 hover:text-white'}`}>Tú (Informal)</button>
                <button onClick={() => setTab('third')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${tab === 'third' ? 'bg-pink-600 text-white' : 'text-gray-400 hover:text-white'}`}>Él/Ella/Usted</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(tab === 'first' ? firstPerson : thirdPerson).map((item, i) => (
                    <div key={i} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold bg-gray-700 text-gray-300 px-2 py-1 rounded uppercase tracking-wide">{item.l}</span>
                        </div>
                        <p className="text-pink-400 font-bold mb-1 text-lg">{item.q}</p>
                        <div className="bg-ray-900/50 p-2 rounded text-white border-l-2 border-pink-600">{item.a}</div>
                    </div>
                ))}
            </div>

            <div className="max-w-md mx-auto">
                 <button onClick={() => setMode('quiz')} className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Tomar Prueba</button>
            </div>
        </div>
    );
};

export default IntroLesson;
