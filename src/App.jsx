import { useState, useEffect } from 'react';
// Explicitly adding .jsx extensions to ensure resolution
import { Icons } from './components/Icons.jsx'; 
import { Dashboard } from './components/Dashboard.jsx';
import { AdminPanel } from './components/AdminPanel.jsx';

import { VocabMix } from './components/VocabMix.jsx';
import { FinalQuiz } from './components/FinalQuiz.jsx';

// IMPORT THE NEW MANAGER
// Pointing to the specific file to avoid folder index ambiguity
import BasicVocabManager from './components/lessons/basicvocab/index.jsx';

import { 
    AlphabetLesson, NumbersLesson, CalendarLesson, CharacterLesson, 
    VerbLesson, WeatherLesson, JobsLesson, NationalitiesLesson, 
    IntroLesson, InterviewLesson, ColorsLesson, FeelingsLesson, 
    PronounsLesson, ConjugationSection 
} from './components/Lessons.jsx';

function App() {
    const [view, setView] = useState('dashboard');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    // Wrapper for new lessons to ensure they have a Back button
    const LessonWrapper = ({ children }) => (
        <div className="min-h-screen bg-[#111827] p-4 pt-5">
            {children}
        </div>
    );

    const renderView = () => {
        switch(view) {
            case 'admin': return <AdminPanel onBack={()=>setView('dashboard')} />;
            
            // --- NEW VOWELS ROUTE ---
            case 'vocales': return (
                <LessonWrapper>
                    {/* We pass the ID so the manager knows which sub-lesson to render */}
                    <BasicVocabManager lessonId="vocales" />
                </LessonWrapper>
            );

            // --- EXISTING ROUTES ---
            case 'alphabet': return <AlphabetLesson onComplete={()=>setView('dashboard')} />;
            case 'numbers': return <NumbersLesson onComplete={()=>setView('dashboard')} />;
            case 'calendar': return <CalendarLesson onComplete={()=>setView('dashboard')} />;
            case 'characters': return <CharacterLesson onComplete={()=>setView('dashboard')} />;
            case 'verbs': return <VerbLesson onComplete={()=>setView('dashboard')} />;
            case 'weather': return <WeatherLesson onComplete={()=>setView('dashboard')} />;
            case 'vocabmix': return <VocabMix onComplete={()=>setView('dashboard')} />;
            case 'jobs': return <JobsLesson onComplete={()=>setView('dashboard')} />;
            case 'nationalities': return <NationalitiesLesson onComplete={()=>setView('dashboard')} />;
            case 'finalquiz': return <FinalQuiz onComplete={()=>setView('dashboard')} />;
            case 'intro': return <IntroLesson onComplete={()=>setView('dashboard')} />;
            case 'interview': return <InterviewLesson onComplete={()=>setView('dashboard')} />;
            case 'colors': return <ColorsLesson onComplete={()=>setView('dashboard')} />;
            case 'feelings': return <FeelingsLesson onComplete={()=>setView('dashboard')} />;
            case 'pronouns': return <PronounsLesson onComplete={()=>setView('dashboard')} />;
            case 'conjugations': return <ConjugationSection onComplete={()=>setView('dashboard')} />;
            default: return <Dashboard onSelectLesson={setView} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
            {/* Header: z-50 ensures it stays ON TOP of everything else */}
            {view !== 'admin' && (
                <div className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 p-4 flex items-center justify-between">
                    {view !== 'dashboard' ? 
                        <button onClick={()=>setView('dashboard')} className="flex items-center gap-2 text-indigo-400 font-bold">
                            <Icons.ArrowLeft size={20}/> Menú
                        </button> 
                        : <div className="text-xl font-black text-indigo-500 tracking-tighter">NOTAS<span className="text-pink-500">.APP</span></div>
                    }
                </div>
            )}
            {renderView()}
        </div>
    );
}

export default App;