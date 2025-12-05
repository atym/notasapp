import React from 'react';
import Vowels from './Vowels';
// import Alphabet from './Alphabet'; 
// import Numbers from './Numbers'; 

const BasicVocabManager = ({ lessonId }) => {
  switch (lessonId) {
    case 'vocales':
      return <Vowels />;
      
    // Future expansion:
    // case 'alphabet': return <Alphabet />;
    // case 'numbers': return <Numbers />;

    default:
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center p-6 border border-gray-800 rounded-xl bg-gray-900/50">
          <p className="text-gray-400 mb-2">Lección no encontrada</p>
          <code className="bg-black px-2 py-1 rounded text-pink-400 text-xs font-mono">
            ID: {lessonId}
          </code>
        </div>
      );
  }
};

export default BasicVocabManager;