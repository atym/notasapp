import { useState, useEffect, useMemo } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { LessonQuiz } from '../quizzes/LessonQuiz';
import { getSmartDistractors } from '../../../data';
import {
    Sun,
    Cloud,
    CloudRain,
    Wind,
    Thermometer,
    Zap,
    HelpCircle,
    Snowflake,
    Cloudy,
    CloudFog,
    CloudLightning,
    CloudHail,
    Tornado,
    Newspaper,
    CloudRainWind,
    Sunrise,
    CloudDrizzle,
    BookOpen,
    Info
} from 'lucide-react';

const iconMap = {
    Sun,
    Cloud,
    CloudRain,
    Wind,
    Thermometer,
    Zap,
    Snowflake,
    Cloudy,
    CloudFog,
    CloudLightning,
    CloudHail,
    Tornado,
    Newspaper,
    CloudRainWind,
    Sunrise,
    CloudDrizzle,
    HelpCircle
};

const WeatherLesson = () => {
    const [mode, setMode] = useState('learn');
    const [weather, setWeather] = useState([]);
    const [bonusWeather, setBonusWeather] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snap = await getDocs(collection(db, "weather"));
                const allItems = snap.docs.map(doc => doc.data());
                
                const bonusTerms = ["¿Qué tiempo hace?", "Está lloviendo a cántaros"];
                const regularItems = allItems.filter(item => !bonusTerms.includes(item.name));
                const bonusItems = allItems.filter(item => bonusTerms.includes(item.name));

                setWeather(regularItems.sort(() => 0.5 - Math.random()));
                setBonusWeather(bonusItems);

            } catch (error) {
                console.error("Error fetching weather:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getIcon = (iconName) => {
        const IconComponent = iconMap[iconName] || HelpCircle;
        return <IconComponent size={32} />;
    };

    // The quiz pool is now created only from the main 'weather' items,
    // excluding the bonus cards which have Spanish explanations instead of English translations.
    const quizPool = useMemo(() => {
        if (weather.length === 0) return [];
        return weather.map(item => ({
             type: 'mc',
             q: `En inglés, \"${item.name}\" significa...`,
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

    const BonusCard = ({ item }) => {
        const descriptions = {
            "¿Qué tiempo hace?": "Esta es la forma más común de preguntar sobre el tiempo.",
            "Está lloviendo a cántaros": "Una expresión idiomática que significa que está lloviendo muy fuerte."
        };
    
        const categories = {
            "Key Question": "Pregunta Clave",
            "Idiom": "Modismo"
        };
    
        const description = descriptions[item.name] || item.desc;
        const category = categories[item.category] || item.category;
    
        return (
            <div className="bg-gray-800 border border-cyan-500/30 p-4 rounded-xl h-full flex flex-col">
                 <div className="flex items-start gap-4">
                    <div className="text-cyan-400 mt-1">{getIcon(item.icon)}</div>
                    <div>
                        <h4 className="font-bold text-white">{item.name}</h4>
                        <p className="text-gray-300 text-sm mb-2">{description}</p>
                    </div>
                </div>
                <div className="mt-auto text-right">
                     <span className="text-xs text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded border border-cyan-800">{category}</span>
                </div>
            </div>
        );
    };

    if (loading) return <div className="p-10 text-center text-gray-400">Cargando clima...</div>;

    if (mode === 'quiz') return <div className="p-6 max-w-md mx-auto pb-24"><LessonQuiz pool={quizPool} questionCount={10} onComplete={() => setMode('learn')} /></div>;

    return (
        <div className="p-6 max-w-4xl mx-auto pb-24">
            <button
                onClick={() => setMode('quiz')}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20 transition-all font-medium text-sm mb-6">
                <HelpCircle size={16} />
                Tomar Prueba
            </button>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                {weather.map((it, idx) => <WeatherCard key={idx} item={it} />)}
            </div>

            <div className="mt-8">
                <h3 className="font-bold text-lg text-cyan-400 mb-4 border-b border-gray-700 pb-2">Vocabulario Adicional</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    {bonusWeather.map((item, idx) => <BonusCard key={idx} item={item} />)}
                </div>
            </div>

            <div className="mt-8 pt-4 space-y-6">
                <div className="bg-gray-800 border border-indigo-500/30 p-4 rounded-xl">
                    <h3 className="font-bold text-indigo-400 mb-3 text-lg flex items-center gap-2"><Info size={18}/> El Clima vs. El Tiempo</h3>
                    <div className="space-y-3 text-sm">
                        <div className="bg-gray-900/50 p-3 rounded-lg border-l-4 border-indigo-400">
                            <h4 className="font-bold text-indigo-300 mb-1">El Tiempo</h4>
                            <p className="text-gray-300">Se refiere a las condiciones atmosféricas actuales o de corto plazo. <br/>Ej: <span className="italic text-white">\"El tiempo hoy está soleado.\"</span></p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg border-l-4 border-cyan-500">
                            <h4 className="font-bold text-cyan-400 mb-1">El Clima</h4>
                            <p className="text-gray-300">Describe los patrones meteorológicos promedio de una región a lo largo del tiempo. <br/>Ej: <span className="italic text-white">\"El clima en el caribe es tropical.\"</span></p>
                        </div>
                         <p className="text-xs text-gray-500 mt-4 italic text-center">Recuerda: <span className="font-bold text-white">El Clima</span> es masculino.</p>
                    </div>
                </div>

                <div className="bg-gray-800 border border-green-500/30 p-4 rounded-xl">
                     <h3 className="font-bold text-green-400 mb-3 text-lg flex items-center gap-2"><BookOpen size={18}/> Reglas Gramaticales</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <h4 className="font-bold text-green-400 mb-1">Hace...</h4>
                            <p className="text-gray-300">Para sensaciones y temperatura. <br/><span className="italic text-white">Hace frío, Hace viento.</span></p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <h4 className="font-bold text-green-400 mb-1">Está...</h4>
                            <p className="text-gray-300">Para condiciones visuales y estados. <br/><span className="italic text-white">Está nublado, Está lloviendo.</span></p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <h4 className="font-bold text-green-400 mb-1">Hay...</h4>
                            <p className="text-gray-300">Para la existencia de fenómenos. <br/><span className="italic text-white">Hay niebla, Hay tormenta.</span></p>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherLesson;
