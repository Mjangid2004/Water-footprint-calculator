import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, FootprintResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    totalFootprint: {
      type: Type.NUMBER,
      description: 'Total daily water footprint in liters. Must be a whole number.',
    },
    dietFootprint: {
      type: Type.NUMBER,
      description: 'Portion of daily footprint from diet in liters. Must be a whole number.',
    },
    hygieneFootprint: {
      type: Type.NUMBER,
      description: 'Portion of daily footprint from hygiene in liters. Must be a whole number.',
    },
    consumptionFootprint: {
      type: Type.NUMBER,
      description: 'Portion of daily footprint from other consumption in liters. Must be a whole number.',
    },
    footprintScore: {
        type: Type.NUMBER,
        description: 'A score from 1 (very high usage) to 10 (excellent conservation). Must be a whole number.',
    },
    worstCategory: {
        type: Type.STRING,
        description: "The category with the highest water usage. Must be one of: 'Diet', 'Hygiene', or 'Consumption'.",
    },
  },
  required: ['totalFootprint', 'dietFootprint', 'hygieneFootprint', 'consumptionFootprint', 'footprintScore', 'worstCategory'],
};

const buildPrompt = (data: FormData): string => {
  return `
    You are an expert water footprint calculator. Based on the following habits of a user, calculate their estimated daily water footprint in liters. Provide a breakdown by category (diet, hygiene, consumption). Also, provide a water footprint score from 1 to 10 (where 10 is best, representing low water usage) and identify the category ('Diet', 'Hygiene', or 'Consumption') with the highest water footprint.

    User Habits:
    - Diet:
      - Rice-based meals: ${data.riceMeals} per week
      - Wheat-based meals (Roti/Bread): ${data.wheatMeals} per day
      - Lentil/Dal-based meals: ${data.dalMeals} per week
      - Dairy servings: ${data.dairy} per day
      - Coffee: ${data.coffee} cups per day
      - Tea: ${data.tea} cups per day

    - Hygiene:
      - Shower duration: ${data.showerDuration} minutes per day
      - Baths: ${data.baths} per week
      - Toilet flushes: ${data.toiletFlushes} per day
      - Laundry loads: ${data.laundryLoads} per week

    - Consumption:
      - Buys new clothing items: ${data.newClothes} per month
      - Car washes: ${data.carWashes} per month
      - Lawn watering: ${data.lawnWatering} minutes per week

    Important instructions:
    1. Base your calculations on established water footprint data for Indian dietary staples (e.g., water per kg of rice, wheat, lentils).
    2. Convert all weekly and monthly figures into a daily average for the final calculation.
    3. The footprint score should reflect overall water sustainability. A lower total footprint should result in a higher score.
    4. The final output must be a valid JSON object matching the provided schema. Do not include any markdown formatting or explanations outside the JSON structure.
  `;
};

export const calculateWaterFootprint = async (data: FormData): Promise<FootprintResult> => {
  try {
    const prompt = buildPrompt(data);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    // Ensure all footprint values are integers
    result.totalFootprint = Math.round(result.totalFootprint);
    result.dietFootprint = Math.round(result.dietFootprint);
    result.hygieneFootprint = Math.round(result.hygieneFootprint);
    result.consumptionFootprint = Math.round(result.consumptionFootprint);
    
    return result as FootprintResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to calculate water footprint. Please try again.");
  }
};