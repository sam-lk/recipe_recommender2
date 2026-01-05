import React from 'react';
import { Check, Trash2, Printer } from 'lucide-react';
import { Ingredient } from '../types/recipe';
interface ShoppingListProps {
  items: Ingredient[];
  checkedItems: string[];
  onToggleItem: (item: string) => void;
  onClearList: () => void;
}
export function ShoppingList({
  items,
  checkedItems,
  onToggleItem,
  onClearList
}: ShoppingListProps) {
  const handlePrint = () => {
    window.print();
  };
  if (items.length === 0) {
    return <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500 font-sans text-lg">
          Your shopping list is empty.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Add recipes to your favorites to make a list.
        </p>
      </div>;
  }
  return <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-[#FF6B35] p-6 text-white flex justify-between items-center">
        <h2 className="font-sans text-2xl font-bold">Shopping List</h2>
        <div className="flex space-x-2">
          <button onClick={handlePrint} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Print">
            <Printer size={20} />
          </button>
          <button onClick={onClearList} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Clear All">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <ul className="space-y-1 divide-y divide-gray-100">
          {items.map((ing, idx) => {
          const id = `${ing.item}-${idx}`;
          const isChecked = checkedItems.includes(id);
          return <li key={id} className={`py-3 flex items-center group transition-colors ${isChecked ? 'opacity-50' : ''}`}>
                <button onClick={() => onToggleItem(id)} className={`w-6 h-6 rounded border mr-4 flex items-center justify-center transition-colors ${isChecked ? 'bg-[#F39C12] border-[#F39C12]' : 'border-gray-300 hover:border-[#F39C12]'}`}>
                  {isChecked && <Check size={14} className="text-white" />}
                </button>
                <div className="flex-1">
                  <span className={`text-sm font-medium ${isChecked ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {ing.item}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({ing.amount} {ing.unit})
                  </span>
                </div>
              </li>;
        })}
        </ul>
      </div>
    </div>;
}