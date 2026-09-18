import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistViewProps {
  wishlist: Product[];
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlist,
  onClose,
  onAddToCart,
  onRemoveFromWishlist,
  onSelectProduct
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[92vh] overflow-y-auto custom-scrollbar shadow-2xl relative text-gray-800 my-auto">
        
        {/* Header */}
        <div className="bg-[#2874f0] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-md">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-400 fill-current" />
            <h2 className="font-extrabold text-lg sm:text-xl tracking-tight">
              My Wishlist ({wishlist.length} Items)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 p-1.5 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 bg-gray-50">
          {wishlist.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border p-6">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">Empty Wishlist</h3>
              <p className="text-xs text-gray-500 mb-4">
                Save your favorite products to your wishlist so you can buy them anytime.
              </p>
              <button
                onClick={onClose}
                className="bg-[#2874f0] text-white font-bold px-6 py-2 rounded-sm text-xs hover:bg-blue-700 uppercase"
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-xs border border-gray-200 divide-y divide-gray-100">
              {wishlist.map((product) => (
                <div key={product.id} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center gap-4 cursor-pointer group flex-1"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-contain p-1 border rounded bg-gray-50 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-[#2874f0] transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-sm font-extrabold text-gray-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-green-700">
                          {product.discount}% Off
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex-1 sm:flex-none bg-[#ff9f00] hover:bg-amber-600 text-white font-bold px-4 py-2 rounded text-xs transition-colors flex items-center justify-center gap-1 uppercase"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Move to Cart
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
