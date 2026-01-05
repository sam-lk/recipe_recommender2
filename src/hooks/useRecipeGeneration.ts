import { useState } from 'react';
import { Recipe } from '../types/recipe';
import { generateRecipeWithAI } from '../utils/aiService';
interface UseRecipeGenerationReturn {
  generateRecipes: (ingredients: string[]) => Promise<void>;
  generatedRecipes: Recipe[];
  isGenerating: boolean;
  error: string | null;
}
export function useRecipeGeneration(): UseRecipeGenerationReturn {
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generateRecipes = async (ingredients: string[]) => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient.');
      return;
    }
    setIsGenerating(true);
    setError(null);
    try {
      // Use Hugging Face AI to generate recipe
      const recipe = await generateRecipeWithAI(ingredients);
      setGeneratedRecipes([recipe]);
    } catch (err) {
      setError('Failed to generate recipe. Please try again.');
      console.error('Recipe generation error:', err);

      // Fallback to a simple template if AI fails
      const fallbackRecipe: Recipe = {
        id: `fallback-${Date.now()}`,
        title: `${ingredients[0]} Stir-Fry`,
        description: `A simple stir-fry using ${ingredients.join(', ')}. Quick and delicious!`,
        timeMinutes: 25,
        difficulty: 'Easy',
        caloriesPerServing: 320,
        servings: 2,
        cuisine: 'Asian Fusion',
        dietaryTags: ['Quick Meal'],
        ingredients: ingredients.map(ing => ({
          item: ing,
          amount: '1',
          unit: 'cup'
        })),
        preparation: ['Wash and prepare all ingredients.', 'Heat oil in a large pan.', 'Add ingredients and stir-fry for 5-7 minutes.', 'Season with salt, pepper, and soy sauce.', 'Serve hot with rice. Enjoy your meal!'],
        isAI: true
      };
      setGeneratedRecipes([fallbackRecipe]);
    } finally {
      setIsGenerating(false);
    }
  };
  return {
    generateRecipes,
    generatedRecipes,
    isGenerating,
    error
  };
}