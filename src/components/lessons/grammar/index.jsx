import React from 'react';
import PronounsLesson from './Pronouns';
import ConjugationLesson from './Conjugation';
import ToBeLesson from './ToBe';

const GrammarManager = ({ lessonId }) => {
  switch (lessonId) {
    case 'pronouns':
      return <PronounsLesson />;
    case 'conjugations':
      return <ConjugationLesson />;
    case 'verbs':
      return <ToBeLesson />;
    default:
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center p-6 border border-gray-800 rounded-xl bg-gray-900/50">
          <p className="text-gray-400 mb-2">Lección de gramática no encontrada</p>
          <code className="bg-black px-2 py-1 rounded text-pink-400 text-xs font-mono">
            ID: {lessonId}
          </code>
        </div>
      );
  }
};

export default GrammarManager;
