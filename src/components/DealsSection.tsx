import React, { useState, useEffect } from 'react';
import { Clock, ChevronRight, Zap } from 'lucide-react';
import { Product } from '../types';

interface DealsSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAllDeals: () => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  products,
  onSelectProduct,
  onViewAllDeals
}) => {
  // Timer state countdown (14h 22m 45s)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter((p) => p.discount >= 10).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 my-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
        
        {/* Top Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-3 mb-3 gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-gray-900 font-extrabold text-lg sm:text-xl">
              <Zap className="w-5 h-5 text-yellow-500 fill-current" />
              <span>Deals of the Day</span>
            </div>

            {/* Countdown Clock Box */}
            <div className="flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1 rounded-md text-xs font-bold border border-red-200">
              <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>
                {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')} Left
              </span>
            </div>
          </div>

          <button
            onClick={onViewAllDeals}
            className="bg-[#2874f0] text-white text-xs font-bold px-4 py-2 rounded-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 self-start sm:self-auto shadow-xs"
          >
            VIEW ALL <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Scrolling Product List */}
        <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2 pt-1">
          {dealProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="min-w-[160px] sm:min-w-[200px] max-w-[200px] bg-white border border-gray-100 hover:border-blue-200 rounded-md p-3 flex flex-col items-center text-center cursor-pointer transition-all hover:shadow-md group relative shrink-0"
            >
              {/* Discount Tag Badge */}
              <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-xs z-10">
                {product.discount}% OFF
              </div>

              {/* Image Container */}
              <div className="w-32 h-32 mb-2 flex items-center justify-center p-1 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <h4 className="text-xs font-semibold text-gray-800 line-clamp-1 group-hover:text-[#2874f0] transition-colors w-full">
                {product.name}
              </h4>
              <p className="text-xs text-green-700 font-bold mt-1">
                From ₹{product.price.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-medium">
                {product.category.toUpperCase()} • Top Deal
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
