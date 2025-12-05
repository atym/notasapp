import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect, useMemo } from 'react';
import { Icons } from './Icons';
import { LessonQuiz } from './LessonQuiz';
import { getSmartDistractors } from '../data';

// --- COMPONENTS ---
export const AlphabetLesson = ({ onComplete }) => {
    // 1. New State
    const [alphabet, setAlphabet] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Fetch from DB
    useEffect(() => {
        const fetchData = async () => {
            try {
                const snap = await getDocs(collection(db, "alphabet"));
                const items = snap.docs.map(doc => doc.data());
                
                // IMPORTANT: Sort alphabetically so A comes before B
                items.sort((a, b) => a.l.localeCompare(b.l));
                
                setAlphabet(items);
            } catch (error) {
                console.error("Error fetching alphabet:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if(loading) return <div className="p-10 text-center text-gray-400">Cargando alfabeto...</div>;

    return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-4">
            <div className="bg-gray-800 p-4 rounded-xl mb-4">
                <h3 className="font-bold text-lg mb-2">Claves de Pronunciación</h3>
                <ul className="text-sm text-gray-300 list-disc list-inside">
                    <li><b>H</b> es siempre silenciosa.</li>
                    <li><b>LL</b> suena como 'Y'.</li>
                    <li><b>Ñ</b> suena como 'ni' en 'onion'.</li>
                </ul>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
                {alphabet.map((item, idx) => (
                    <div key={idx} className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex justify-between items-center">
                        <span className="text-xl font-black text-purple-400 w-12">{item.l}</span>
                        <div className="text-right">
                            <span className="block text-white font-medium">{item.s}</span>
                            <span className="text-xs text-gray-500 italic">{item.tip}</span>
                        </div>
                    </div>
                ))}
            </div>
            
            <button onClick={onComplete} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Volver</button>
        </div>
    );
};

export const NumbersLesson = ({ onComplete }) => {
    // 1. New State
    const [numbers, setNumbers] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Fetch from DB
    useEffect(() => {
        const fetchData = async () => {
            try {
                const snap = await getDocs(collection(db, "numbers"));
                const items = snap.docs.map(doc => doc.data());
                
                // IMPORTANT: Sort numerically (convert string "10" to number 10)
                items.sort((a, b) => parseInt(a.n) - parseInt(b.n));
                
                setNumbers(items);
            } catch (error) {
                console.error("Error fetching numbers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-10 text-center text-gray-400">Cargando números...</div>;

    return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-4">
            <div className="grid grid-cols-2 gap-3">
                {numbers.map((item, idx) => (
                    <div key={idx} className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-400">{item.n}</span>
                        <span className="text-white capitalize">{item.s}</span>
                    </div>
                ))}
            </div>
            <button onClick={onComplete} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Volver</button>
        </div>
    );
};

export const InterviewLesson = ({ onComplete }) => {
    const QUESTIONS = [
        { topic: "Nombre", tu: "¿Cómo te llamas?", ud: "¿Cómo se llama?", ans: "Me llamo... / Soy..." },
        { topic: "Apellido", tu: "¿Cómo te apellidas?", ud: "¿Cómo se apellida?", ans: "Me apellido..." },
        { topic: "Nacionalidad", tu: "¿De dónde eres?", ud: "¿De dónde es?", ans: "Soy de... / Soy..." },
        { topic: "Edad", tu: "¿Cuántos años tienes?", ud: "¿Cuántos años tiene?", ans: "Tengo ___ años" },
        { topic: "Profesión", tu: "¿A qué te dedicas?", ud: "¿A qué se dedica?", ans: "Soy..." },
        { topic: "Lenguas", tu: "¿Qué idioma hablas?", ud: "¿Qué idioma habla?", ans: "Hablo..." },
        { topic: "Domicilio", tu: "¿Dónde vives?", ud: "¿Dónde vive?", ans: "Vivo en..." },
        { topic: "Lugar de Trabajo", tu: "¿Dónde trabajas?", ud: "¿Dónde trabaja?", ans: "Trabajo en..." },
        { topic: "Teléfono", tu: "¿Tienes número de teléfono?", ud: "¿Tiene número de teléfono?", ans: "Sí, es el... / No" },
        { topic: "Correo", tu: "¿Tienes correo electrónico?", ud: "¿Tiene correo electrónico?", ans: "Sí, es el... / No" }
    ];

    return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-6">
            <div className="bg-gray-800 border border-cyan-500/30 p-4 rounded-xl">
                <div className="flex justify-between items-end border-b border-gray-700 pb-2 mb-4">
                    <h3 className="font-bold text-cyan-400 text-lg">Entrevista</h3>
                    <span className="text-xs text-gray-400 italic">Tú (Informal) vs Usted (Formal)</span>
                </div>
                
                <div className="space-y-4">
                    {QUESTIONS.map((item, i) => (
                        <div key={i} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.topic}</span>
                                <span className="text-xs text-cyan-300 bg-cyan-900/30 px-2 py-0.5 rounded border border-cyan-500/20">{item.ans}</span>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex gap-3 text-sm">
                                    <span className="text-gray-500 w-6 font-bold text-right shrink-0">Tú:</span>
                                    <span className="text-white">{item.tu}</span>
                                </div>
                                <div className="flex gap-3 text-sm">
                                    <span className="text-indigo-400 w-6 font-bold text-right shrink-0">Ud:</span>
                                    <span className="text-indigo-100">{item.ud}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-800 border border-green-500/30 p-4 rounded-xl">
                <h3 className="font-bold text-green-400 mb-3 text-lg flex items-center gap-2"><Icons.MapPin size={18}/> Detalles de Vivir</h3>
                <div className="space-y-3">
                    <div className="p-3 bg-gray-900 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Cerca / Lejos</p>
                        <p className="text-white">Vivo <span className="text-green-400 font-bold">cerca del</span> parque.</p>
                        <p className="text-white">Vivo <span className="text-red-400 font-bold">lejos de</span> la oficina.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-900 p-2 rounded">
                            <span className="block text-gray-500 text-xs">Calle</span>
                            <span className="text-white">La calle...</span>
                        </div>
                        <div className="bg-gray-900 p-2 rounded">
                            <span className="block text-gray-500 text-xs">Barrio</span>
                            <span className="text-white">El barrio...</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 border border-purple-500/30 p-4 rounded-xl">
                <h3 className="font-bold text-purple-400 mb-3 text-lg">Correo Electrónico</h3>
                <div className="grid grid-cols-4 gap-2 text-center mb-3">
                    <div className="bg-gray-900 rounded p-2">
                        <div className="text-xl font-mono text-purple-400 mb-1">@</div>
                        <span className="text-[10px] text-gray-400 block leading-tight">arroba</span>
                    </div>
                    <div className="bg-gray-900 rounded p-2">
                        <div className="text-xl font-mono text-purple-400 mb-1">.</div>
                        <span className="text-[10px] text-gray-400 block leading-tight">punto</span>
                    </div>
                    <div className="bg-gray-900 rounded p-2">
                        <div className="text-xl font-mono text-purple-400 mb-1">_</div>
                        <span className="text-[10px] text-gray-400 block leading-tight">guion bajo</span>
                    </div>
                    <div className="bg-gray-900 rounded p-2">
                        <div className="text-xl font-mono text-purple-400 mb-1">-</div>
                        <span className="text-[10px] text-gray-400 block leading-tight">guion</span>
                    </div>
                </div>
                <div className="bg-gray-900 p-3 rounded text-center font-mono text-sm text-gray-300 break-all">
                    nombre<span className="text-purple-400">-</span>apellido<span className="text-purple-400">@</span>gmail<span className="text-purple-400">.</span>com
                </div>
            </div>

            <button onClick={onComplete} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-2xl shadow-lg">Volver</button>
        </div>
    );
};

export const ColorsLesson = ({ onComplete }) => {
    const [mode, setMode] = useState('learn');
    
    // 1. New State for Cloud Data
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Effect to Load Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "colors"));
                const items = querySnapshot.docs.map(doc => doc.data());
                const shuffled = items.sort(() => 0.5 - Math.random());
                setColors(shuffled);
            } catch (error) {
                console.error("Error fetching colors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 3. Quiz Pool (Using Cloud Data)
    const quizPool = useMemo(() => {
        if (colors.length === 0) return [];
        return colors.map(c => ({
            type: 'mc',
            q: `¿Qué color es ${c.emoji}?`,
            a: c.es,
            opts: [c.es, ...getSmartDistractors(c, colors, 2, 'es')].sort(()=>0.5-Math.random()),
            exp: `${c.emoji} es ${c.es} (${c.en})`
        }));
    }, [colors]);

    // 4. Helper Component (INSIDE ColorsLesson)
    const ColorCard = ({ c }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-24 cursor-pointer perspective-1000 group`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner ${flipped ? 'rotate-y-180' : ''}`}>
                    <div style={{backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden'}} className={`absolute inset-0 ${c.hex} rounded-2xl flex flex-col items-center justify-center shadow-lg ${flipped ? 'z-0' : 'z-10'}`}>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all rounded-2xl"></div>
                        <span className="relative font-black text-xl text-white drop-shadow-md z-10">{c.es}</span>
                    </div>
                    <div style={{backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden'}} className={`absolute inset-0 bg-gray-800 rounded-2xl border border-gray-600 flex flex-col items-center justify-center rotate-y-180 ${flipped ? 'z-10' : 'z-0'}`}>
                        <span className="font-bold text-lg text-white">{c.en}</span>
                    </div>
                </div>
            </div>
        );
    }; // <--- Make sure this is just closing ColorCard, NOT ColorsLesson

    // 5. Loading State
    if (loading) return <div className="p-10 text-center text-gray-400">Cargando colores...</div>;

    // 6. Quiz Mode
    if(mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;

    // 7. Main Render
    return (
        <div className="p-6 max-w-md mx-auto pb-24">
            <h2 className="text-2xl font-bold mb-4 text-white">Colores</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
                {colors.map((c, i) => (
                    <ColorCard key={i} c={c} />
                ))}
            </div>
            <button onClick={() => setMode('quiz')} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-2xl shadow-lg mb-4">Prueba de Colores</button>
            <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl">Volver</button>
        </div>
    );
}; // <--- This is where ColorsLesson actually ends

export const WeatherLesson = ({ onComplete }) => {
    const [mode, setMode] = useState('learn');
    const [weather, setWeather] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snap = await getDocs(collection(db, "weather"));
                const items = snap.docs.map(doc => doc.data());
                setWeather(items.sort(() => 0.5 - Math.random()));
            } catch (error) {
                console.error("Error fetching weather:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Helper to render the correct icon from the string name in DB
    const getIcon = (iconName) => {
        const IconComponent = Icons[iconName] || Icons.HelpCircle;
        return <IconComponent size={32} />;
    };

    const quizPool = useMemo(() => {
        if (weather.length === 0) return [];
        return weather.map(item => ({
             type: 'mc',
             q: `En inglés, "${item.name}" significa...`,
             a: item.desc,
             // FIX: Passing 'item' (object) instead of 'item.desc' (string)
             opts: [item.desc, ...getSmartDistractors(item, weather, 2, 'desc')].sort(() => 0.5 - Math.random()),
             exp: `${item.name} = ${item.desc}`
        }));
    }, [weather]);

    const WeatherCard = ({ item }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-28 cursor-pointer perspective-1000 group`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner ${flipped ? 'rotate-y-180' : ''}`}>
                    <div className="absolute inset-0 bg-gray-800 rounded-2xl border border-gray-700 flex flex-col items-center justify-center backface-hidden">
                        <div className="text-yellow-400 mb-2">{getIcon(item.icon)}</div>
                        <span className="font-bold text-sm mt-2 text-center px-1">{item.name}</span>
                    </div>
                    <div className="absolute inset-0 bg-orange-900/40 rounded-2xl border border-orange-500 flex flex-col items-center justify-center backface-hidden rotate-y-180">
                        <span className="font-bold text-sm text-orange-200 text-center px-1">{item.desc}</span>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) return <div className="p-10 text-center text-gray-400">Cargando clima...</div>;

    if (mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;

    return (
        <div className="p-6 max-w-md mx-auto pb-24">
             <div className="mb-6 bg-gray-800 p-4 rounded-xl border-l-4 border-indigo-500">
                <h3 className="font-bold text-white mb-2">Gramática:</h3>
                <p className="text-gray-400 text-sm"><b>Está</b>: Condición visual (nublado, soleado).</p>
                <p className="text-gray-400 text-sm"><b>Hace</b>: Sensación/Temperatura (calor, frío, viento).</p>
                <p className="text-gray-400 text-sm"><b>Hay</b>: Existencia (niebla, tormenta).</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">{weather.map((it, idx) => <WeatherCard key={idx} item={it} />)}</div>
            <button onClick={() => setMode('quiz')} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-2xl shadow-lg mb-4">Tomar Prueba</button>
            <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl">Volver</button>
        </div>
    );
};

export const CalendarLesson = ({ onComplete }) => {
    const [mode, setMode] = useState('learn');
    
    // 1. New State
    const [days, setDays] = useState([]);
    const [months, setMonths] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Fetch Helper
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Days
                const daySnap = await getDocs(collection(db, "days"));
                const dayItems = daySnap.docs.map(doc => doc.data());
                // Sort by the hidden 'order' field so Monday is first
                dayItems.sort((a, b) => a.order - b.order);
                setDays(dayItems);

                // Fetch Months
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

    // 3. Shuffle Function
    const handleShuffle = () => {
        // Create copies so we don't mutate state directly
        const shuffledDays = [...days].sort(() => 0.5 - Math.random());
        const shuffledMonths = [...months].sort(() => 0.5 - Math.random());
        setDays(shuffledDays);
        setMonths(shuffledMonths);
    };

    // 4. Dynamic Quiz Pool
    const quizPool = useMemo(() => {
        if (days.length === 0 || months.length === 0) return [];
        
        const dayQs = days.map(d => ({
            type: 'mc',
            q: `¿Qué día es "${d.es}"?`,
            a: d.en,
            opts: [d.en, ...getSmartDistractors(d, days)].sort(()=>0.5-Math.random()),
            exp: `${d.es} is ${d.en}`
        }));
        
        const monthQs = months.map(m => ({
            type: 'mc',
            q: `¿Qué mes es "${m.es}"?`,
            a: m.en,
            opts: [m.en, ...getSmartDistractors(m, months)].sort(()=>0.5-Math.random()),
            exp: `${m.es} is ${m.en}`
        }));
        
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

    // Helper to get today's date string (Client-side only)
    const dateStr = useMemo(() => {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return today.toLocaleDateString('es-ES', options);
    }, []);

    if(loading) return <div className="p-10 text-center text-gray-400">Cargando calendario...</div>;

    if(mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;

    return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-6">
            <div className="bg-gray-800 border border-green-500/30 p-4 rounded-xl text-center shadow-lg">
                <div className="text-xs text-green-400 font-bold uppercase tracking-wider mb-1">Fecha de hoy</div>
                <div className="text-xl font-bold text-white capitalize">{dateStr}</div>
            </div>

            <div className="flex gap-2">
                <button onClick={handleShuffle} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-lg text-sm border border-gray-600">
                    🔀 Mezclar
                </button>
                <button onClick={() => setMode('quiz')} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg text-sm shadow-lg">
                    Prueba
                </button>
            </div>

            <div>
                <h3 className="font-bold text-green-400 mb-3 uppercase tracking-wider">Días de la Semana</h3>
                <div className="grid grid-cols-1 gap-2">
                    {days.map((d, i) => <FlipCard key={i} front={d.es} back={d.en} colorBorder="border-green-500" />)}
                </div>
            </div>
            
            <div>
                <h3 className="font-bold text-blue-400 mb-3 uppercase tracking-wider">Meses del Año</h3>
                <div className="grid grid-cols-2 gap-2">
                    {months.map((m, i) => <FlipCard key={i} front={m.es} back={m.en} colorBorder="border-blue-500" />)}
                </div>
            </div>

            <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl">Volver</button>
        </div>
    );
};

export const IntroLesson = ({ onComplete }) => {
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
        { q: "¿Cómo se apellida?", a: "Se apellida...", l: "Last Name" },
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
        <div className="p-6 max-w-md mx-auto pb-24 space-y-6">
            <div className="flex gap-2 p-1 bg-gray-800 rounded-xl">
                <button onClick={() => setTab('first')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${tab === 'first' ? 'bg-pink-600 text-white' : 'text-gray-400 hover:text-white'}`}>Tú (Informal)</button>
                <button onClick={() => setTab('third')} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${tab === 'third' ? 'bg-pink-600 text-white' : 'text-gray-400 hover:text-white'}`}>Él/Ella/Usted</button>
            </div>
            
            <div className="space-y-3">
                {(tab === 'first' ? firstPerson : thirdPerson).map((item, i) => (
                    <div key={i} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold bg-gray-700 text-gray-300 px-2 py-1 rounded uppercase tracking-wide">{item.l}</span>
                        </div>
                        <p className="text-pink-400 font-bold mb-1 text-lg">{item.q}</p>
                        <div className="bg-gray-900/50 p-2 rounded text-white border-l-2 border-pink-600">{item.a}</div>
                    </div>
                ))}
            </div>

            <button onClick={() => setMode('quiz')} className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Tomar Prueba</button>
            <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl mt-2">Volver</button>
        </div>
    );
};

export const PronounsLesson = ({ onComplete }) => {
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
            <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl">Volver</button>
        </div>
    );
};

export const FeelingsLesson = ({ onComplete }) => {
    const [mode, setMode] = useState('learn');
    
    // 1. New State for TWO collections
    const [greetings, setGreetings] = useState([]);
    const [feelings, setFeelings] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Fetch Both from DB
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Greetings
                const greetSnap = await getDocs(collection(db, "greetings"));
                const greetItems = greetSnap.docs.map(doc => doc.data());
                setGreetings(greetItems.sort(() => 0.5 - Math.random()));

                // Fetch Feelings
                const feelSnap = await getDocs(collection(db, "feelings"));
                const feelItems = feelSnap.docs.map(doc => doc.data());
                setFeelings(feelItems.sort(() => 0.5 - Math.random()));

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 3. Helper Component
    const FlipCard = ({ item }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-24 cursor-pointer perspective-1000 group`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner ${flipped ? 'rotate-y-180' : ''}`}>
                    <div className="absolute inset-0 bg-gray-800 rounded-xl border border-gray-700 flex flex-col items-center justify-center backface-hidden">
                        <div className="text-3xl mb-1">{item.emoji}</div>
                        <span className="font-bold text-sm text-center px-1">{item.es}</span>
                    </div>
                    <div className="absolute inset-0 bg-yellow-900/40 rounded-xl border border-yellow-500 flex flex-col items-center justify-center backface-hidden rotate-y-180">
                        <span className="font-bold text-sm text-yellow-200 text-center px-1">{item.en}</span>
                    </div>
                </div>
            </div>
        );
    };
    
    // 4. Dynamic Quiz Pool (combines both lists!)
    const quizPool = useMemo(() => {
        if (feelings.length === 0 || greetings.length === 0) return [];
        
        const base = [
            { type: 'mc', q: "Por la mañana decimos...", a: "Buenos días", opts: ["Buenas noches", "Hola", "Buenos días"].sort(()=>0.5-Math.random()), exp: "'Buenos días' se usa en la mañana." }
        ];
        
        // Add dynamic questions from the DB data
        feelings.slice(0, 6).forEach(f => {
            const sentence = f.en.startsWith("I am") 
                ? `En español: "${f.en}" se dice...`
                : `¿Qué significa "${f.es}"?`;
            
            base.push({ 
                type: 'mc', 
                q: sentence, 
                a: f.es, 
                opts: [f.es, ...getSmartDistractors(f.es, feelings)].sort(()=>0.5-Math.random()), 
                exp: `${f.es} significa ${f.en}` 
            });
        });
        
        return base.sort(() => 0.5 - Math.random());
    }, [feelings, greetings]);

    if (loading) return <div className="p-10 text-center text-gray-400">Cargando emociones...</div>;

    if (mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;

    return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-6">
            <div>
                <h3 className="font-bold text-yellow-400 mb-3 uppercase tracking-wider">Saludos</h3>
                <div className="grid grid-cols-2 gap-3">
                    {greetings.map((g, i) => <FlipCard key={i} item={g} />)}
                </div>
            </div>
            
            <div>
                <h3 className="font-bold text-yellow-400 mb-3 uppercase tracking-wider">Sentimientos</h3>
                <div className="grid grid-cols-2 gap-3">
                    {feelings.map((f, i) => <FlipCard key={i} item={f} />)}
                </div>
            </div>

            <button onClick={() => setMode('quiz')} className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Prueba</button>
            <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl mt-2">Volver</button>
        </div>
    );
};

export const CharacterLesson = ({ onComplete }) => {
    // 1. State for data and loading
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 2. State for the slideshow logic
    const [index, setIndex] = useState(0);
    const [revealed, setRevealed] = useState({});

    // 3. Fetch and Shuffle from DB
    useEffect(() => {
        const fetchData = async () => {
            try {
                const snap = await getDocs(collection(db, "characters"));
                const items = snap.docs.map(doc => doc.data());
                // Shuffle them right away so it's different every time
                setCharacters(items.sort(() => 0.5 - Math.random()));
            } catch (error) {
                console.error("Error fetching characters:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 4. Loading State
    if (loading || characters.length === 0) return <div className="p-10 text-center text-gray-400">Cargando personajes...</div>;

    // 5. Current Person Logic (Same as before, just using the new state)
    const person = characters[index];
    const toggleReveal = (key) => setRevealed(prev => ({ ...prev, [key]: !prev[key] }));
    
    const nextPerson = () => { 
        setRevealed({}); 
        if (index < characters.length - 1) setIndex(index + 1); 
        else onComplete(); 
    };
    
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
                <div className="text-center animate-fade-in" key={person.id || index}> {/* Fallback to index if ID is missing */}
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
                <button onClick={nextPerson} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2 active:scale-95 transition-all">{index === characters.length - 1 ? "Terminar Lección" : "Siguiente Personaje"} <Icons.ChevronRight size={20} /></button>
            </div>
        </div>
    );
};

export const JobsLesson = ({ onComplete }) => {
    const [mode, setMode] = useState('learn');
    
    const [jobs, setJobs] = useState([]);
    const [places, setPlaces] = useState([]); // <--- New State
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Jobs
                const jobsSnap = await getDocs(collection(db, "jobs"));
                const jobsData = jobsSnap.docs.map(doc => doc.data());
                setJobs(jobsData);

                // Fetch Places (NEW)
                const placesSnap = await getDocs(collection(db, "places"));
                const placesData = placesSnap.docs.map(doc => doc.data());
                setPlaces(placesData);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const FlipCard = ({ job }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-20 cursor-pointer perspective-1000 group`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner ${flipped ? 'rotate-y-180' : ''}`}>
                    <div className="absolute inset-0 bg-gray-800 p-4 rounded-xl border border-gray-700 flex items-center justify-between backface-hidden">
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">{job.emoji}</div>
                            <div className="font-bold text-white text-base capitalize">{job.masc} <span className="text-gray-500 text-sm font-normal">/ {job.fem}</span></div>
                        </div>
                        <Icons.ChevronRight size={16} className="text-gray-600" />
                    </div>
                    <div className="absolute inset-0 bg-teal-900/40 p-4 rounded-xl border border-teal-500 flex items-center justify-center backface-hidden rotate-y-180">
                        <span className="font-bold text-teal-200 text-lg">{job.eng}</span>
                    </div>
                </div>
            </div>
        );
    };

    // Restored PlaceCard Component
    const PlaceCard = ({ place }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-16 cursor-pointer perspective-1000 group`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner ${flipped ? 'rotate-y-180' : ''}`}>
                    <div className="absolute inset-0 bg-gray-800 p-3 rounded-lg border border-gray-700 text-sm font-medium text-center flex items-center justify-center backface-hidden">
                        {place.es}
                    </div>
                    <div className="absolute inset-0 bg-teal-900/40 p-3 rounded-lg border border-teal-500 text-sm font-medium text-center flex items-center justify-center backface-hidden rotate-y-180 text-teal-200">
                        {place.en}
                    </div>
                </div>
            </div>
        );
    };

    const quizPool = useMemo(() => {
        if (jobs.length === 0) return [];
        const base = [
            { type: 'mc', q: "Alguien que apaga fuegos es un...", a: "Bombero", opts: ["Bombero", "Dentista", "Doctor"].sort(()=>0.5-Math.random()), exp: "Apagar fuegos = Bombero." }
        ];
        jobs.slice(0, 5).forEach(j => {
            base.push({ 
                type: 'mc', 
                q: `Trabaja como ${j.eng}. Es...`, 
                a: j.masc, 
                opts: [j.masc, ...getSmartDistractors(j, jobs, 2, 'masc')].sort(()=>0.5-Math.random()), 
                exp: `${j.masc} es la palabra para ${j.eng}` 
            });
        });
        return base;
    }, [jobs]);

    if (loading) return <div className="p-10 text-center text-gray-400">Cargando datos...</div>;

    if (mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;

    return (
        <div className="flex flex-col h-full max-w-md mx-auto p-4 pt-0 pb-20 overflow-y-auto scrollbar-hide">
            <div className="space-y-6">
                <div className="bg-teal-900/20 border border-teal-500/30 p-4 rounded-2xl">
                    <h3 className="font-bold text-teal-400 text-lg mb-2">Estructura</h3>
                    <p className="text-sm text-gray-300">Yo soy <b>un/una</b> [Profesión].</p>
                    <p className="text-sm text-gray-300">Yo trabajo en <b>[Lugar]</b>.</p>
                </div>
                
                <div className="space-y-3">
                    <h3 className="font-bold text-white ml-1">Profesiones</h3>
                    {jobs.map((job, i) => <FlipCard key={i} job={job} />)}
                </div>

                <div className="space-y-3">
                    <h3 className="font-bold text-white ml-1">Lugares de Trabajo</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {places.map((place, i) => <PlaceCard key={i} place={place} />)}
                    </div>
                </div>

                <button onClick={() => setMode('quiz')} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg">Prueba</button>
                <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl mt-2">Volver</button>
            </div>
        </div>
    );
};

export const NationalitiesLesson = ({ onComplete }) => {
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
            <button onClick={onComplete} className="mt-8 w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg">Completar</button>
        </div>
    );
};

export const ConjugationSection = ({ onComplete }) => {
    const [mode, setMode] = useState('list');
    const [selectedVerb, setSelectedVerb] = useState(null);
    
    // 1. New State
    const [conjugations, setConjugations] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Fetch from DB
    useEffect(() => {
        const fetchData = async () => {
            try {
                const snap = await getDocs(collection(db, "conjugations"));
                const items = snap.docs.map(doc => doc.data());
                // Sort roughly by verb name
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
    
    // 3. Dynamic Quiz Pool
    const quizPool = useMemo(() => {
        if (conjugations.length === 0) return [];
        // Generate simple quiz questions from the data
        const base = [
            { type: 'mc', q: "Yo ___ (Ser)", a: "Soy", opts: ["Soy", "Eres", "Es"].sort(()=>0.5-Math.random()), exp: "Yo soy." },
            { type: 'mc', q: "Tú ___ (Tener)", a: "Tienes", opts: ["Tengo", "Tienes", "Tiene"].sort(()=>0.5-Math.random()), exp: "Tú tienes." }
        ];
        
        // Add dynamic ones
        conjugations.slice(0, 5).forEach(verb => {
            if(verb.c && verb.c.length >= 3) {
                base.push({
                    type: 'mc',
                    q: `Ella ___ (${verb.v})`,
                    a: verb.c[2], // 3rd item is usually Él/Ella form
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
            <button onClick={() => setSelectedVerb(null)} className="flex items-center gap-2 text-cyan-400 mb-2"><Icons.ArrowLeft size={20}/> Volver</button>
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
                        <Icons.ChevronRight size={20} className="text-gray-600"/>
                    </button>
                ))}
            </div>
            <button onClick={() => setMode('quiz')} className="w-full bg-cyan-600 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Prueba</button>
            <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl">Volver</button>
        </div>
    );
};

export const VerbLesson = ({ onComplete }) => {
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
        <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl mt-2">Volver</button>
    </div>
    );
};