import { useState, useEffect, useMemo } from 'react';
import { Icons } from './Icons';
import { LessonQuiz } from './LessonQuiz';

// IMPORT ALL THE DATA HERE
import { 
    ALPHABET_DATA,
    NUMBER_DATA,
    CALENDAR_DATA,
    CHARACTERS,
    JOBS_DATA,
    PLACES_DATA,
    COUNTRIES_DATA,
    CONJUGATION_DATA,
    FEELINGS_DATA,   // This was the missing one causing your error!
    GREETINGS_DATA,
    COLORS_DATA,
    SPANISH_PHRASES,
    getSmartDistractors, // Make sure helpers are imported too
    getDistractors
} from '../data';

// --- COMPONENTS ---
export const AlphabetLesson = ({ onComplete }) => (
    <div className="p-6 max-w-md mx-auto pb-24 space-y-4">
        <div className="bg-gray-800 p-4 rounded-xl mb-4"><h3 className="font-bold text-lg mb-2">Claves de Pronunciación</h3><ul className="text-sm text-gray-300 list-disc list-inside"><li><b>H</b> es siempre silenciosa.</li><li><b>LL</b> suena como 'Y'.</li><li><b>Ñ</b> suena como 'ni' en 'onion'.</li></ul></div>
        <div className="grid grid-cols-1 gap-2">{ALPHABET_DATA.map((item, idx) => (<div key={idx} className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex justify-between items-center"><span className="text-xl font-black text-purple-400 w-12">{item.l}</span><div className="text-right"><span className="block text-white font-medium">{item.s}</span><span className="text-xs text-gray-500 italic">{item.tip}</span></div></div>))}</div>
        <button onClick={onComplete} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Volver</button>
    </div>
);

export const NumbersLesson = ({ onComplete }) => (
    <div className="p-6 max-w-md mx-auto pb-24 space-y-4">
        <div className="grid grid-cols-2 gap-3">{NUMBER_DATA.map((item, idx) => (<div key={idx} className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex justify-between items-center"><span className="text-xl font-bold text-blue-400">{item.n}</span><span className="text-white capitalize">{item.s}</span></div>))}</div>
        <button onClick={onComplete} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Volver</button>
    </div>
);

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
    const quizPool = useMemo(() => {
        return COLORS_DATA.map(c => ({
            type: 'mc',
            q: `¿Qué color es ${c.emoji}?`,
            a: c.es,
            opts: [c.es, ...getSmartDistractors(c.es, COLORS_DATA)].sort(()=>0.5-Math.random()),
            exp: `${c.emoji} es ${c.es} (${c.en})`
        }));
    }, []);

    const ColorCard = ({ c }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-24 cursor-pointer perspective-1000 group`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner ${flipped ? 'rotate-y-180' : ''}`}>
                    {/* Front: Spanish + Color */}
                    {/* z-index toggle: Front is z-10 normally, z-0 when flipped. */}
                    <div style={{backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden'}} className={`absolute inset-0 ${c.hex} rounded-2xl flex flex-col items-center justify-center shadow-lg ${flipped ? 'z-0' : 'z-10'}`}>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all rounded-2xl"></div>
                        <span className="relative font-black text-xl text-white drop-shadow-md z-10">{c.es}</span>
                    </div>
                    {/* Back: English */}
                    {/* z-index toggle: Back is z-0 normally, z-10 when flipped. */}
                    <div style={{backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden'}} className={`absolute inset-0 bg-gray-800 rounded-2xl border border-gray-600 flex flex-col items-center justify-center rotate-y-180 ${flipped ? 'z-10' : 'z-0'}`}>
                        <span className="font-bold text-lg text-white">{c.en}</span>
                    </div>
                </div>
            </div>
        );
    };

    if(mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;

    return (
        <div className="p-6 max-w-md mx-auto pb-24">
            <h2 className="text-2xl font-bold mb-4 text-white">Colores</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
                {COLORS_DATA.map((c, i) => (
                    <ColorCard key={i} c={c} />
                ))}
            </div>
            <button onClick={() => setMode('quiz')} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-2xl shadow-lg mb-4">Prueba de Colores</button>
            <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl">Volver</button>
        </div>
    );
};

export const WeatherLesson = ({ onComplete }) => {
     const [mode, setMode] = useState('learn');
     
     const items = [
        { name: 'Está soleado', desc: 'It is sunny', icon: <Icons.Sun className="text-yellow-400" size={32}/> },
        { name: 'Está nublado', desc: 'It is cloudy', icon: <Icons.Cloud className="text-gray-400" size={32}/> },
        { name: 'Está parcialmente nublado', desc: 'It is partly cloudy', icon: <Icons.Cloud className="text-gray-400/80" size={32}/> },
        { name: 'Está despejado', desc: 'It is clear', icon: <Icons.Sun className="text-orange-200" size={32}/> },
        { name: 'Está lloviendo', desc: 'It is raining', icon: <Icons.CloudRain className="text-blue-400" size={32}/> },
        { name: 'La lluvia', desc: 'The rain', icon: <Icons.CloudRain className="text-blue-300" size={32}/> },
        { name: 'Está nevando', desc: 'It is snowing', icon: <Icons.Snowflake className="text-white" size={32}/> },
        { name: 'La nieve', desc: 'The snow', icon: <Icons.Snowflake className="text-white/80" size={32}/> },
        { name: 'Hace calor', desc: 'It is hot', icon: <Icons.Thermometer className="text-red-500" size={32}/> },
        { name: 'Hace frío', desc: 'It is cold', icon: <Icons.Thermometer className="text-blue-500" size={32}/> },
        { name: 'Hace viento', desc: 'It is windy', icon: <Icons.Wind className="text-blue-200" size={32}/> },
        { name: 'Hace buen tiempo', desc: 'The weather is good', icon: <Icons.Smile className="text-green-400" size={32}/> },
        { name: 'Hace mal tiempo', desc: 'The weather is bad', icon: <Icons.Frown className="text-red-400" size={32}/> },
        // Extra words
        { name: 'La tormenta', desc: 'The storm', icon: <Icons.Zap className="text-purple-400" size={32}/> },
        { name: 'El relámpago', desc: 'The lightning', icon: <Icons.Zap className="text-yellow-200" size={32}/> },
        { name: 'Húmedo', desc: 'Humid', icon: <Icons.Cloud className="text-blue-200" size={32}/> },
        { name: 'Seco', desc: 'Dry', icon: <Icons.Sun className="text-orange-300" size={32}/> },
        { name: 'El arcoíris', desc: 'The rainbow', icon: <Icons.Smile className="text-pink-400" size={32}/> }
    ];

    const WeatherCard = ({ item }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-28 cursor-pointer perspective-1000 group ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner`}>
                    <div className="absolute inset-0 bg-gray-800 rounded-2xl border border-gray-700 flex flex-col items-center justify-center backface-hidden">
                        {item.icon}
                        <span className="font-bold text-sm mt-2 text-center px-1">{item.name}</span>
                    </div>
                    <div className="absolute inset-0 bg-orange-900/40 rounded-2xl border border-orange-500 flex flex-col items-center justify-center backface-hidden rotate-y-180">
                        <span className="font-bold text-sm text-orange-200 text-center px-1">{item.desc}</span>
                    </div>
                </div>
            </div>
        );
    };

    const quizPool = useMemo(() => {
        const base = items.map(item => ({
             type: 'mc',
             q: `En inglés, "${item.name}" significa...`,
             a: item.desc,
             opts: [item.desc, ...getSmartDistractors(item.desc, items)].sort(() => 0.5 - Math.random()),
             exp: `${item.name} = ${item.desc}`
        }));
        return base; // Using smart distractors directly
    }, []);

    if (mode === 'quiz') return (
        <div className="p-6 max-w-md mx-auto pb-24">
            <LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} />
        </div>
    );

    return (
        <div className="p-6 max-w-md mx-auto pb-24">
             <div className="mb-6 bg-gray-800 p-4 rounded-xl border-l-4 border-indigo-500">
                <h3 className="font-bold text-white mb-2">Gramática:</h3>
                <p className="text-gray-400 text-sm"><b>Está</b>: Condición visual (nublado, soleado).</p>
                <p className="text-gray-400 text-sm"><b>Hace</b>: Sensación/Temperatura (calor, frío, viento).</p>
                <p className="text-gray-400 text-sm"><b>Hay</b>: Existencia (niebla, tormenta).</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">{items.map((it, idx) => <WeatherCard key={idx} item={it} />)}</div>
            <button onClick={() => setMode('quiz')} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-2xl shadow-lg mb-4">Tomar Prueba</button>
            <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl">Volver</button>
        </div>
    );
};

export const CalendarLesson = ({ onComplete }) => {
    const [mode, setMode] = useState('learn');

    const dateStr = useMemo(() => {
        const today = new Date();
        const dayName = new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(today);
        const dayNum = today.getDate();
        const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(today);
        const year = today.getFullYear();
        // Manually construct to ensure "del" usage
        const str = `${dayName} ${dayNum} de ${month} del ${year}`;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }, []);

    const FlipCard = ({ front, back, colorBorder }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-14 cursor-pointer perspective-1000 group ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner`}>
                    <div className={`absolute inset-0 bg-gray-800 p-3 rounded-lg border-l-4 ${colorBorder} flex items-center justify-center backface-hidden`}><span className="text-white font-bold">{front}</span></div>
                    <div className={`absolute inset-0 bg-gray-700 p-3 rounded-lg border-l-4 ${colorBorder} flex items-center justify-center backface-hidden rotate-y-180`}><span className="text-gray-200">{back}</span></div>
                </div>
            </div>
        );
    };

    const quizPool = useMemo(() => {
        const dayQs = CALENDAR_DATA.days.map(d => ({
            type: 'mc',
            q: `¿Qué día es "${d.es}"?`,
            a: d.en,
            opts: [d.en, ...getSmartDistractors(d.en, CALENDAR_DATA.days)].sort(()=>0.5-Math.random()),
            exp: `${d.es} is ${d.en}`
        }));
        const monthQs = CALENDAR_DATA.months.map(m => ({
            type: 'mc',
            q: `¿Qué mes es "${m.es}"?`,
            a: m.en,
            opts: [m.en, ...getSmartDistractors(m.en, CALENDAR_DATA.months)].sort(()=>0.5-Math.random()),
            exp: `${m.es} is ${m.en}`
        }));
        return [...dayQs, ...monthQs].sort(() => 0.5 - Math.random());
    }, []);

    if (mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;

    return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-6">
            <div className="bg-gray-800 border border-green-500/30 p-4 rounded-xl text-center shadow-lg">
                <div className="text-xs text-green-400 font-bold uppercase tracking-wider mb-1">Fecha de hoy</div>
                <div className="text-xl font-bold text-white capitalize">{dateStr}</div>
            </div>

            <div><h3 className="font-bold text-green-400 mb-3 uppercase tracking-wider">Días de la Semana</h3><div className="grid grid-cols-1 gap-2">{CALENDAR_DATA.days.map((d, i) => <FlipCard key={i} front={d.es} back={d.en} colorBorder="border-green-500" />)}</div></div>
            <div><h3 className="font-bold text-green-400 mb-3 uppercase tracking-wider">Meses del Año</h3><div className="grid grid-cols-2 gap-2">{CALENDAR_DATA.months.map((m, i) => <FlipCard key={i} front={m.es} back={m.en} colorBorder="border-blue-500" />)}</div></div>
            <button onClick={() => setMode('quiz')} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Prueba de Calendario</button>
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
    const FlipCard = ({ item }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-24 cursor-pointer perspective-1000 group ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner`}>
                    <div className="absolute inset-0 bg-gray-800 rounded-xl border border-gray-700 flex flex-col items-center justify-center backface-hidden"><div className="text-3xl mb-1">{item.emoji}</div><span className="font-bold text-sm text-center px-1">{item.es}</span></div>
                    <div className="absolute inset-0 bg-yellow-900/40 rounded-xl border border-yellow-500 flex flex-col items-center justify-center backface-hidden rotate-y-180"><span className="font-bold text-sm text-yellow-200 text-center px-1">{item.en}</span></div>
                </div>
            </div>
        );
    };
    
    const quizPool = useMemo(() => {
        const base = [
            { type: 'mc', q: "Por la mañana decimos...", a: "Buenos días", opts: ["Buenas noches", "Hola", "Buenos días"].sort(()=>0.5-Math.random()), exp: "'Buenos días' se usa en la mañana." }
        ];
        // Add feelings questions with sentences context
        FEELINGS_DATA.slice(0, 5).forEach(f => {
            // Create simple sentences
            const sentence = f.en.startsWith("I am") 
                ? `En español: "${f.en}" se dice...`
                : `¿Qué significa "${f.es}"?`;
            
            base.push({ 
                type: 'mc', 
                q: sentence, 
                a: f.es, 
                opts: [f.es, ...getSmartDistractors(f.es, FEELINGS_DATA)].sort(()=>0.5-Math.random()), 
                exp: `${f.es} significa ${f.en}` 
            });
        });
        return base;
    }, []);

    if (mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;
    return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-6">
            <div><h3 className="font-bold text-yellow-400 mb-3 uppercase tracking-wider">Saludos</h3><div className="grid grid-cols-2 gap-3">{GREETINGS_DATA.map((g, i) => <FlipCard key={i} item={g} />)}</div></div>
            <div><h3 className="font-bold text-yellow-400 mb-3 uppercase tracking-wider">Sentimientos</h3><div className="grid grid-cols-2 gap-3">{FEELINGS_DATA.map((f, i) => <FlipCard key={i} item={f} />)}</div></div>
            <button onClick={() => setMode('quiz')} className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 rounded-2xl shadow-lg mt-4">Prueba</button>
            <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl mt-2">Volver</button>
        </div>
    );
};

export const CharacterLesson = ({ onComplete }) => {
    const [shuffledChars, setShuffledChars] = useState([]);
    const [index, setIndex] = useState(0);
    const [revealed, setRevealed] = useState({});

    useEffect(() => {
        setShuffledChars([...CHARACTERS].sort(() => 0.5 - Math.random()));
    }, []);

    if(shuffledChars.length === 0) return <div>Cargando...</div>;

    const person = shuffledChars[index];
    const toggleReveal = (key) => setRevealed(prev => ({ ...prev, [key]: !prev[key] }));
    const nextPerson = () => { setRevealed({}); if (index < shuffledChars.length - 1) setIndex(index + 1); else onComplete(); };
    
    // Updated questions list
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
                <div className="text-center animate-fade-in" key={person.id}>
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
                <button onClick={nextPerson} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2 active:scale-95 transition-all">{index === shuffledChars.length - 1 ? "Terminar Lección" : "Siguiente Personaje"} <Icons.ChevronRight size={20} /></button>
            </div>
        </div>
    );
};

export const JobsLesson = ({ onComplete }) => {
    const [mode, setMode] = useState('learn');
    const FlipCard = ({ job }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-20 cursor-pointer perspective-1000 group ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner`}>
                    <div className="absolute inset-0 bg-gray-800 p-4 rounded-xl border border-gray-700 flex items-center justify-between backface-hidden">
                        <div className="flex items-center gap-3"><div className="text-3xl">{job.emoji}</div><div className="font-bold text-white text-base capitalize">{job.masc} <span className="text-gray-500 text-sm font-normal">/ {job.fem}</span></div></div><Icons.ChevronRight size={16} className="text-gray-600" />
                    </div>
                    <div className="absolute inset-0 bg-teal-900/40 p-4 rounded-xl border border-teal-500 flex items-center justify-center backface-hidden rotate-y-180"><span className="font-bold text-teal-200 text-lg">{job.eng}</span></div>
                </div>
            </div>
        );
    };
    const PlaceCard = ({ place }) => {
        const [flipped, setFlipped] = useState(false);
        return (
            <div className={`relative h-16 cursor-pointer perspective-1000 group ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
                <div className={`w-full h-full relative preserve-3d flip-card-inner`}>
                    <div className="absolute inset-0 bg-gray-800 p-3 rounded-lg border border-gray-700 text-sm font-medium text-center flex items-center justify-center backface-hidden">{place.es}</div>
                    <div className="absolute inset-0 bg-teal-900/40 p-3 rounded-lg border border-teal-500 text-sm font-medium text-center flex items-center justify-center backface-hidden rotate-y-180 text-teal-200">{place.en}</div>
                </div>
            </div>
        );
    };

    const quizPool = useMemo(() => {
        const base = [
            { type: 'mc', q: "Alguien que apaga fuegos es un...", a: "Bombero", opts: ["Bombero", "Dentista", "Doctor"].sort(()=>0.5-Math.random()), exp: "Apagar fuegos = Bombero." }
        ];
        // Add more job sentences
        JOBS_DATA.slice(0, 5).forEach(j => {
            base.push({ 
                type: 'mc', 
                q: `Trabaja como ${j.eng}. Es...`, 
                a: j.masc, 
                opts: [j.masc, ...getSmartDistractors(j.masc, JOBS_DATA)].sort(()=>0.5-Math.random()), 
                exp: `${j.masc} es la palabra para ${j.eng}` 
            });
        });
        return base;
    }, []);

    if (mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;
    return (
        <div className="flex flex-col h-full max-w-md mx-auto p-4 pt-0 pb-20 overflow-y-auto scrollbar-hide">
            <div className="space-y-6">
                <div className="bg-teal-900/20 border border-teal-500/30 p-4 rounded-2xl"><h3 className="font-bold text-teal-400 text-lg mb-2">Estructura</h3><p className="text-sm text-gray-300">Yo soy <b>un/una</b> [Profesión].</p><p className="text-sm text-gray-300">Yo trabajo en <b>[Lugar]</b>.</p></div>
                <div className="space-y-3"><h3 className="font-bold text-white ml-1">Profesiones</h3>{JOBS_DATA.map((job, i) => <FlipCard key={i} job={job} />)}</div>
                <div className="space-y-3"><h3 className="font-bold text-white ml-1">Lugares de Trabajo</h3><div className="grid grid-cols-2 gap-3">{PLACES_DATA.map((place, i) => <PlaceCard key={i} place={place} />)}</div></div>
                <button onClick={() => setMode('quiz')} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg">Prueba</button>
                <button onClick={onComplete} className="w-full border border-gray-600 text-gray-400 font-bold py-3 rounded-2xl mt-2">Volver</button>
            </div>
        </div>
    );
};

export const NationalitiesLesson = ({ onComplete }) => {
    const [mode, setMode] = useState('list');
    const quizPool = useMemo(() => {
        const base = [
            { type: 'mc', q: "Plural de 'Chino'", a: "Chinos", opts: ["Chinos", "Chinas", "Chinoes"].sort(()=>0.5-Math.random()), exp: "Termina en vocal, agrega 's'." },
            { type: 'mc', q: "Ellas son de Francia. Son...", a: "Francesas", opts: ["Francesas", "Franceses", "Francés"].sort(()=>0.5-Math.random()), exp: "Femenino Plural." }
        ];
        return base;
    }, []);

    if(mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('list')} /></div>;
    return (
        <div className="flex flex-col h-full max-w-md mx-auto p-4 pt-8 pb-20 overflow-y-auto scrollbar-hide">
            <div className="flex gap-2 mb-6 p-1 bg-gray-800 rounded-xl"><button onClick={() => setMode('list')} className={`flex-1 py-2 rounded-lg font-bold text-sm ${mode === 'list' ? 'bg-rose-600' : ''}`}>Lista</button><button onClick={() => setMode('plural')} className={`flex-1 py-2 rounded-lg font-bold text-sm ${mode === 'plural' ? 'bg-rose-600' : ''}`}>Plural</button><button onClick={() => setMode('quiz')} className={`flex-1 py-2 rounded-lg font-bold text-sm ${mode === 'quiz' ? 'bg-rose-600' : ''}`}>Prueba</button></div>
            {mode === 'list' ? <div className="space-y-3">{COUNTRIES_DATA.map((item, i) => <div key={i} className="bg-gray-800 p-4 rounded-xl border border-gray-700"><div className="font-black text-lg text-white mb-2">{item.country}</div><div className="grid grid-cols-2 gap-4 text-sm"><div><span className="block text-gray-500 text-xs">Masculino</span><span className="text-rose-300">{item.natM}</span></div><div><span className="block text-gray-500 text-xs">Femenino</span><span className="text-rose-300">{item.natF}</span></div></div></div>)}</div> : <div className="space-y-4"><div className="bg-rose-900/20 border border-rose-500/30 p-4 rounded-2xl mb-4"><h3 className="font-bold text-rose-400 mb-2">Reglas de Plural</h3><ul className="list-disc list-inside text-sm text-gray-300"><li>Vocal: +<b>s</b></li><li>Consonante: +<b>es</b></li></ul></div>{COUNTRIES_DATA.map((item, i) => <div key={i} className="bg-gray-800 p-4 rounded-xl border border-gray-700 space-y-2"><div className="font-bold text-white border-b border-gray-700 pb-2 mb-2">{item.country}</div><div className="flex justify-between"><span className="text-gray-400">Ellos son...</span><span className="text-rose-400 font-bold">{item.natM}s</span></div><div className="flex justify-between"><span className="text-gray-400">Ellas son...</span><span className="text-rose-400 font-bold">{item.natF}s</span></div></div>)}</div>}
            <button onClick={onComplete} className="mt-8 w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg">Completar</button>
        </div>
    );
};

export const ConjugationSection = ({ onComplete }) => {
    const [mode, setMode] = useState('list');
    const [selectedVerb, setSelectedVerb] = useState(null);
    
    const quizPool = useMemo(() => {
        const base = [
            { type: 'mc', q: "Yo ___ (Ser)", a: "Soy", opts: ["Soy", "Eres", "Es"].sort(()=>0.5-Math.random()), exp: "Yo soy." },
            { type: 'mc', q: "Tú ___ (Tener)", a: "Tienes", opts: ["Tengo", "Tienes", "Tiene"].sort(()=>0.5-Math.random()), exp: "Tú tienes." },
            { type: 'mc', q: "Ella ___ (Estar)", a: "Está", opts: ["Estoy", "Está", "Estás"].sort(()=>0.5-Math.random()), exp: "Ella está." }
        ];
        return base;
    }, []);

    if (mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('list')} /></div>;
    if (selectedVerb) return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-4">
            <button onClick={() => setSelectedVerb(null)} className="flex items-center gap-2 text-cyan-400 mb-2"><Icons.ArrowLeft size={20}/> Volver</button>
            <h2 className="text-2xl font-bold text-white">{selectedVerb.v} <span className="text-gray-500 text-lg">({selectedVerb.t})</span></h2>
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700"><div className="divide-y divide-gray-700">{["Yo", "Tú", "Él/Ella", "Nosotros", "Ellos"].map((p, i) => <div key={i} className="grid grid-cols-2 p-3 text-sm"><span className="text-cyan-200">{p}</span><span className="font-bold">{selectedVerb.c[i]}</span></div>)}</div></div>
        </div>
    );
    return (
        <div className="p-6 max-w-md mx-auto pb-24 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Verbos</h2>
            <div className="grid grid-cols-1 gap-3">{CONJUGATION_DATA.map((v, i) => <button key={i} onClick={() => setSelectedVerb(v)} className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex justify-between items-center text-left hover:bg-gray-700"><div><span className="block font-bold text-lg text-white">{v.v}</span><span className="text-xs text-gray-400">{v.t}</span></div><Icons.ChevronRight size={20} className="text-gray-600"/></button>)}</div>
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