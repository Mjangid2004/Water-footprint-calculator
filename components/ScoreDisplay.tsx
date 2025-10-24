import React from 'react';
import type { FootprintResult } from '../types';

interface ScoreDisplayProps {
  results: FootprintResult;
}

const getScoreFeedback = (score: number): { text: string; color: string } => {
  if (score >= 8) return { text: 'Excellent!', color: 'text-green-600' };
  if (score >= 5) return { text: 'Good', color: 'text-yellow-600' };
  return { text: 'Needs Improvement', color: 'text-red-600' };
};

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
);


export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ results }) => {
  const { footprintScore: score, worstCategory, totalFootprint } = results;
  const feedback = getScoreFeedback(score);
  const AVERAGE_FOOTPRINT = 2500;

  return (
    <div className="mt-12 p-8 bg-white border-2 border-yellow-200 rounded-2xl shadow-lg animate-fade-in text-center">
      <h2 className="text-3xl font-bold text-yellow-800 mb-4">Your Water Score</h2>
      <div className="flex items-center justify-center space-x-2">
        <p className={`text-7xl font-extrabold ${feedback.color}`}>{score}</p>
        <p className="text-3xl font-bold text-gray-500">/ 10</p>
      </div>
      <p className={`text-2xl font-semibold mt-2 ${feedback.color}`}>{feedback.text}</p>
      
      <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-300">
         <h3 className="text-xl font-semibold text-gray-700">How your score is calculated</h3>
         <p className="mt-2 text-md text-gray-600 max-w-md mx-auto">
            Your score is based on your estimated daily usage of <strong className="font-bold text-blue-600">{totalFootprint.toLocaleString()} liters</strong> compared to a typical daily average of around {AVERAGE_FOOTPRINT.toLocaleString()} liters. Lower usage means a higher score!
         </p>
      </div>

      <div className="mt-8 pt-6 border-t-2 border-yellow-200">
        <h3 className="text-2xl font-semibold text-yellow-900 flex items-center justify-center">
          <InfoIcon className="w-7 h-7 mr-2" />
          Area for Improvement
        </h3>
        <p className="mt-2 text-lg text-gray-700">
          Your highest water usage comes from your <strong className="font-bold text-yellow-900">{worstCategory}</strong> habits.
        </p>
      </div>
    </div>
  );
};
