import React, { useState, useCallback, ChangeEvent, FormEvent, useEffect } from 'react';
import type { FormData, FootprintResult } from './types';
import { calculateWaterFootprint } from './services/geminiService';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ScoreDisplay } from './components/ScoreDisplay';
import { WaterDropIcon } from './components/icons';

const initialState: FormData = {
  riceMeals: 7,
  wheatMeals: 2,
  dalMeals: 5,
  dairy: 2,
  coffee: 1,
  tea: 1,
  showerDuration: 10,
  baths: 1,
  toiletFlushes: 5,
  laundryLoads: 2,
  newClothes: 2,
  carWashes: 1,
  lawnWatering: 0,
};

function App() {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [results, setResults] = useState<FootprintResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (results) {
        const resultsElement = document.getElementById('results');
        resultsElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [results]);

  const handleFormChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value),
    }));
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const footprintData = await calculateWaterFootprint(formData);
      setResults(footprintData);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <WaterDropIcon className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 tracking-tight">
            Water Footprint Calculator
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Discover your daily water usage and get a simple score to help you conserve this precious resource.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
            <CalculatorForm
              formData={formData}
              onFormChange={handleFormChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

            {error && (
              <div className="mt-8 p-4 text-center text-red-800 bg-red-100 border border-red-400 rounded-lg">
                <p><strong>Error:</strong> {error}</p>
              </div>
            )}
            
            <div className="mt-12 space-y-8">
                {results && (
                    <>
                        <ResultsDisplay results={results} />
                        <ScoreDisplay results={results} />
                    </>
                )}
            </div>

        </div>
        <footer className="text-center mt-16 text-gray-500">
            <p>&copy; {new Date().getFullYear()} Water Footprint Calculator. Powered by Google Gemini.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;