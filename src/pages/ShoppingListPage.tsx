import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ShoppingList } from '../components/ShoppingList';
import { Recipe, Ingredient } from '../types/recipe';
import { useLocalStorage } from '../hooks/useLocalStorage';
export function ShoppingListPage() {
  const [savedRecipes] = useLocalStorage<Recipe[]>('savedRecipes', []);
  const [checkedItems, setCheckedItems] = useLocalStorage<string[]>('checkedShoppingItems', []);
  const [aggregatedIngredients, setAggregatedIngredients] = useState<Ingredient[]>([]);
  useEffect(() => {
    // Simple aggregation logic
    const allIngredients: Ingredient[] = [];
    savedRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        allIngredients.push(ing);
      });
    });
    setAggregatedIngredients(allIngredients);
  }, [savedRecipes]);
  const handleToggleItem = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter(item => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };
  const handleClearList = () => {
    if (window.confirm('Are you sure you want to clear your shopping list?')) {
      setCheckedItems([]);
    }
  };
  return <div className="min-h-screen flex flex-col bg-[#FFF8F0]">
      <Navigation />

      <div className="pt-32 pb-12 px-4 md:px-8 max-w-3xl mx-auto w-full flex-1">
        <div className="mb-8">
          <h1 className="font-sans text-4xl font-bold text-[#FF6B35] mb-4">
            Shopping List
          </h1>
          <p className="text-gray-600">
            Ingredients from your {savedRecipes.length} favorite recipe
            {savedRecipes.length !== 1 ? 's' : ''}.
          </p>
        </div>

        <ShoppingList items={aggregatedIngredients} checkedItems={checkedItems} onToggleItem={handleToggleItem} onClearList={handleClearList} />
      </div>

      <Footer />
    </div>;
}