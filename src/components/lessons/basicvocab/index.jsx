import React from 'react';
import AlphabetLesson from './Alphabet';
import Vowels from './Vowels'; // Corrected import
import NumbersLesson from './Numbers';
import ColorsLesson from './Colors';
import { WeatherLesson } from './Weather';
import CalendarLesson from './Calendar';

const BasicVocabManager = ({ lessonId }) => {
  switch (lessonId) {
    case 'alphabet':
      return <AlphabetLesson />;
    case 'vocales':
      return <Vowels />; // Corrected component
    case 'numbers':
        return <NumbersLesson />;
    case 'colors':
        return <ColorsLesson />;
    case 'weather':
        return <WeatherLesson />;
    case 'calendar':
        return <CalendarLesson />;

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