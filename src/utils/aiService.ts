import { Recipe } from '../types/recipe';

// Gemini AI configuration
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Get API key from environment or prompt user
const getGeminiApiKey = (): string => {
  // In production, this should come from environment variables or user settings
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  if (!apiKey) {
    throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file.');
  }
  return apiKey;
};
interface RecipeResponse {
  title: string;
  description: string;
  timeMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  caloriesPerServing: number;
  servings: number;
  cuisine: string;
  dietaryTags: string[];
  ingredients: Array<{
    item: string;
    amount: string;
    unit: string;
  }>;
  preparation: string[];
}
export async function generateRecipeWithAI(ingredients: string[]): Promise<Recipe> {
  const prompt = `You are a helpful cooking assistant. Generate a creative and delicious recipe using these ingredients: ${ingredients.join(', ')}.

Create a recipe that makes the most of these ingredients. Respond ONLY with valid JSON in this exact format (no markdown, no code blocks, no extra text):
{
  "title": "Recipe Name",
  "description": "Brief appetizing description in 1-2 sentences",
  "timeMinutes": 30,
  "difficulty": "Easy",
  "caloriesPerServing": 350,
  "servings": 2,
  "cuisine": "Italian",
  "dietaryTags": ["Vegetarian"],
  "ingredients": [
    {"item": "ingredient name", "amount": "1", "unit": "cup"}
  ],
  "preparation": [
    "Step 1 instruction",
    "Step 2 instruction"
  ]
}`;
  try {
    const apiKey = getGeminiApiKey();
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      })
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Gemini API request failed: ${response.status} - ${JSON.stringify(errorData)}`);
    }
    const data = await response.json();

    // Extract the generated text from Gemini response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) {
      throw new Error('No text generated from Gemini API');
    }

    // Try to extract JSON from the response (remove markdown code blocks if present)
    let cleanedText = generatedText.trim();
    cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in Gemini response');
    }
    const recipeData: RecipeResponse = JSON.parse(jsonMatch[0]);

    // Convert to Recipe format
    const recipe: Recipe = {
      id: `ai-${Date.now()}`,
      title: recipeData.title || `${ingredients[0]} Recipe`,
      description: recipeData.description || 'A delicious recipe made with your ingredients.',
      timeMinutes: recipeData.timeMinutes || 30,
      difficulty: recipeData.difficulty || 'Medium',
      caloriesPerServing: recipeData.caloriesPerServing || 350,
      servings: recipeData.servings || 2,
      cuisine: recipeData.cuisine || 'Fusion',
      dietaryTags: recipeData.dietaryTags || [],
      ingredients: recipeData.ingredients || ingredients.map(ing => ({
        item: ing,
        amount: '1',
        unit: 'portion'
      })),
      preparation: recipeData.preparation || ['Prepare all ingredients.', 'Cook according to your preference.', 'Serve hot and enjoy!'],
      isAI: true
    };
    return recipe;
  } catch (error) {
    console.error('Gemini AI generation error:', error);

    // Fallback: Create a simple template recipe
    return createFallbackRecipe(ingredients);
  }
}
function createFallbackRecipe(ingredients: string[]): Recipe {
  const mainIngredient = ingredients[0] || 'vegetables';
  return {
    id: `ai-${Date.now()}`,
    title: `Simple ${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} Stir-Fry`,
    description: `A quick and easy stir-fry using ${mainIngredient} and other fresh ingredients. Perfect for a weeknight meal.`,
    timeMinutes: 25,
    difficulty: 'Easy',
    caloriesPerServing: 320,
    servings: 2,
    cuisine: 'Asian Fusion',
    dietaryTags: ['Quick Meal'],
    ingredients: [...ingredients.map(ing => ({
      item: ing,
      amount: '1',
      unit: 'cup'
    })), {
      item: 'cooking oil',
      amount: '2',
      unit: 'tbsp'
    }, {
      item: 'soy sauce',
      amount: '2',
      unit: 'tbsp'
    }, {
      item: 'garlic',
      amount: '2',
      unit: 'cloves'
    }, {
      item: 'ginger',
      amount: '1',
      unit: 'tsp'
    }],
    preparation: [`Prepare the ${mainIngredient} by washing and chopping into bite-sized pieces.`, 'Heat oil in a large pan or wok over high heat.', 'Add minced garlic and ginger. Stir-fry for 30 seconds.', `Add the ${mainIngredient} and other vegetables. Stir-fry for 5-7 minutes.`, 'Add soy sauce and any other seasonings. Mix well.', 'Cook for another 2-3 minutes until everything is cooked through.', 'Serve hot with rice or noodles. Enjoy your meal!'],
    isAI: true
  };
}