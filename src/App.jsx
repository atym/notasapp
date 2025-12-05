import { useState, useEffect } from 'react';
import { Icons } from './components/Icons.jsx'; 
import { Dashboard } from './components/Dashboard.jsx';
import { AdminPanel } from './components/AdminPanel.jsx';

import { VocabMix } from './components/VocabMix.jsx';
import { FinalQuiz } from './components/FinalQuiz.jsx';

// IMPORT THE NEW MANAGERS
import BasicVocabManager from './components/lessons/basicvocab/index.jsx';
import SituationalManager from './components/lessons/situational/index.jsx';

import { 
    CalendarLesson, CharacterLesson, 
    VerbLesson, WeatherLesson, JobsLesson, NationalitiesLesson, 
    IntroLesson, InterviewLesson, 
    PronounsLesson, ConjugationSection 
} from './components/Lessons.jsx';

function App() {
    const [view, setView] = useState('dashboard');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    // Wrapper for new lessons to ensure they have a Back button
    const LessonWrapper = ({ children }) => (
        <div className="min-h-screen bg-[#111827] p-6">
            {children}
        </div>
    );

    const renderView = () => {
        switch(view) {
            case 'admin': return <AdminPanel onBack={()=>setView('dashboard')} />;
            
            // --- BASIC VOCAB (MANAGED) ---
            case 'vocales': 
            case 'alphabet':
            case 'numbers':
            case 'colors': // MOVED HERE
                return (
                    <LessonWrapper>
                        <BasicVocabManager lessonId={view} />
                    </LessonWrapper>
                );

            // --- SITUATIONAL (MANAGED) ---
            case 'feelings':
                return (
                    <LessonWrapper>
                        <SituationalManager lessonId={view} />
                    </LessonWrapper>
                );

            // --- LEGACY ROUTES ---
            case 'calendar': return <CalendarLesson onComplete={()=>setView('dashboard')} />;
            case 'characters': return <CharacterLesson onComplete={()=>setView('dashboard')} />;
            case 'verbs': return <VerbLesson onComplete={()=>setView('dashboard')} />;
            case 'weather': return <WeatherLesson onComplete={()=>setView('dashboard')} />;
            case 'vocabmix': return <VocabMix onComplete={()=>setView('dashboard')} />;
            case 'jobs': return <JobsLesson on_Complete={()=>setView('dashboard')} />;
            case 'nationalities': return <NationalitiesLesson onComplete={()=>setView('dashboard')} />;
            case 'finalquiz': return <FinalQuiz onComplete={()=>setView('dashboard')} />;
            case 'intro': return <IntroLesson onComplete={()=>setView('dashboard')} />;
            case 'interview': return <InterviewLesson onComplete={()=>setView('dashboard')} />;
            case 'pronouns': return <PronounsLesson onComplete={()=>setView('dashboard')} />;
            case 'conjugations': return <ConjugationSection onComplete={()=>setView('dashboard')} />;
            default: return <Dashboard onSelectLesson={setView} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
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
            <div className="p-6">
              {renderView()}
            </div>
        </div>
    );
}

export default App;