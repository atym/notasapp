import { useState, useEffect } from 'react';
import { LessonQuiz } from './LessonQuiz'; // It uses the quiz engine
import { generateVocabBank, getDistractors } from '../data';

export const FinalQuiz = ({ onComplete }) => {
    const [pool, setPool] = useState([]);
    
    useEffect(() => {
        const generateFinalPool = () => {
            let p = [
                 { type: 'mc', q: "___ soy doctor.", a: "Yo", opts: ["Yo", "Tú", "Él"].sort(()=>0.5-Math.random()), exp: "Yo soy." },
                 { type: 'mc', q: "Ella ___ hambre.", a: "tiene", opts: ["es", "está", "tiene"].sort(()=>0.5-Math.random()), exp: "Tener hambre." },
                 { type: 'mc', q: "¿Dónde ___ tú?", a: "vives", opts: ["vivo", "vives", "vive"].sort(()=>0.5-Math.random()), exp: "Tú vives." },
                 { type: 'mc', q: "Nosotros ___ en el parque.", a: "estamos", opts: ["somos", "estamos", "tenemos"].sort(()=>0.5-Math.random()), exp: "Ubicación = Estar." },
                 { type: 'mc', q: "¿Cómo te ___?", a: "llamas", opts: ["llama", "llamas", "llamo"].sort(()=>0.5-Math.random()), exp: "Te llamas." },
                 { type: 'mc', q: "El plural de 'Mexicano'", a: "Mexicanos", opts: ["Mexicanos", "Mexicano", "Mexicanoes"].sort(()=>0.5-Math.random()), exp: "Termina en vocal + s." },
                 { type: 'mc', q: "¿Qué tiempo hace? (Windy)", a: "Hace viento", opts: ["Está viento", "Hace viento", "Es viento"].sort(()=>0.5-Math.random()), exp: "Clima = Hace." },
            ];
            
            // Add real vocab questions for filler
            const vocab = generateVocabBank().sort(() => 0.5 - Math.random());
            
            // We need 18 more to reach 25
            let vIndex = 0;
            while (p.length < 25 && vIndex < vocab.length) {
                const item = vocab[vIndex];
                // Use getDistractors (generic) for mixed vocab pool
                const distractors = getDistractors(item.en, 2); 
                p.push({
                    type: 'mc',
                    q: `¿Qué significa "${item.es}"?`,
                    a: item.en,
                    opts: [item.en, ...distractors].sort(() => 0.5 - Math.random()),
                    exp: `${item.es} = ${item.en}`
                });
                vIndex++;
            }
            return p;
        };

        setPool(generateFinalPool());
    }, []);

    if (pool.length === 0) return <div>Generando examen...</div>;

    return (
        <div className="p-6 max-w-md mx-auto pb-24">
            <h2 className="text-xl font-bold mb-4 text-yellow-500">Examen Final (25 Preguntas)</h2>
            <LessonQuiz 
                pool={pool} 
                questionCount={25} 
                onComplete={() => {
                    onComplete();
                }} 
            />
        </div>
    );
};