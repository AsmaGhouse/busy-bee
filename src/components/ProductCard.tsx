import React from 'react';
import { Heart, Star, ShoppingCart, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onClickProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onClickProduct
}) => {
  return (
    <div
      onClick={() => onClickProduct(product)}
      className="bg-white rounded-md border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-3 relative group cursor-pointer"
    >
      {/* Wishlist Heart Button */}
      <button
        onClick={(e) => onToggleWishlist(product, e)}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 shadow-sm transition-colors z-10"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWishlisted ? 'fill-red-500 text-red-500' : ''
          }`}
        />
      </button>

      <div>
        {/* Product Image */}
        <div className="w-full h-44 sm:h-48 mb-3 flex items-center justify-center p-2 relative overflow-hidden bg-gray-50/50 rounded-sm">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount >= 20 && (
            <span className="absolute bottom-2 left-2 bg-[#388e3c] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Brand & Name */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              {product.brand}
            </span>

            {/* Flipkart Assured Badge */}
            {product.isAssured && (
              <span className="bg-blue-600 text-yellow-300 font-extrabold italic text-[9px] px-1 py-0.2 rounded-sm flex items-center gap-0.5 shadow-2xs">
                <ShieldCheck className="w-2.5 h-2.5 text-yellow-300" /> Assured
              </span>
            )}
          </div>

          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-[#2874f0] transition-colors">
            {product.name}
          </h3>

          {/* Rating Badge */}
          <div className="flex items-center gap-1.5 pt-1">
            <div className="bg-green-700 text-white text-[11px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5 shadow-2xs">
              {product.rating} <Star className="w-2.5 h-2.5 fill-current" />
            </div>
            <span className="text-[11px] text-gray-500 font-medium">
              ({product.ratingCount.toLocaleString('en-IN')})
            </span>
          </div>

          {/* Pricing */}
          <div className="pt-2 flex items-baseline gap-2 flex-wrap">
            <span className="text-base sm:text-lg font-black text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs font-bold text-green-700">
              {product.discount}% off
            </span>
          </div>

          {/* Delivery Note */}
          <p className="text-[11px] text-gray-600 pt-0.5">
            Free delivery by <span className="font-semibold text-gray-800">Tomorrow</span>
          </p>
        </div>
      </div>

      {/* Quick Add to Cart Button */}
      <div className="pt-3 border-t border-gray-100 mt-3">
        <button
          onClick={(e) => onAddToCart(product, e)}
          className="w-full bg-[#ff9f00] hover:bg-amber-600 text-white font-bold py-2 rounded-sm text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs uppercase tracking-wider"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
        </button>
      </div>
    </div>
  );
};
