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

// The bypass should only be active in DEV mode AND when the env flag is true.
const devModeBypass = import.meta.env.DEV && import.meta.env.VITE_DEV_MODE_BYPASS_LOGIN === 'true';
const devUserEmail = import.meta.env.VITE_DEV_USER_EMAIL || 'dev@local.host';

function App() {
    const [view, setView] = useState('dashboard');
    const [user, setUser] = useState(null);

    useEffect(() => {
        // If bypass is active, set a fake user from .env and skip listening for auth changes
        if (devModeBypass) {
            setUser({ email: devUserEmail, uid: 'dev-user' });
            return;
        }

        // Otherwise, listen for real authentication state changes
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
        // Consolidate props to pass down to all children
        const viewProps = { user, onSelectLesson: setView, onComplete: () => setView('dashboard') };

        switch(view) {
            case 'admin': return <AdminPanel {...viewProps} onBack={()=>setView('dashboard')} />;
            
            case 'vocales': 
            case 'alphabet':
            case 'numbers':
            case 'colors':
            case 'weather':
            case 'calendar':
                return (
                    <LessonWrapper>
                        <BasicVocabManager lessonId={view} user={user} />
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
                        <SituationalManager lessonId={view} user={user} />
                    </LessonWrapper>
                );
            
            case 'pronouns':
            case 'conjugations':
            case 'verbs':
                return (
                    <LessonWrapper>
                        <GrammarManager lessonId={view} user={user} />
                    </LessonWrapper>
                );

            case 'vocabmix': return <VocabMix {...viewProps} />;
            case 'finalquiz': return <FinalQuiz {...viewProps} />;
            default: return <Dashboard {...viewProps} />;
        }
    };

    // If there is no user (real or fake), show the Login page.
    if (!user) {
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
