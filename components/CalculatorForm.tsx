import React from 'react';
import type { FormData } from '../types';
import { WaterDropIcon, LoadingSpinner } from './icons';

interface CalculatorFormProps {
  formData: FormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const SliderInput: React.FC<{
    id: keyof FormData;
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, label, value, min, max, step, unit, onChange }) => (
    <div className="mb-6">
        <label htmlFor={id} className="block text-lg font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex items-center space-x-4">
            <input
                type="range"
                id={id}
                name={id}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-blue-800 font-semibold w-24 text-right">{value} {unit}</span>
        </div>
    </div>
);


export const CalculatorForm: React.FC<CalculatorFormProps> = ({ formData, onFormChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-12">
      {/* Diet Section */}
      <fieldset className="p-6 border-2 border-blue-200 rounded-2xl bg-white shadow-md">
        <legend className="text-2xl font-bold text-blue-800 px-4 flex items-center">
          <WaterDropIcon className="w-6 h-6 mr-2 text-blue-500" />
          Dietary Habits
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4">
            <SliderInput id="riceMeals" label="Rice-based Meals" value={formData.riceMeals} min={0} max={21} step={1} unit="per week" onChange={onFormChange} />
            <SliderInput id="wheatMeals" label="Wheat-based Meals (Roti/Bread)" value={formData.wheatMeals} min={0} max={10} step={1} unit="per day" onChange={onFormChange} />
            <SliderInput id="dalMeals" label="Lentil/Dal Meals" value={formData.dalMeals} min={0} max={21} step={1} unit="per week" onChange={onFormChange} />
            <SliderInput id="dairy" label="Dairy Servings" value={formData.dairy} min={0} max={10} step={1} unit="per day" onChange={onFormChange} />
            <SliderInput id="coffee" label="Coffee Cups" value={formData.coffee} min={0} max={10} step={1} unit="per day" onChange={onFormChange} />
            <SliderInput id="tea" label="Tea Cups" value={formData.tea} min={0} max={10} step={1} unit="per day" onChange={onFormChange} />
        </div>
      </fieldset>
      
      {/* Hygiene Section */}
      <fieldset className="p-6 border-2 border-green-200 rounded-2xl bg-white shadow-md">
        <legend className="text-2xl font-bold text-green-800 px-4 flex items-center">
            <WaterDropIcon className="w-6 h-6 mr-2 text-green-500" />
            Hygiene Habits
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4">
            <SliderInput id="showerDuration" label="Shower Duration" value={formData.showerDuration} min={0} max={60} step={1} unit="mins/day" onChange={onFormChange} />
            <SliderInput id="baths" label="Baths" value={formData.baths} min={0} max={7} step={1} unit="per week" onChange={onFormChange} />
            <SliderInput id="toiletFlushes" label="Toilet Flushes" value={formData.toiletFlushes} min={0} max={20} step={1} unit="per day" onChange={onFormChange} />
            <SliderInput id="laundryLoads" label="Laundry Loads" value={formData.laundryLoads} min={0} max={10} step={1} unit="per week" onChange={onFormChange} />
        </div>
      </fieldset>

      {/* Consumption Section */}
      <fieldset className="p-6 border-2 border-yellow-200 rounded-2xl bg-white shadow-md">
        <legend className="text-2xl font-bold text-yellow-800 px-4 flex items-center">
            <WaterDropIcon className="w-6 h-6 mr-2 text-yellow-500" />
            Consumption Habits
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4">
            <SliderInput id="newClothes" label="New Clothes" value={formData.newClothes} min={0} max={20} step={1} unit="items/month" onChange={onFormChange} />
            <SliderInput id="carWashes" label="Car Washes" value={formData.carWashes} min={0} max={10} step={1} unit="per month" onChange={onFormChange} />
            <SliderInput id="lawnWatering" label="Lawn Watering" value={formData.lawnWatering} min={0} max={120} step={5} unit="mins/week" onChange={onFormChange} />
        </div>
      </fieldset>
      
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-1/2 flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xl px-8 py-4 transition-all duration-300 ease-in-out disabled:bg-blue-300 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <LoadingSpinner className="w-6 h-6 mr-3" />
              Calculating...
            </>
          ) : (
            'Calculate My Water Footprint'
          )}
        </button>
      </div>
    </form>
  );
};