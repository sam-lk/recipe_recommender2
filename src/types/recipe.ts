export interface Ingredient {
  item: string;
  amount: string;
  unit: string;
}
export interface Recipe {
  id: string;
  title: string;
  description: string;
  timeMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  caloriesPerServing: number;
  servings: number;
  ingredients: Ingredient[];
  preparation: string[];
  cuisine: string;
  dietaryTags: string[];
  imageUrl?: string;
  isAI?: boolean;
}
export interface FilterState {
  search: string;
  dietary: string[];
  cuisine: string[];
  difficulty: string[];
  maxTime: number | null;
}