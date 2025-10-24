
import React from 'react';

interface RecommendationsProps {
  recommendations: string[];
}

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);


export const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 p-8 bg-green-50 border-2 border-green-200 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-6">AI-Powered Recommendations</h2>
      <ul className="space-y-4">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start p-4 bg-white rounded-lg shadow">
            <CheckIcon className="w-8 h-8 text-green-500 mr-4 flex-shrink-0 mt-1" />
            <p className="text-gray-700 text-lg">{rec}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
