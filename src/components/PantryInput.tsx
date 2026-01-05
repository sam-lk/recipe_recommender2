import React, { useState } from 'react';
import { Plus, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface PantryInputProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}
export function PantryInput({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  onGenerate,
  isGenerating
}: PantryInputProps) {
  const [inputValue, setInputValue] = useState('');
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      onAddIngredient(inputValue.trim());
      setInputValue('');
    }
  };
  const handleAddClick = () => {
    if (inputValue.trim()) {
      onAddIngredient(inputValue.trim());
      setInputValue('');
    }
  };
  return <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl border border-[#F39C12]/30 relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#F39C12] m-2"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#F39C12] m-2"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#F39C12] m-2"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#F39C12] m-2"></div>

      <div className="text-center mb-6">
        <h2 className="font-sans text-2xl font-bold text-[#FF6B35] mb-2">
          What do you have in your kitchen?
        </h2>
        <p className="text-gray-500 text-sm">
          Add your ingredients below - AI will create a recipe for you!
        </p>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input type="text" className="block w-full pl-10 pr-12 py-3 border-b-2 border-[#FFF8F0] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F39C12] transition-colors bg-transparent text-lg" placeholder="e.g. Rice, Chicken, Tomatoes, Onions..." value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} disabled={isGenerating} />
        <button onClick={handleAddClick} disabled={isGenerating} className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#FF6B35] hover:text-[#F39C12] transition-colors disabled:opacity-50">
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {/* Tags Area */}
      <div className="flex flex-wrap gap-2 mb-8 min-h-[40px]">
        <AnimatePresence>
          {ingredients.map(ingredient => <motion.span key={ingredient} initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.8
        }} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#FFF8F0] text-[#FF6B35] border border-[#F39C12]/30">
              {ingredient}
              <button onClick={() => onRemoveIngredient(ingredient)} disabled={isGenerating} className="ml-2 focus:outline-none hover:text-[#F39C12] disabled:opacity-50">
                <X size={14} />
              </button>
            </motion.span>)}
        </AnimatePresence>
        {ingredients.length === 0 && <span className="text-gray-400 text-sm italic w-full text-center">
            Added ingredients will appear here
          </span>}
      </div>

      <div className="text-center">
        <button onClick={onGenerate} disabled={isGenerating || ingredients.length === 0} className={`
            px-8 py-3 bg-[#FF6B35] text-white font-sans font-semibold tracking-wide rounded-full shadow-md 
            hover:bg-[#e65a26] transition-all duration-300 transform hover:-translate-y-1
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            flex items-center justify-center mx-auto gap-2
          `}>
          {isGenerating ? <>
              <motion.div animate={{
            rotate: 360
          }} transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              Creating your recipe...
            </> : 'Find Recipes with AI'}
        </button>
        {ingredients.length > 0 && !isGenerating && <p className="text-xs text-gray-500 mt-3">
            ✨ Powered by free AI - No API key needed!
          </p>}
      </div>
    </div>;
}