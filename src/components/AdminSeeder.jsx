import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
// We still import the other lists if you haven't uploaded them yet, 
// but Weather is defined right here now.
import {  } from '../data'; 

// RAW WEATHER DATA (Since we removed it from the app)
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
                // If it's the Alphabet, ensure we send it as an object
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
                {/* ADD BUTTONS FOR ADMIN HERE */}
                
            </div>

            {status && <p className="text-sm text-gray-300">{status}</p>}
        </div>
    );
};