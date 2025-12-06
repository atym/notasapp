import { useState, useEffect } from 'react';

export const LessonQuiz = ({ onComplete, questionCount, pool }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [selected, setSelected] = useState(null); 
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        let p = [...pool].sort(() => 0.5 - Math.random());
        if (p.length > questionCount) p = p.slice(0, questionCount);
        setQuestions(p);
    }, [pool, questionCount]);

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-MX';
        utterance.rate = 0.8; 
        window.speechSynthesis.speak(utterance);
    };

    const handleMC = (opt) => { 
        if (selected) return; 
        setSelected(opt); 
        const q = questions[currentQ]; 
        const correct = opt === q.a;
        if (correct) {
            setScore(s => s+1);
            speak(q.a);
        } 
        
        const msg = correct 
            ? "¡Correcto! " + (q.exp || "")
            : "Incorrecto. " + (q.exp || `La respuesta correcta es: ${q.a}`);
        
        setFeedback({correct, text: msg});
        
        setTimeout(() => nextQ(), 3500); 
    };

    const nextQ = () => { 
        setSelected(null); 
        setFeedback(null); 
        if (currentQ < questions.length - 1) setCurrentQ(c => c+1); 
        else setFinished(true); 
    };

    if (questions.length === 0) return <div>Cargando...</div>;
    if (finished) return (
        <div className="p-6 text-center space-y-4">
            <div className="text-6xl animate-bounce">🎉</div>
            <h3 className="text-xl font-bold">¡Prueba Terminada!</h3>
            <p className="text-gray-300">Puntaje: {score} / {questions.length}</p>
            <button onClick={onComplete} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl">Volver a Lección</button>
        </div>
    );

    const q = questions[currentQ];
    return (
        <div className="space-y-4">
            <div className="flex justify-between text-xs text-gray-400 font-mono"><span>P: {currentQ + 1}/{questions.length}</span><span>Pts: {score}</span></div>
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 min-h-[100px] flex items-center justify-center text-center">
              {q.color && <div className={`w-12 h-12 rounded-lg mr-4 ${q.color}`}></div>}
              <p className="text-lg font-medium">{q.q}</p>
            </div>
            {q.type === 'mc' && (
                <div className="grid gap-2">{q.opts.map(opt => { 
                    let bg = "bg-gray-800 hover:bg-gray-700"; 
                    if (selected) { 
                        if (opt === q.a) bg = "bg-green-600 border-green-400"; 
                        else if (opt === selected) bg = "bg-red-600 border-red-400"; 
                        else bg = "opacity-40"; 
                    } 
                    return (<button key={opt} onClick={() => handleMC(opt)} className={`${bg} p-3 rounded-lg font-bold transition-all border border-gray-700 text-sm capitalize`}>{opt}</button>); 
                })}</div>
            )}
            {feedback && <div className={`p-4 rounded-xl text-center text-sm font-bold animate-fade-in border ${feedback.correct ? 'text-green-200 bg-green-900/40 border-green-500' : 'text-red-200 bg-red-900/40 border-red-500'}`}>{feedback.text}</div>}
        </div>
    );
};