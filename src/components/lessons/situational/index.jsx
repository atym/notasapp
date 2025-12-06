import React from 'react';
import FeelingsLesson from './Feelings';
import IntroLesson from './Intro';
import InterviewLesson from './Interview';
import CharacterLesson from './Characters'; 
import JobsLesson from './Jobs';
import NationalitiesLesson from './Nationalities'; // <-- Import the new lesson

const SituationalManager = ({ lessonId }) => {
  switch (lessonId) {
    case 'feelings':
      return <FeelingsLesson />;
    case 'intro':
      return <IntroLesson />;
    case 'interview':
      return <InterviewLesson />;
    case 'characters':
      return <CharacterLesson />;
    case 'jobs':
      return <JobsLesson />;
    case 'nationalities': // <-- Add the new case
      return <NationalitiesLesson />;
    default:
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center p-6 border border-gray-800 rounded-xl bg-gray-900/50">
          <p className="text-gray-400 mb-2">Lección situacional no encontrada</p>
          <code className="bg-black px-2 py-1 rounded text-pink-400 text-xs font-mono">
            ID: {lessonId}
          </code>
        </div>
      );
  }
};

export default SituationalManager;
