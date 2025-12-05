import { useState } from 'react';
// FIX: Go up 1 level to reach src/firebase.js
import { db } from '../firebase.js';
import { collection, addDoc } from 'firebase/firestore';

// --- DATA SETS ---

// 1. VOWELS DATA
const VOWELS_DATA = [
    { order: 1, letter: "A", rhyme: "Con la “A”, mamá va a trabajar." },
    { order: 2, letter: "E", rhyme: "Con la “E”, el bebé bebe leche." },
    { order: 3, letter: "I", rhyme: "Con la “I”, Imprimir, bici." },
    { order: 4, letter: "O", rhyme: "Con la “O”, oso, mono." },
    { order: 5, letter: "U", rhyme: "Con la “U”, tú, ñu." }
];

// 2. WEATHER DATA
const WEATHER_DATA = [
    { name: 'Está soleado', desc: 'It is sunny', icon: 'Sun' }, 
    { name: 'Está nublado', desc: 'It is cloudy', icon: 'Cloud' },
    { name: 'Está parcialmente nublado', desc: 'It is partly cloudy', icon: 'Cloud' }, 
    { name: 'Está despejado', desc: 'It is clear', icon: 'Sun' },
    { name: 'Está lloviendo', desc: 'It is raining', icon: 'CloudRain' },
    { name: 'La lluvia', desc: 'The rain', icon: 'CloudRain' },
    { name: 'Está nevando', desc: 'It is snowing', icon: 'Snowflake' },
    { name: 'La nieve', desc: 'The snow', icon: 'Snowflake' },
    { name: 'Hace calor', desc: 'It is hot', icon: 'Thermometer' },
    { name: 'Hace frío', desc: 'It is cold', icon: 'Thermometer' },
    { name: 'Hace viento', desc: 'It is windy', icon: 'Wind' },
    { name: 'Hace buen tiempo', desc: 'The weather is good', icon: 'Smile' },
    { name: 'Hace mal tiempo', desc: 'The weather is bad', icon: 'Frown' },
    { name: 'La tormenta', desc: 'The storm', icon: 'Zap' },
    { name: 'El relámpago', desc: 'The lightning', icon: 'Zap' },
    { name: 'Húmedo', desc: 'Humid', icon: 'Cloud' },
    { name: 'Seco', desc: 'Dry', icon: 'Sun' },
    { name: 'El arcoíris', desc: 'The rainbow', icon: 'Smile' }
];

export const AdminSeeder = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const uploadList = async (collectionName, dataList) => {
        setLoading(true);
        setStatus(`Uploading to ${collectionName}...`);
        try {
            const collectionRef = collection(db, collectionName);
            for (const item of dataList) {
                await addDoc(collectionRef, item);
            }
            setStatus(`Success! Uploaded ${dataList.length} items to '${collectionName}'.`);
        } catch (error) {
            console.error("Error:", error);
            setStatus("Error: " + error.message);
        }
        setLoading(false);
    };

    return (
        <div className="p-4 bg-gray-800 border border-yellow-500 rounded-xl mb-6 space-y-2">
            <h3 className="font-bold text-yellow-500">⚠️ Herramientas de administración de base de datos</h3>
            
            <div className="flex flex-wrap gap-2">
                <button 
                    onClick={() => uploadList('lesson_vocales', VOWELS_DATA)}
                    disabled={loading}
                    className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                >
                    Subir Vocales (lesson_vocales)
                </button>

                <button 
                    onClick={() => uploadList('weather', WEATHER_DATA)}
                    disabled={loading}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                >
                    Subir Clima (weather)
                </button>
            </div>

            {status && <p className="text-sm text-gray-300 animate-pulse">{status}</p>}
        </div>
    );
};