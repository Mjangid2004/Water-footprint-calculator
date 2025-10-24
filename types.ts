export interface FormData {
  // Diet
  riceMeals: number; // per week
  wheatMeals: number; // per day (roti/bread)
  dalMeals: number; // per week (lentils)
  dairy: number; // servings per day
  coffee: number; // cups per day
  tea: number; // cups per day
  
  // Hygiene
  showerDuration: number; // minutes
  baths: number; // per week
  toiletFlushes: number; // per day
  laundryLoads: number; // per week

  // Consumption
  newClothes: number; // items per month
  carWashes: number; // per month
  lawnWatering: number; // minutes per week
}

export interface FootprintResult {
  totalFootprint: number;
  dietFootprint: number;
  hygieneFootprint: number;
  consumptionFootprint: number;
  footprintScore: number; // Score from 1-10
  worstCategory: 'Diet' | 'Hygiene' | 'Consumption';
}