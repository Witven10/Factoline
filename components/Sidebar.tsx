import React from 'react';
import { FilterCategory } from '../types';
import { SlidersHorizontal } from 'lucide-react';

type SelectedFilters = Record<string, string[]>;

interface SidebarProps {
  filters: FilterCategory[];
  selectedFilters: SelectedFilters;
  onFilterChange: (categoryId: string, optionId: string, checked: boolean) => void;
  onClearFilters: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  filters, 
  selectedFilters,
  onFilterChange,
  onClearFilters
}) => {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800">
            <SlidersHorizontal className="w-4 h-4" />
            <h2 className="font-bold text-sm uppercase tracking-wide">Affiner la recherche</h2>
          </div>
          <button 
            onClick={onClearFilters}
            className="text-xs font-medium text-brand-700 hover:underline hover:text-brand-800 transition-colors"
          >
            Tout effacer
          </button>
        </div>

        {/* Filter Groups */}
        <div className="p-4 space-y-6 max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
          {filters.map((category) => (
            <div key={category.id} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
              <h3 className="font-semibold text-slate-900 mb-3 text-sm">{category.title}</h3>
              <div className="space-y-2.5">
                {category.options.map((option) => {
                  const isChecked = (selectedFilters[category.id] || []).includes(option.id);
                  return (
                    <label key={option.id} className="flex items-center group cursor-pointer">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => onFilterChange(category.id, option.id, e.target.checked)}
                          className="peer h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600 cursor-pointer transition-colors"
                        />
                      </div>
                      <span className={`ml-3 text-sm group-hover:text-brand-700 transition-colors ${isChecked ? 'font-medium text-slate-900' : 'text-slate-600'}`}>
                        {option.label}
                      </span>
                      {option.count && (
                        <span className="ml-auto text-xs text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded-full group-hover:bg-slate-200 transition-colors">
                          {option.count}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
