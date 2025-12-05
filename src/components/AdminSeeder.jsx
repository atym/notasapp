import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

// --- DATA SETS ---

// 1. NUMBERS DATA
const NUMBERS_DATA = [
    { order: 0, label: "0", span: "cero" },
    { order: 1, label: "1", span: "uno" },
    { order: 2, label: "2", span: "dos" },
    { order: 3, label: "3", span: "tres" },
    { order: 4, label: "4", span: "cuatro" },
    { order: 5, label: "5", span: "cinco" },
    { order: 6, label: "6", span: "seis" },
    { order: 7, label: "7", span: "siete" },
    { order: 8, label: "8", span: "ocho" },
    { order: 9, label: "9", span: "nueve" },
    { order: 10, label: "10", span: "diez" },
    { order: 11, label: "11", span: "once" },
    { order: 12, label: "12", span: "doce" },
    { order: 13, label: "13", span: "trece" },
    { order: 14, label: "14", span: "catorce" },
    { order: 15, label: "15", span: "quince" },
    { order: 16, label: "16", span: "dieciséis" },
    { order: 17, label: "17", span: "diecisiete" },
    { order: 18, label: "18", span: "dieciocho" },
    { order: 19, label: "19", span: "diecinueve" },
    { order: 20, label: "20", span: "veinte" },
    { order: 21, label: "21", span: "veintiuno" },
    { order: 25, label: "25", span: "veinticinco" },
    { order: 30, label: "30", span: "treinta" },
    { order: 31, label: "31", span: "treinta y uno" },
    { order: 40, label: "40", span: "cuarenta" },
    { order: 50, label: "50", span: "cincuenta" },
    { order: 60, label: "60", span: "sesenta" },
    { order: 70, label: "70", span: "setenta" },
    { order: 80, label: "80", span: "ochenta" },
    { order: 90, label: "90", span: "noventa" },
    { order: 99, label: "99", span: "noventa y nueve" },
    { order: 100, label: "100", span: "cien" },
    { order: 101, label: "101", span: "ciento uno" },
    { order: 200, label: "200", span: "doscientos" },
    { order: 500, label: "500", span: "quinientos" },
    { order: 1000, label: "1000", span: "mil" }
];

// 2. VOWELS DATA
const VOWELS_DATA = [
    { order: 1, letter: "A", rhyme: "Con la “A”, mamá va a trabajar." },
    { order: 2, letter: "E", rhyme: "Con la “E”, el bebé bebe leche." },
    { order: 3, letter: "I", rhyme: "Con la “I”, Imprimir, bici." },
    { order: 4, letter: "O", rhyme: "Con la “O”, oso, mono." },
    { order: 5, letter: "U", rhyme: "Con la “U”, tú, ñu." }
];

// 3. WEATHER DATA
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
                    Subir Vocales
                </button>

                {/* UPDATED: Pushes to 'numbers' instead of 'lesson_numbers' */}
                <button 
                    onClick={() => uploadList('numbers', NUMBERS_DATA)}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                >
                    Subir Números (numbers)
                </button>

                <button 
                    onClick={() => uploadList('weather', WEATHER_DATA)}
                    disabled={loading}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                >
                    Subir Clima
                </button>
            </div>

            {status && <p className="text-sm text-gray-300 animate-pulse">{status}</p>}
        </div>
    );
};