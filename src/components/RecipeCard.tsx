import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flame, ChefHat, Heart, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { COLORS } from '../utils/constants';
interface RecipeCardProps {
  recipe: Recipe;
  isSaved?: boolean;
  onToggleSave?: (recipe: Recipe) => void;
}
export function RecipeCard({
  recipe,
  isSaved = false,
  onToggleSave
}: RecipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'preparation'>('ingredients');
  return <motion.div layout className="bg-white rounded-lg shadow-lg border-t-4 border-[#FF6B35] overflow-hidden relative" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4
  }}>
      {/* Header Section */}
      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-sans text-xl font-bold text-[#2C1810] leading-tight pr-8">
            {recipe.title}
          </h3>
          <button onClick={() => onToggleSave?.(recipe)} className="text-[#FF6B35] hover:scale-110 transition-transform focus:outline-none">
            <Heart size={24} fill={isSaved ? COLORS.primary : 'none'} className={isSaved ? 'text-[#FF6B35]' : 'text-gray-300 hover:text-[#FF6B35]'} />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-6 border-l-2 border-[#F39C12] pl-4">
          {recipe.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide border-t border-b border-gray-100 py-3">
          <div className="flex items-center">
            <Clock size={14} className="mr-1 text-[#F39C12]" />
            {recipe.timeMinutes} Mins
          </div>
          <div className="flex items-center">
            <Flame size={14} className="mr-1 text-[#F39C12]" />
            {recipe.difficulty}
          </div>
          <div className="flex items-center">
            <ChefHat size={14} className="mr-1 text-[#F39C12]" />
            {recipe.caloriesPerServing} kcal
          </div>
          <div className="flex items-center">
            <Users size={14} className="mr-1 text-[#F39C12]" />
            Serves {recipe.servings}
          </div>
        </div>
      </div>

      {/* Expand/Collapse Button */}
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full py-3 bg-[#FFF8F0] text-[#FF6B35] hover:bg-[#ffe0d0] transition-colors flex justify-center items-center text-xs uppercase tracking-widest font-bold">
        {isExpanded ? <>
            Close Recipe <ChevronUp size={16} className="ml-1" />
          </> : <>
            View Recipe <ChevronDown size={16} className="ml-1" />
          </>}
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }} className="overflow-hidden bg-[#FAFAFA]">
            <div className="p-6">
              {/* Tabs */}
              <div className="flex mb-6 border-b border-gray-200">
                <button onClick={() => setActiveTab('ingredients')} className={`pb-2 px-4 text-sm font-sans font-bold transition-colors relative ${activeTab === 'ingredients' ? 'text-[#FF6B35]' : 'text-gray-400 hover:text-gray-600'}`}>
                  Ingredients
                  {activeTab === 'ingredients' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35]" />}
                </button>
                <button onClick={() => setActiveTab('preparation')} className={`pb-2 px-4 text-sm font-sans font-bold transition-colors relative ${activeTab === 'preparation' ? 'text-[#FF6B35]' : 'text-gray-400 hover:text-gray-600'}`}>
                  Preparation
                  {activeTab === 'preparation' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35]" />}
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                {activeTab === 'ingredients' ? <motion.ul initial={{
              opacity: 0,
              x: -10
            }} animate={{
              opacity: 1,
              x: 0
            }} className="space-y-3">
                    {recipe.ingredients.map((ing, idx) => <li key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F39C12] mt-1.5 mr-3 flex-shrink-0" />
                        <span>
                          <span className="font-semibold">
                            {ing.amount} {ing.unit}
                          </span>{' '}
                          {ing.item}
                        </span>
                      </li>)}
                  </motion.ul> : <motion.div initial={{
              opacity: 0,
              x: 10
            }} animate={{
              opacity: 1,
              x: 0
            }} className="space-y-6">
                    {recipe.preparation.map((step, idx) => <div key={idx} className="flex">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full border border-[#F39C12] text-[#F39C12] font-sans font-bold flex items-center justify-center mr-4 text-sm">
                          {idx + 1}
                        </span>
                        <p className="text-sm text-gray-700 pt-1 leading-relaxed">
                          {step}
                        </p>
                      </div>)}
                  </motion.div>}
              </div>

              <div className="mt-8 text-center">
                <span className="font-sans text-xl text-[#F39C12] opacity-80 font-medium">
                  Enjoy your meal!
                </span>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
}