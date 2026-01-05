import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { PantryInput } from '../components/PantryInput';
import { RecipeCard } from '../components/RecipeCard';
import { useRecipeGeneration } from '../hooks/useRecipeGeneration';
import { SAMPLE_RECIPES } from '../utils/constants';
import { Recipe } from '../types/recipe';
import { useLocalStorage } from '../hooks/useLocalStorage';
export function HomePage() {
  const [pantryIngredients, setPantryIngredients] = useState<string[]>([]);
  const {
    generateRecipes,
    generatedRecipes,
    isGenerating
  } = useRecipeGeneration();
  const [savedRecipes, setSavedRecipes] = useLocalStorage<Recipe[]>('savedRecipes', []);
  const handleAddIngredient = (ing: string) => {
    if (!pantryIngredients.includes(ing)) {
      setPantryIngredients([...pantryIngredients, ing]);
    }
  };
  const handleRemoveIngredient = (ing: string) => {
    setPantryIngredients(pantryIngredients.filter(i => i !== ing));
  };
  const handleToggleSave = (recipe: Recipe) => {
    const isSaved = savedRecipes.some(r => r.id === recipe.id);
    if (isSaved) {
      setSavedRecipes(savedRecipes.filter(r => r.id !== recipe.id));
    } else {
      setSavedRecipes([...savedRecipes, recipe]);
    }
  };
  return <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8 bg-[#FFF8F0] relative">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
            <h1 className="font-sans text-5xl md:text-6xl font-bold text-[#FF6B35] mb-4 tracking-tight">
              Spice Kitchen
            </h1>
            <p className="font-sans text-[#F39C12] text-xl font-medium mb-8">
              Cook what you have. Discover what you love.
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12 text-lg">
              Tell us what you have in your kitchen. We'll help you find
              delicious recipes to make.
            </p>
          </motion.div>

          <PantryInput ingredients={pantryIngredients} onAddIngredient={handleAddIngredient} onRemoveIngredient={handleRemoveIngredient} onGenerate={() => generateRecipes(pantryIngredients)} isGenerating={isGenerating} />
        </div>

        {/* Decorative Divider */}
        <div className="flex justify-center items-center my-16 opacity-50">
          <div className="h-px bg-[#F39C12] w-24"></div>
          <div className="mx-4 text-[#FF6B35] text-2xl">✻</div>
          <div className="h-px bg-[#F39C12] w-24"></div>
        </div>
      </section>

      {/* Generated Recipes Section */}
      {generatedRecipes.length > 0 && <section className="py-12 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-sans text-3xl font-bold text-center text-[#FF6B35] mb-12">
              Recipes For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {generatedRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} isSaved={savedRecipes.some(r => r.id === recipe.id)} onToggleSave={handleToggleSave} />)}
            </div>
          </div>
        </section>}

      {/* Specials Section */}
      <section className="py-16 px-4 md:px-8 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#FF6B35] mb-2">
              Popular Recipes
            </h2>
            <div className="w-16 h-1 bg-[#F39C12] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SAMPLE_RECIPES.slice(0, 3).map(recipe => <RecipeCard key={recipe.id} recipe={recipe} isSaved={savedRecipes.some(r => r.id === recipe.id)} onToggleSave={handleToggleSave} />)}
          </div>
        </div>
      </section>

      <Footer />
    </div>;
}