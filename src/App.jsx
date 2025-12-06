import { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Dashboard } from './components/views/Dashboard.jsx';
import { AdminPanel } from './components/views/AdminPanel.jsx';
import { Login } from './components/views/Login.jsx'; // Import the Login component
import { auth } from './firebase'; // Import Firebase auth
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { VocabMix } from './components/views/VocabMix.jsx';
import { FinalQuiz } from './components/lessons/quizzes/FinalQuiz.jsx';

// IMPORT THE NEW MANAGERS
import BasicVocabManager from './components/lessons/basicvocab/index.jsx';
import SituationalManager from './components/lessons/situational/index.jsx';
import GrammarManager from './components/lessons/grammar/index.jsx';

function App() {
    const [view, setView] = useState('dashboard');
    const [user, setUser] = useState(null); // Add user state

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [view]);

    const handleSignOut = () => {
        signOut(auth).catch((error) => console.error("Error signing out:", error));
    };

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
            case 'weather':
            case 'calendar':
                return (
                    <LessonWrapper>
                        <BasicVocabManager lessonId={view} />
                    </LessonWrapper>
                );

            // --- SITUATIONAL (MANAGED) ---
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
            
            // --- GRAMMAR (MANAGED) ---
            case 'pronouns':
            case 'conjugations':
            case 'verbs':
                return (
                    <LessonWrapper>
                        <GrammarManager lessonId={view} />
                    </LessonWrapper>
                );

            // --- LEGACY ROUTES ---
            case 'vocabmix': return <VocabMix onComplete={()=>setView('dashboard')} />;
            case 'finalquiz': return <FinalQuiz onComplete={()=>setView('dashboard')} />;
            default: return <Dashboard onSelectLesson={setView} />;
        }
    };

    // If user is not logged in, show the Login page
    if (!user) {
        return <Login />;
    }

    // If user is logged in, show the app
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
                    <button onClick={handleSignOut} className="text-xs text-gray-400 hover:text-white transition-colors">Sign Out</button>
                </div>
            )}
            <div className="p-6">
              {renderView()}
            </div>
        </div>
    );
}

export default App;
