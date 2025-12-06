import { useState, useEffect, useMemo } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { LessonQuiz } from '../../LessonQuiz';
import { getSmartDistractors } from '../../../data';
import {
    FiSun, FiCloud, FiCloudRain, FiWind, FiThermometer, FiZap, FiHelpCircle 
} from 'react-icons/fi';

const iconMap = {
    Sun: FiSun,
    Cloud: FiCloud,
    CloudRain: FiCloudRain,
    Wind: FiWind,
    Thermometer: FiThermometer,
    Zap: FiZap,
    Snowflake: ()=><span>❄️</span> // Using emoji for Snowflake as it's not in Feather
};

const WeatherLesson = () => {
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
        const IconComponent = iconMap[iconName] || FiHelpCircle;
        return <IconComponent size={32} />;
    };

    const quizPool = useMemo(() => {
        if (weather.length === 0) return [];
        return weather.map(item => ({
             type: 'mc',
             q: `En inglés, "${item.name}" significa...`,
             a: item.desc,
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
        <div className="p-6 max-w-4xl mx-auto pb-24">
             <div className="mb-6 bg-gray-800 p-4 rounded-xl border-l-4 border-indigo-500">
                <h3 className="font-bold text-white mb-2">Gramática:</h3>
                <p className="text-gray-400 text-sm"><b>Está</b>: Condición visual (nublado, soleado).</p>
                <p className="text-gray-400 text-sm"><b>Hace</b>: Sensación/Temperatura (calor, frío, viento).</p>
                <p className="text-gray-400 text-sm"><b>Hay</b>: Existencia (niebla, tormenta).</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">{weather.map((it, idx) => <WeatherCard key={idx} item={it} />)}</div>
            <button onClick={() => setMode('quiz')} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-2xl shadow-lg mb-4">Tomar Prueba</button>
        </div>
    );
};

export { WeatherLesson };