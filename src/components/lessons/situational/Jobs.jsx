import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect, useMemo } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { LessonQuiz } from '../quizzes/LessonQuiz';
import { getSmartDistractors } from '../../../data';

const JobsLesson = () => {
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
                        <FiChevronRight size={16} className="text-gray-600" />
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
            </div>
        </div>
    );
};

export default JobsLesson;