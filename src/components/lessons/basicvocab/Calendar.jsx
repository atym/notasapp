
import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getSmartDistractors } from '../../../data';
import { LessonQuiz } from '../quizzes/LessonQuiz';
import { Shuffle, Zap, HelpCircle, Volume2 } from 'lucide-react';

const CalendarLesson = () => {
    const [mode, setMode] = useState('learn');
    const [days, setDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const daySnap = await getDocs(collection(db, "days"));
                const dayItems = daySnap.docs.map(doc => doc.data());
                dayItems.sort((a, b) => a.order - b.order);
                setDays(dayItems);

                const monthSnap = await getDocs(collection(db, "months"));
                const monthItems = monthSnap.docs.map(doc => doc.data());
                monthItems.sort((a, b) => a.order - b.order);
                setMonths(monthItems);

            } catch (error) {
                console.error("Error fetching calendar:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-MX';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const speakDate = (date) => {
        // Use toLocaleDateString to get timezone-correct day and month names
        const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' });
        const monthName = date.toLocaleDateString('es-ES', { month: 'long' });
        const dayNumber = date.getDate();
        
        // Construct the final string and speak it
        const dateString = `${dayName}, ${dayNumber} de ${monthName}`;
        speak(dateString);
    };

    const handleRandomSpeak = () => {
        // Generate a random valid date
        const year = new Date().getFullYear();
        const month = Math.floor(Math.random() * 12); // 0-11
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const day = Math.floor(Math.random() * daysInMonth) + 1;
        const randomDate = new Date(year, month, day);
        speakDate(randomDate);
    };

    const handleShuffle = () => {
        const shuffledDays = [...days].sort(() => 0.5 - Math.random());
        const shuffledMonths = [...months].sort(() => 0.5 - Math.random());
        setDays(shuffledDays);
        setMonths(shuffledMonths);
    };

    const quizPool = useMemo(() => {
        if (days.length === 0 || months.length === 0) return [];
        const dayQs = days.map(d => ({ type: 'mc', q: `¿Qué día es "${d.es}"?`, a: d.en, opts: [d.en, ...getSmartDistractors(d, days)].sort(()=>0.5-Math.random()), exp: `${d.es} is ${d.en}` }));
        const monthQs = months.map(m => ({ type: 'mc', q: `¿Qué mes es "${m.es}"?`, a: m.en, opts: [m.en, ...getSmartDistractors(m, months)].sort(()=>0.5-Math.random()), exp: `${m.es} is ${m.en}` }));
        return [...dayQs, ...monthQs].sort(() => 0.5 - Math.random());
    }, [days, months]);

    const FlipCard = ({ front, back, colorBorder }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-14 cursor-pointer perspective-1000 group`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner ${flipped ? 'rotate-y-180' : ''}`}>
                    <div style={{backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden'}} className={`absolute inset-0 bg-gray-800 p-3 rounded-lg border-l-4 ${colorBorder} flex items-center justify-center backface-hidden shadow-lg`}>
                        <span className="text-white font-bold">{front}</span>
                    </div>
                    <div style={{backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden'}} className={`absolute inset-0 bg-gray-700 p-3 rounded-lg border-l-4 ${colorBorder} flex items-center justify-center backface-hidden rotate-y-180 shadow-lg`}>
                        <span className="text-gray-200">{back}</span>
                    </div>
                </div>
            </div>
        );
    };

    const today = useMemo(() => new Date(), []);
    const dateStr = useMemo(() => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return today.toLocaleDateString('es-ES', options);
    }, [today]);

    if(loading) return <div className="p-10 text-center text-gray-400">Cargando calendario...</div>;

    if(mode === 'quiz') return <div className="px-2 py-6 sm:px-6 max-w-4xl mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;

    return (
        <div className="px-2 py-6 sm:px-6 max-w-4xl mx-auto pb-24 space-y-6">
            <div className="bg-gray-800 border border-green-500/30 p-3 rounded-xl text-center shadow-lg">
                <div className="text-xs text-green-400 font-bold uppercase tracking-wider mb-1">Fecha de hoy</div>
                <div className="flex items-center justify-center gap-3">
                    <div className="text-xl font-bold text-white capitalize">{dateStr}</div>
                    <button onClick={() => speakDate(today)} className="text-gray-400 hover:text-white transition-colors">
                        <Volume2 size={20} />
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <button
                    onClick={handleRandomSpeak}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all font-medium text-sm">
                    <Zap size={16} />
                    Fecha al Azar
                </button>
                 <button
                    onClick={() => setMode('quiz')}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20 transition-all font-medium text-sm">
                    <HelpCircle size={16} />
                    Empezar Prueba
                </button>
                <button
                    onClick={handleShuffle}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-500/30 bg-gray-500/10 text-gray-300 hover:bg-gray-500/20 transition-all font-medium text-sm">
                    <Shuffle size={16} />
                    Mezclar Tarjetas
                </button>
            </div>

            <div>
                <h3 className="font-bold text-green-400 mb-3 uppercase tracking-wider">Días de la Semana</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {days.map((d, i) => <FlipCard key={i} front={d.es} back={d.en} colorBorder="border-green-500" />)}
                </div>
            </div>
            
            <div>
                <h3 className="font-bold text-blue-400 mb-3 uppercase tracking-wider">Meses del Año</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {months.map((m, i) => <FlipCard key={i} front={m.es} back={m.en} colorBorder="border-blue-500" />)}
                </div>
            </div>
        </div>
    );
};
export default CalendarLesson;
