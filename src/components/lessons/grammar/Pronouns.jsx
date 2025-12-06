import React, { useState, useMemo } from 'react';
import { LessonQuiz } from '../../LessonQuiz';

const PronounsLesson = () => {
    const [mode, setMode] = useState('learn');
    const quizPool = useMemo(() => {
        const base = [
            { type: 'mc', q: "Este es TU libro. (Informal)", a: "Tu libro", opts: ["Tu libro", "Tú libro", "Te libro"].sort(()=>0.5-Math.random()), exp: "'Tu' sin tilde es posesivo (Your)." },
            { type: 'mc', q: "¿Cómo TE llamas? (Reflexivo)", a: "Te llamas", opts: ["Te llamas", "Tu llamas", "Se llama"].sort(()=>0.5-Math.random()), exp: "'Te' es el pronombre reflexivo para Tú." },
            { type: 'mc', q: "Él SE llama Juan.", a: "Se llama Juan", opts: ["Su llama Juan", "Se llama Juan", "Él llama Juan"].sort(()=>0.5-Math.random()), exp: "'Se' es reflexivo para Él/Ella." },
            { type: 'mc', q: "Esta es SU casa. (De él)", a: "Su casa", opts: ["Su casa", "Se casa", "Él casa"].sort(()=>0.5-Math.random()), exp: "'Su' es el posesivo para Él/Ella." },
            { type: 'mc', q: "NUESTRA casa.", a: "Nuestra casa", opts: ["Nuestra casa", "Nos casa", "Nosotros casa"].sort(()=>0.5-Math.random()), exp: "'Nuestra' es el posesivo femenino." },
        ];
        return base;
    }, []);

    if (mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;

    return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-6">
            <div className="bg-indigo-900/30 border border-indigo-500/30 p-4 rounded-2xl">
                <h3 className="font-bold text-indigo-300 mb-2 text-lg">Guía Rápida</h3>
                <p className="mb-4 text-sm text-gray-300">Diferencias clave entre pronombres similares.</p>
                
                <div className="space-y-4">
                    <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
                        <h4 className="font-bold text-white border-b border-gray-600 pb-1 mb-2">1. Personas (Sujeto)</h4>
                        <div className="flex flex-col gap-1 text-xs text-center">
                            <div className="grid grid-cols-3 gap-1">
                                <div className="bg-gray-700 p-1 rounded">Yo</div>
                                <div className="bg-gray-700 p-1 rounded">Tú</div>
                                <div className="bg-gray-700 p-1 rounded">Él/Ella</div>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                                <div className="bg-gray-700 p-1 rounded text-green-300 font-bold">Nosotros</div>
                                <div className="bg-gray-700 p-1 rounded">Ellos</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
                        <h4 className="font-bold text-pink-400 border-b border-gray-600 pb-1 mb-2">2. Reflexivos (Acción a uno mismo)</h4>
                        <div className="flex flex-col gap-1 text-xs text-center">
                            <div className="grid grid-cols-3 gap-1">
                                <div className="bg-gray-900 p-1 rounded border border-pink-900">Me<br/><span className="text-[10px] text-gray-500">Myself</span></div>
                                <div className="bg-gray-900 p-1 rounded border border-pink-900">Te<br/><span className="text-[10px] text-gray-500">Yourself</span></div>
                                <div className="bg-gray-900 p-1 rounded border border-pink-900">Se<br/><span className="text-[10px] text-gray-500">Himself</span></div>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                                <div className="bg-gray-900 p-1 rounded border border-green-500/50 text-green-300 font-bold">Nos<br/><span className="text-[10px] text-gray-500">Ourselves</span></div>
                                <div className="bg-gray-900 p-1 rounded border border-pink-900">Se<br/><span className="text-[10px] text-gray-500">Themselves</span></div>
                            </div>
                        </div>
                        <div className="mt-2 text-xs italic text-center text-gray-400">Ej: "Nos llamamos" (We call ourselves)</div>
                    </div>

                    <div className="bg-gray-800 p-3 rounded-xl border border-gray-700">
                        <h4 className="font-bold text-yellow-400 border-b border-gray-600 pb-1 mb-2">3. Posesivos (Propiedad)</h4>
                        <div className="flex flex-col gap-1 text-xs text-center">
                            <div className="grid grid-cols-3 gap-1">
                                <div className="bg-gray-900 p-1 rounded border border-yellow-900">Mi<br/><span className="text-[10px] text-gray-500">My</span></div>
                                <div className="bg-gray-900 p-1 rounded border border-yellow-900">Tu<br/><span className="text-[10px] text-gray-500">Your</span></div>
                                <div className="bg-gray-900 p-1 rounded border border-yellow-900">Su<br/><span className="text-[10px] text-gray-500">His/Her</span></div>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                                <div className="bg-gray-900 p-1 rounded border border-green-500/50 text-green-300 font-bold">Nuestro<br/><span className="text-[10px] text-gray-500">Our</span></div>
                                <div className="bg-gray-900 p-1 rounded border border-yellow-900">Su<br/><span className="text-[10px] text-gray-500">Their</span></div>
                            </div>
                        </div>
                        <div className="mt-2 text-xs italic text-center text-gray-400">Ej: "Nuestro gato" (Our cat)</div>
                    </div>
                </div>
            </div>

            <button onClick={() => setMode('quiz')} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg">Prueba</button>
        </div>
    );
};

export default PronounsLesson;
