import React from 'react';
import { Filter, X } from 'lucide-react';
import { DIETARY_OPTIONS, CUISINE_OPTIONS, DIFFICULTY_OPTIONS } from '../utils/constants';
import { FilterState } from '../types/recipe';
interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isOpen?: boolean;
  onClose?: () => void;
}
export function FilterPanel({
  filters,
  setFilters,
  isOpen,
  onClose
}: FilterPanelProps) {
  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[category] as string[];
      const updated = current.includes(value) ? current.filter(item => item !== value) : [...current, value];
      return {
        ...prev,
        [category]: updated
      };
    });
  };
  return <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full ${isOpen ? 'block' : 'hidden md:block'}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-sans text-lg font-bold text-[#FF6B35] flex items-center">
          <Filter size={18} className="mr-2" /> Filters
        </h3>
        {onClose && <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>}
      </div>

      {/* Dietary */}
      <div className="mb-8">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Dietary
        </h4>
        <div className="space-y-2">
          {DIETARY_OPTIONS.map(option => <label key={option} className="flex items-center cursor-pointer group">
              <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center transition-colors ${filters.dietary.includes(option) ? 'bg-[#FF6B35] border-[#FF6B35]' : 'border-gray-300 group-hover:border-[#FF6B35]'}`}>
                {filters.dietary.includes(option) && <span className="text-white text-xs">✓</span>}
              </div>
              <input type="checkbox" className="hidden" checked={filters.dietary.includes(option)} onChange={() => toggleFilter('dietary', option)} />
              <span className={`text-sm ${filters.dietary.includes(option) ? 'text-[#FF6B35] font-medium' : 'text-gray-600'}`}>
                {option}
              </span>
            </label>)}
        </div>
      </div>

      {/* Cuisine */}
      <div className="mb-8">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Cuisine
        </h4>
        <div className="flex flex-wrap gap-2">
          {CUISINE_OPTIONS.map(option => <button key={option} onClick={() => toggleFilter('cuisine', option)} className={`px-3 py-1 text-xs rounded-full border transition-colors ${filters.cuisine.includes(option) ? 'bg-[#FF6B35] text-white border-[#FF6B35]' : 'bg-transparent text-gray-600 border-gray-200 hover:border-[#FF6B35]'}`}>
              {option}
            </button>)}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Difficulty
        </h4>
        <div className="space-y-2">
          {DIFFICULTY_OPTIONS.map(option => <label key={option} className="flex items-center cursor-pointer group">
              <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center transition-colors ${filters.difficulty.includes(option) ? 'border-[#F39C12]' : 'border-gray-300'}`}>
                <div className={`w-2 h-2 rounded-full ${filters.difficulty.includes(option) ? 'bg-[#F39C12]' : 'bg-transparent'}`} />
              </div>
              <input type="checkbox" className="hidden" checked={filters.difficulty.includes(option)} onChange={() => toggleFilter('difficulty', option)} />
              <span className="text-sm text-gray-600">{option}</span>
            </label>)}
        </div>
      </div>
    </div>;
}