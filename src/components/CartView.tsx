import React from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  MapPin,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { CartItem, Address } from '../types';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onCloseCart: () => void;
  currentAddress: Address;
}

export const CartView: React.FC<CartViewProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onCloseCart,
  currentAddress
}) => {
  const totalMrp = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const totalSelling = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalDiscount = totalMrp - totalSelling;
  const deliveryFee = totalSelling > 500 || cart.length === 0 ? 0 : 40;
  const finalPayable = totalSelling + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center shadow-2xl relative">
          <button
            onClick={onCloseCart}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-20 h-20 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Your Cart is Empty!</h3>
          <p className="text-xs text-gray-500 mb-6">
            Explore our wide range of products across Mobiles, Electronics, Fashion & Grocery to add items to your cart.
          </p>
          <button
            onClick={onCloseCart}
            className="w-full bg-[#2874f0] text-white font-bold py-2.5 rounded-sm hover:bg-blue-700 transition-colors uppercase tracking-wider text-xs shadow-md"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[92vh] overflow-y-auto custom-scrollbar shadow-2xl relative text-gray-800 my-auto">
        
        {/* Header */}
        <div className="bg-[#2874f0] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-yellow-300" />
            <h2 className="font-extrabold text-lg sm:text-xl tracking-tight">
              My Cart ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})
            </h2>
          </div>
          <button
            onClick={onCloseCart}
            className="bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6 bg-gray-50">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Delivery Address Header Strip */}
            <div className="bg-white p-4 rounded-md shadow-xs border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#2874f0]" />
                <div className="text-xs">
                  <span className="text-gray-500">Deliver to: </span>
                  <span className="font-bold text-gray-900">{currentAddress.name}, {currentAddress.pincode}</span>
                  <span className="ml-2 bg-blue-50 text-[#2874f0] px-1.5 py-0.5 rounded font-semibold text-[10px] uppercase">
                    {currentAddress.type}
                  </span>
                </div>
              </div>
              <span className="text-xs text-[#2874f0] font-bold cursor-pointer hover:underline">
                Change
              </span>
            </div>

            {/* Cart Items */}
            <div className="bg-white rounded-md shadow-xs border border-gray-200 divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.product.id} className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-contain p-1 border rounded bg-gray-50 shrink-0"
                    />
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Seller: <span className="font-semibold text-gray-700">RetailNet</span>
                      </p>
                      
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-base font-extrabold text-gray-900">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-green-700">
                          {item.product.discount}% Off
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-4 self-end sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors uppercase tracking-wider"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded-md shadow-xs border border-gray-200 flex justify-end">
              <button
                onClick={onProceedToCheckout}
                className="bg-[#fb641b] hover:bg-orange-600 text-white font-extrabold px-8 py-3 rounded-sm shadow-md transition-all uppercase tracking-wider text-sm flex items-center gap-2"
              >
                Place Order <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Price Details Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-md shadow-xs border border-gray-200 p-4 space-y-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-2">
                Price Details
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-700">
                  <span>Price ({cart.length} items)</span>
                  <span>₹{totalMrp.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-green-700 font-semibold">
                  <span>Discount</span>
                  <span>- ₹{totalDiscount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charges</span>
                  <span className={deliveryFee === 0 ? 'text-green-700 font-bold' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-3 flex justify-between text-sm font-extrabold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-[#2874f0]">₹{finalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Total Savings Callout */}
              <div className="bg-green-50 p-2.5 rounded border border-green-200 text-xs font-bold text-green-800 text-center">
                You will save ₹{totalDiscount.toLocaleString('en-IN')} on this order!
              </div>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-gray-500">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
