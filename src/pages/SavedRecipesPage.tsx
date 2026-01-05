import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe } from '../types/recipe';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Heart } from 'lucide-react';
export function SavedRecipesPage() {
  const [savedRecipes, setSavedRecipes] = useLocalStorage<Recipe[]>('savedRecipes', []);
  const handleToggleSave = (recipe: Recipe) => {
    setSavedRecipes(savedRecipes.filter(r => r.id !== recipe.id));
  };
  return <div className="min-h-screen flex flex-col bg-[#FFF8F0]">
      <Navigation />

      <div className="pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">
        <div className="text-center mb-12">
          <h1 className="font-sans text-4xl font-bold text-[#FF6B35] mb-4">
            My Favorites
          </h1>
          <p className="text-gray-600">Your personal collection of recipes.</p>
        </div>

        {savedRecipes.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} isSaved={true} onToggleSave={handleToggleSave} />)}
          </div> : <div className="text-center py-24">
            <div className="inline-block p-6 bg-white rounded-full mb-6 shadow-sm">
              <Heart size={48} className="text-gray-300" />
            </div>
            <h2 className="font-sans text-2xl font-bold text-gray-700 mb-2">
              No saved recipes yet
            </h2>
            <p className="text-gray-500 mb-8">
              Start exploring and save your favorites here.
            </p>
            <a href="/recipes" className="px-6 py-3 bg-[#FF6B35] text-white font-sans font-semibold rounded-full hover:bg-[#e65a26] transition-colors">
              All Recipes
            </a>
          </div>}
      </div>

      <Footer />
    </div>;
}