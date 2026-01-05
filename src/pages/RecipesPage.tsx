import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { RecipeCard } from '../components/RecipeCard';
import { FilterPanel } from '../components/FilterPanel';
import { SAMPLE_RECIPES } from '../utils/constants';
import { Recipe, FilterState } from '../types/recipe';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Search } from 'lucide-react';
export function RecipesPage() {
  const [savedRecipes, setSavedRecipes] = useLocalStorage<Recipe[]>('savedRecipes', []);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    dietary: [],
    cuisine: [],
    difficulty: [],
    maxTime: null
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleToggleSave = (recipe: Recipe) => {
    const isSaved = savedRecipes.some(r => r.id === recipe.id);
    if (isSaved) {
      setSavedRecipes(savedRecipes.filter(r => r.id !== recipe.id));
    } else {
      setSavedRecipes([...savedRecipes, recipe]);
    }
  };
  // Filter Logic
  const filteredRecipes = SAMPLE_RECIPES.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(filters.search.toLowerCase()) || recipe.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesDietary = filters.dietary.length === 0 || filters.dietary.every(tag => recipe.dietaryTags.includes(tag));
    const matchesCuisine = filters.cuisine.length === 0 || filters.cuisine.includes(recipe.cuisine);
    const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(recipe.difficulty);
    return matchesSearch && matchesDietary && matchesCuisine && matchesDifficulty;
  });
  return <div className="min-h-screen flex flex-col bg-[#FFF8F0]">
      <Navigation />

      <div className="pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="md:sticky md:top-24">
              <FilterPanel filters={filters} setFilters={setFilters} isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-8">
              <h1 className="font-sans text-4xl font-bold text-[#FF6B35] mb-6">
                All Recipes
              </h1>

              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input type="text" placeholder="Search recipes..." className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FF6B35]" value={filters.search} onChange={e => setFilters({
                  ...filters,
                  search: e.target.value
                })} />
                </div>
                <button className="md:hidden px-4 py-2 bg-white border border-gray-200 rounded-lg" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                  Filters
                </button>
              </div>
            </div>

            {filteredRecipes.length > 0 ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} isSaved={savedRecipes.some(r => r.id === recipe.id)} onToggleSave={handleToggleSave} />)}
              </div> : <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 font-sans text-xl">
                  No recipes found.
                </p>
                <button onClick={() => setFilters({
              search: '',
              dietary: [],
              cuisine: [],
              difficulty: [],
              maxTime: null
            })} className="mt-4 text-[#FF6B35] underline hover:text-[#F39C12]">
                  Clear all filters
                </button>
              </div>}
          </main>
        </div>
      </div>

      <Footer />
    </div>;
}