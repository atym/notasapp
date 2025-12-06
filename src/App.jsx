import { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Dashboard } from './components/views/Dashboard.jsx';
import { AdminPanel } from './components/views/AdminPanel.jsx';
import { Login } from './components/views/Login.jsx';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { VocabMix } from './components/views/VocabMix.jsx';
import { FinalQuiz } from './components/lessons/quizzes/FinalQuiz.jsx';

import BasicVocabManager from './components/lessons/basicvocab/index.jsx';
import SituationalManager from './components/lessons/situational/index.jsx';
import GrammarManager from './components/lessons/grammar/index.jsx';

// Check for the development mode bypass flag from environment variables
const devModeBypass = import.meta.env.VITE_DEV_MODE_BYPASS_LOGIN === 'true';

function App() {
    const [view, setView] = useState('dashboard');
    const [user, setUser] = useState(null);

    useEffect(() => {
        // If bypass is active, we don't need to listen for auth changes
        if (devModeBypass) return;

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    const LessonWrapper = ({ children }) => (
        <div className="min-h-screen bg-[#111827] p-6">
            {children}
        </div>
    );

    const renderView = () => {
        switch(view) {
            case 'admin': return <AdminPanel onBack={()=>setView('dashboard')} />;
            
            case 'vocales': 
            case 'alphabet':
            case 'numbers':
            case 'colors':
            case 'weather':
            case 'calendar':
                return (
                    <LessonWrapper>
                        <BasicVocabManager lessonId={view} />
                    </LessonWrapper>
                );

            case 'feelings':
            case 'intro':
            case 'interview':
            case 'characters':
            case 'jobs':
            case 'nationalities':
                return (
                    <LessonWrapper>
                        <SituationalManager lessonId={view} />
                    </LessonWrapper>
                );
            
            case 'pronouns':
            case 'conjugations':
            case 'verbs':
                return (
                    <LessonWrapper>
                        <GrammarManager lessonId={view} />
                    </LessonWrapper>
                );

            case 'vocabmix': return <VocabMix onComplete={()=>setView('dashboard')} />;
            case 'finalquiz': return <FinalQuiz onComplete={()=>setView('dashboard')} />;
            default: return <Dashboard onSelectLesson={setView} />;
        }
    };

    // If not a real user and bypass is not active, show Login page
    if (!user && !devModeBypass) {
        return <Login />;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
            {view !== 'admin' && (
                 <div className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 p-4 flex items-center justify-between">
                    {view !== 'dashboard' ? 
                        <button onClick={()=>setView('dashboard')} className="flex items-center gap-2 text-indigo-400 font-bold">
                            <FiArrowLeft size={20}/> Menú
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
