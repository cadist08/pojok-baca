import React from 'react';
import { BookCategory } from '../types';
import { CATEGORIES_DATA } from '../data/categories';
import { 
  GraduationCap, 
  Smile, 
  Sparkles, 
  Globe, 
  Landmark, 
  HeartHandshake, 
  Laptop, 
  Scissors, 
  Sprout, 
  HeartPulse, 
  Layers 
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: BookCategory | 'Semua';
  onSelectCategory: (category: BookCategory | 'Semua') => void;
  categoryCounts: Record<string, number>;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Smile,
  Sparkles,
  Globe,
  Landmark,
  HeartHandshake,
  Laptop,
  Scissors,
  Sprout,
  HeartPulse,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div id="category-filter-bar" className="space-y-4">
      {/* Category Pills Slider / Wrap */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        
        {/* 'Semua' button */}
        <button
          id="category-pill-all"
          onClick={() => onSelectCategory('Semua')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs ${
            selectedCategory === 'Semua'
              ? 'bg-[#0A192F] text-[#D4AF37] ring-1.5 ring-[#D4AF37] shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 text-[#D4AF37]" />
          <span>Semua Koleksi</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
            selectedCategory === 'Semua' ? 'bg-[#162A45] text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            {(Object.values(categoryCounts) as number[]).reduce((a: number, b: number) => a + b, 0)}
          </span>
        </button>

        {/* Categories from array */}
        {CATEGORIES_DATA.map((cat) => {
          const Icon = iconMap[cat.iconName] || Sparkles;
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              id={`category-pill-${cat.id.toLowerCase()}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs ${
                isSelected
                  ? 'bg-[#0A192F] text-[#D4AF37] ring-1.5 ring-[#D4AF37] shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D4AF37]' : 'text-slate-500'}`} />
              <span>{cat.name}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                isSelected ? 'bg-[#162A45] text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
};
