import React from 'react';
import {
  ShoppingBag,
  Smartphone,
  Shirt,
  Laptop,
  Home,
  Tv,
  Smile,
  Bike,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string | undefined;
  onSelectCategory: (categoryId: string | undefined) => void;
  onSelectSubcategory: (categoryId: string, subcategory: string) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-green-600" />;
    case 'Smartphone': return <Smartphone className="w-5 h-5 text-blue-600" />;
    case 'Shirt': return <Shirt className="w-5 h-5 text-indigo-600" />;
    case 'Laptop': return <Laptop className="w-5 h-5 text-purple-600" />;
    case 'Home': return <Home className="w-5 h-5 text-amber-600" />;
    case 'Tv': return <Tv className="w-5 h-5 text-red-600" />;
    case 'Smile': return <Smile className="w-5 h-5 text-pink-600" />;
    case 'Bike': return <Bike className="w-5 h-5 text-teal-600" />;
    default: return <Sparkles className="w-5 h-5 text-yellow-500" />;
  }
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onSelectSubcategory
}) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-center flex-wrap py-2 sm:py-3 gap-2 sm:gap-6">
          
          {/* "All" button */}
          <button
            onClick={() => onSelectCategory(undefined)}
            className={`flex flex-col items-center justify-center min-w-[64px] px-2 py-1 rounded-md transition-all group shrink-0 ${
              selectedCategory === undefined
                ? 'text-[#2874f0] font-bold border-b-2 border-[#2874f0]'
                : 'text-gray-700 hover:text-[#2874f0]'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-xs">
              <Sparkles className="w-5 h-5 text-[#2874f0]" />
            </div>
            <span className="text-xs font-semibold whitespace-nowrap">All Items</span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div key={cat.id} className="relative group shrink-0">
                <button
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex flex-col items-center justify-center px-2.5 py-1 rounded-md transition-all group ${
                    isSelected
                      ? 'text-[#2874f0] font-bold border-b-2 border-[#2874f0]'
                      : 'text-gray-700 hover:text-[#2874f0]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-blue-50 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-xs border border-gray-100">
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="w-8 h-8 object-contain rounded-full" />
                    ) : (
                      getCategoryIcon(cat.icon)
                    )}
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-xs font-semibold whitespace-nowrap">{cat.name}</span>
                    {cat.subcategories.length > 0 && (
                      <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-[#2874f0] transition-transform group-hover:rotate-180" />
                    )}
                  </div>
                </button>

                {/* Subcategory Hover Menu */}
                {cat.subcategories.length > 0 && (
                  <div className="absolute left-0 top-full hidden group-hover:block w-48 pt-1 z-50">
                    <div className="bg-white rounded-md shadow-xl border border-gray-200 py-1 text-left">
                      <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100 text-[10px] font-bold uppercase text-gray-500 tracking-wider">
                        {cat.name} Categories
                      </div>
                      {cat.subcategories.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectSubcategory(cat.id, sub);
                          }}
                          className="w-full px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-[#2874f0] text-left transition-colors font-medium flex items-center justify-between border-b border-gray-50 last:border-0"
                        >
                          {sub}
                          <span className="text-gray-400 text-[10px]">›</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};
