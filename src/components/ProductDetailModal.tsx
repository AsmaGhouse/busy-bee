import React, { useState } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  Tag,
  CreditCard,
  ShoppingCart,
  Zap,
  MapPin,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { Product } from '../types';
import { mockApi } from '../services/mockApi';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  currentPincode: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  currentPincode
}) => {
  if (!product) return null;

  const [selectedImg, setSelectedImg] = useState(product.image);
  const [pincode, setPincode] = useState(currentPincode || '560001');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');

  const handleCheckPincode = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await mockApi.checkPincode(pincode);
    setPincodeResult(res.message);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[92vh] overflow-y-auto custom-scrollbar shadow-2xl relative text-gray-800 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center justify-center h-72 sm:h-80">
              <img
                src={selectedImg}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />
              <button
                onClick={() => onToggleWishlist(product)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                />
              </button>
            </div>

            {/* Thumbnail switcher */}
            {product.additionalImages && product.additionalImages.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {[product.image, ...product.additionalImages].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`w-16 h-16 rounded border p-1 bg-white flex items-center justify-center transition-all ${
                      selectedImg === img
                        ? 'border-[#2874f0] ring-2 ring-blue-100 scale-105'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Action CTAs */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  onAddToCart(product);
                }}
                className="bg-[#ff9f00] hover:bg-amber-600 text-white font-extrabold py-3 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs sm:text-sm"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={() => {
                  onBuyNow(product);
                }}
                className="bg-[#fb641b] hover:bg-orange-600 text-white font-extrabold py-3 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs sm:text-sm"
              >
                <Zap className="w-4 h-4 fill-current" /> Buy Now
              </button>
            </div>
          </div>

          {/* Right Column: Product Info & Offers */}
          <div className="space-y-4">
            
            {/* Title & Brand */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {product.brand}
                </span>
                {product.isAssured && (
                  <span className="bg-amber-500 text-blue-950 font-extrabold italic text-xs px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" /> AK Assured
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mt-1">
                {product.name}
              </h2>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="bg-green-700 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                {product.rating} <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {product.ratingCount.toLocaleString('en-IN')} Ratings & Reviews
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-green-50/60 border border-green-100 p-3 rounded-md flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-bold text-green-700">
                {product.discount}% OFF
              </span>
            </div>

            {/* Available Bank Offers */}
            {product.bankOffers && product.bankOffers.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-green-600" /> Available Offers
                </p>
                <div className="space-y-1 bg-gray-50 p-2.5 rounded border border-gray-200">
                  {product.bankOffers.map((offer, idx) => (
                    <div key={idx} className="text-xs text-gray-700 flex items-start gap-1.5">
                      <span className="text-green-600 font-bold">Bank Offer</span>
                      <span>{offer}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection if available */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Color: <span className="text-[#2874f0]">{selectedColor}</span>
                </label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`text-xs px-3 py-1 rounded border font-medium transition-all ${
                        selectedColor === color
                          ? 'border-[#2874f0] bg-blue-50 text-[#2874f0] font-bold'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection if available */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Select Size: <span className="text-[#2874f0]">{selectedSize}</span>
                </label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`text-xs px-3 py-1 rounded border font-medium transition-all ${
                        selectedSize === size
                          ? 'border-[#2874f0] bg-blue-50 text-[#2874f0] font-bold'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pincode Availability Checker */}
            <div className="border-t border-gray-200 pt-3">
              <form onSubmit={handleCheckPincode} className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2874f0]" /> Delivery Options & Pincode
                </label>
                <div className="flex gap-2 max-w-xs">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#2874f0]"
                  />
                  <button
                    type="submit"
                    className="bg-[#2874f0] text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700"
                  >
                    Check
                  </button>
                </div>
                {pincodeResult && (
                  <p className="text-xs text-blue-700 font-semibold bg-blue-50 p-2 rounded">
                    {pincodeResult}
                  </p>
                )}
              </form>
            </div>

            {/* Specs Table */}
            <div className="border-t border-gray-200 pt-3">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
                Specifications
              </h4>
              <div className="bg-gray-50 rounded border border-gray-200 divide-y divide-gray-200">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-3 p-2 text-xs">
                    <span className="text-gray-500 font-medium">{key}</span>
                    <span className="col-span-2 text-gray-900 font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Reviews Section */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="border-t border-gray-200 pt-3 space-y-2">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Verified Customer Reviews
                </h4>
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="bg-gray-50 p-2.5 rounded border border-gray-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-800">{rev.userName}</span>
                      <span className="text-gray-400 text-[10px]">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-700 font-bold mb-1">
                      <span>{rev.rating}★</span>
                      <span className="text-gray-800 font-semibold">{rev.title}</span>
                    </div>
                    <p className="text-gray-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
