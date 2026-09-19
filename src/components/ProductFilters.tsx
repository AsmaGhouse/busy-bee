import React from 'react';
import { Filter, Star, ShieldCheck, RefreshCw } from 'lucide-react';
import { FilterOptions } from '../types';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
  onResetFilters: () => void;
  availableBrands: string[];
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableBrands
}) => {
  const handleRatingChange = (minRating: number) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === minRating ? undefined : minRating
    });
  };

  const handleAssuredToggle = () => {
    onFilterChange({
      ...filters,
      fAssuredOnly: !filters.fAssuredOnly
    });
  };

  const handleBrandToggle = (brand: string) => {
    const currentBrands = filters.brands || [];
    const updated = currentBrands.includes(brand)
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand];
    onFilterChange({ ...filters, brands: updated });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFilterChange({ ...filters, sortBy });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-5 text-gray-800">
      
      {/* Header & Reset */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-1.5 font-bold text-gray-900 text-sm uppercase tracking-wider">
          <Filter className="w-4 h-4 text-[#2874f0]" /> Filters
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-[#2874f0] font-semibold hover:underline flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Clear All
        </button>
      </div>

      {/* AK Assured Filter */}
      <div className="bg-blue-50/60 p-2.5 rounded border border-blue-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-500" />
          <div>
            <p className="text-xs font-bold text-gray-900">AK Assured</p>
            <p className="text-[10px] text-gray-500">Quality checked products</p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={!!filters.fAssuredOnly}
          onChange={handleAssuredToggle}
          className="w-4 h-4 accent-[#2874f0] rounded cursor-pointer"
        />
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy || 'popularity'}
          onChange={(e) => handleSortChange(e.target.value as FilterOptions['sortBy'])}
          className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#2874f0]"
        >
          <option value="popularity">Popularity / Relevance</option>
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
          <option value="newest">Newest Arrivals</option>
        </select>
      </div>

      {/* Price Range Slider */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Max Price (₹)
        </label>
        <input
          type="range"
          min="500"
          max="150000"
          step="1000"
          value={filters.maxPrice || 150000}
          onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[#2874f0]"
        />
        <div className="flex justify-between text-xs font-semibold text-gray-600 mt-1">
          <span>₹500</span>
          <span className="text-[#2874f0]">Up to ₹{(filters.maxPrice || 150000).toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Customer Rating
        </label>
        <div className="space-y-1.5">
          {[4, 3, 2].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between border transition-colors ${
                filters.minRating === rating
                  ? 'bg-blue-50 border-[#2874f0] text-[#2874f0] font-bold'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-1">
                <span>{rating}★ & Above</span>
              </div>
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Brand Checkboxes */}
      {availableBrands.length > 0 && (
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Brands
          </label>
          <div className="space-y-1.5 max-h-40 overflow-y-auto custom-scrollbar pr-1">
            {availableBrands.map((brand) => {
              const isChecked = (filters.brands || []).includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center justify-between text-xs text-gray-700 cursor-pointer hover:text-[#2874f0] select-none py-0.5"
                >
                  <span>{brand}</span>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-3.5 h-3.5 accent-[#2874f0] rounded"
                  />
                </label>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
