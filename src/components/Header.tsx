import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  ChevronDown,
  Mic,
  Package,
  ShieldCheck,
  Bell,
  HelpCircle,
  TrendingUp,
  X
} from 'lucide-react';
import { mockApi } from '../services/mockApi';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  onSelectCategory: (category: string | undefined) => void;
  onSearch: (query: string) => void;
  currentPincode: string;
  onChangePincode: (pincode: string, city: string) => void;
  activeSearchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  onSelectCategory,
  onSearch,
  currentPincode,
  onChangePincode,
  activeSearchQuery
}) => {
  const [searchInput, setSearchInput] = useState(activeSearchQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [pincodeInput, setPincodeInput] = useState(currentPincode);
  const [pincodeMsg, setPincodeMsg] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchInput(activeSearchQuery);
  }, [activeSearchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);
    if (val.trim().length >= 2) {
      const sugs = await mockApi.getSearchSuggestions(val);
      setSuggestions(sugs);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (sug: string) => {
    setSearchInput(sug);
    onSearch(sug);
    setShowSuggestions(false);
  };

  const handlePincodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPincodeMsg('Checking pincode...');
    const result = await mockApi.checkPincode(pincodeInput);
    if (result.serviceable) {
      onChangePincode(pincodeInput, result.city);
      setPincodeMsg(`Updated to ${result.city}, ${result.state}`);
      setTimeout(() => {
        setShowPincodeModal(false);
        setPincodeMsg('');
      }, 1000);
    } else {
      setPincodeMsg(result.message);
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setSearchInput('iPhone 15 Pro');
      onSearch('iPhone 15 Pro');
      setIsListening(false);
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#2874f0] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSelectCategory(undefined);
                onSearch('');
              }}
              className="flex items-center gap-2 focus:outline-none group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-[#0f2850] font-black text-xl flex items-center justify-center shadow-md tracking-tighter border border-amber-200/50 group-hover:scale-105 transition-transform">
                AK
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold italic text-xl sm:text-2xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                    AK Store
                  </span>
                  <span className="bg-amber-400 text-[#0f2850] font-black italic text-[10px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider shadow-sm">
                    Prime
                  </span>
                </div>
                <div className="flex items-center text-[10px] text-amber-200 font-medium tracking-normal -mt-0.5">
                  Explore <span className="text-amber-300 font-bold mx-0.5">AK Prime</span>
                  <span className="text-amber-300 ml-0.5 font-extrabold">✦</span>
                </div>
              </div>
            </button>

            {/* Pincode Selector Chip */}
            <button
              onClick={() => setShowPincodeModal(true)}
              className="hidden md:flex items-center gap-1.5 bg-blue-700/60 hover:bg-blue-700 text-xs px-2.5 py-1.5 rounded text-blue-50 border border-blue-400/30 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              <div className="text-left leading-tight">
                <span className="block text-[10px] text-blue-200">Deliver to</span>
                <span className="font-semibold">{currentPincode || 'Select Pincode'}</span>
              </div>
              <ChevronDown className="w-3 h-3 text-blue-200" />
            </button>
          </div>

          {/* Search Bar with Autocomplete */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                onFocus={() => searchInput.trim().length >= 2 && setShowSuggestions(true)}
                placeholder="Search for products, brands and more (e.g. Mobiles, Laptops, Kurti)..."
                className="w-full py-2 pl-3 pr-20 text-sm bg-white text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner placeholder-gray-500"
              />
              <button
                type="button"
                onClick={handleVoiceSearch}
                title="Voice Search"
                className={`absolute right-10 p-1.5 text-gray-500 hover:text-[#2874f0] transition-colors ${
                  isListening ? 'text-red-500 animate-pulse' : ''
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-3 bg-[#2874f0] text-white rounded-r-sm hover:bg-blue-700 transition-colors flex items-center justify-center border-l border-gray-200"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </form>

            {/* Suggestions Popover */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white text-gray-800 rounded-b-md shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="px-3 py-1.5 bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1 border-b">
                  <TrendingUp className="w-3 h-3 text-[#2874f0]" /> Suggestions
                </div>
                <ul>
                  {suggestions.map((sug, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => handleSelectSuggestion(sug)}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm text-gray-700 flex items-center justify-between border-b border-gray-100 last:border-0"
                      >
                        <span className="flex items-center gap-2">
                          <Search className="w-3.5 h-3.5 text-gray-400" />
                          {sug}
                        </span>
                        <span className="text-xs text-[#2874f0] font-medium">Search</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4 font-medium text-sm">

            {/* Login Button / Modal Trigger */}
            <div className="relative group">
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-white text-[#2874f0] px-5 py-1.5 rounded-sm font-semibold hover:bg-gray-100 transition-colors border border-white shadow-sm flex items-center gap-1"
              >
                Login
              </button>

              {/* Account Hover Dropdown */}
              <div className="absolute right-0 top-full hidden group-hover:block w-56 pt-2 z-50">
                <div className="bg-white text-gray-800 rounded-sm shadow-xl border border-gray-200 overflow-hidden py-1">
                  <div className="px-4 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">New customer?</p>
                      <p className="text-xs font-bold text-[#2874f0]">Sign Up for AK Prime</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onOpenWishlist();
                    }}
                    className="w-full px-4 py-2.5 text-left text-xs text-gray-700 hover:bg-blue-50 hover:text-[#2874f0] flex items-center gap-2.5 border-b border-gray-100"
                  >
                    <Heart className="w-4 h-4 text-red-500" /> Wishlist ({wishlistCount})
                  </button>
                  <button
                    onClick={() => {
                      onOpenOrders();
                    }}
                    className="w-full px-4 py-2.5 text-left text-xs text-gray-700 hover:bg-blue-50 hover:text-[#2874f0] flex items-center gap-2.5 border-b border-gray-100"
                  >
                    <Package className="w-4 h-4 text-[#2874f0]" /> Orders & Tracking
                  </button>
                  <div className="px-4 py-2 text-[11px] text-gray-500 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" /> 100% Safe Payments
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Link */}
            <a
              href="#become-seller"
              onClick={(e) => {
                e.preventDefault();
                alert('AK Seller Hub: Register your business today to reach millions of buyers!');
              }}
              className="hidden lg:block hover:text-yellow-300 transition-colors text-xs font-semibold whitespace-nowrap"
            >
              Become a Seller
            </a>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              className="relative p-1.5 hover:text-yellow-300 transition-colors flex items-center gap-1"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {wishlistCount}
                </span>
              )}
              <span className="hidden xl:inline text-xs font-semibold">Wishlist</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative bg-blue-700/80 hover:bg-blue-800 px-3 py-1.5 rounded-sm flex items-center gap-2 transition-all border border-blue-400/40"
            >
              <ShoppingCart className="w-5 h-5 text-yellow-300" />
              <span className="font-bold text-xs text-white">Cart</span>
              {cartCount > 0 && (
                <span className="bg-yellow-400 text-[#2874f0] font-black text-xs px-1.5 py-0.2 rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Voice Search Modal */}
      {isListening && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center text-gray-800 shadow-2xl">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
              <Mic className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-1">Listening...</h3>
            <p className="text-xs text-gray-500 mb-4">Say "iPhone 15", "Laptops", or "Kurti"</p>
            <div className="flex justify-center gap-1">
              <div className="w-2 h-6 bg-red-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-8 bg-red-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-5 bg-red-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      )}

      {/* Pincode Location Modal */}
      {showPincodeModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-gray-800 rounded-lg max-w-md w-full p-5 shadow-2xl relative">
            <button
              onClick={() => setShowPincodeModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3 text-[#2874f0]">
              <MapPin className="w-6 h-6" />
              <h3 className="font-bold text-lg">Choose Your Delivery Location</h3>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Enter your Indian pincode to check product availability, bank offers, and estimated delivery dates.
            </p>
            <form onSubmit={handlePincodeSubmit} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode (e.g. 560001)"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2874f0]"
                />
                <button
                  type="submit"
                  className="bg-[#2874f0] text-white px-5 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Check
                </button>
              </div>

              {pincodeMsg && (
                <p className="text-xs font-semibold text-blue-600 mt-2 bg-blue-50 p-2 rounded">
                  {pincodeMsg}
                </p>
              )}

              <div className="pt-2">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Popular Indian Cities:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { city: 'Bengaluru', pin: '560001' },
                    { city: 'Delhi', pin: '110001' },
                    { city: 'Mumbai', pin: '400001' },
                    { city: 'Chennai', pin: '600001' },
                    { city: 'Kolkata', pin: '700001' },
                    { city: 'Hyderabad', pin: '500001' }
                  ].map((item) => (
                    <button
                      key={item.pin}
                      type="button"
                      onClick={() => {
                        setPincodeInput(item.pin);
                        onChangePincode(item.pin, item.city);
                        setShowPincodeModal(false);
                      }}
                      className="text-xs bg-gray-100 hover:bg-blue-100 hover:text-[#2874f0] text-gray-700 px-2.5 py-1 rounded transition-colors"
                    >
                      {item.city} ({item.pin})
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Popup Simulation */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-gray-800 rounded-lg max-w-2xl w-full flex overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-2/5 bg-[#2874f0] p-6 text-white flex flex-col justify-between hidden sm:flex">
              <div>
                <h3 className="font-bold text-2xl mb-2">Login</h3>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Get access to your Orders, Wishlist, Recommendations, and Coins!
                </p>
              </div>
              <div className="text-xs text-blue-200">
                <span className="font-bold">AK Store</span> Secure Verification System
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-center">
              <h4 className="font-bold text-lg mb-1 text-gray-800">Enter Mobile Number or Email</h4>
              <p className="text-xs text-gray-500 mb-4">We will send an OTP for authentication</p>
              <input
                type="text"
                placeholder="Enter Mobile Number / Email ID"
                className="w-full border-b-2 border-gray-300 focus:border-[#2874f0] py-2 text-sm focus:outline-none mb-4"
              />
              <button
                onClick={() => {
                  alert('OTP sent to your mobile number! Logged in successfully.');
                  setShowLoginModal(false);
                }}
                className="w-full bg-[#fb641b] text-white py-2.5 font-bold rounded-sm shadow hover:bg-orange-600 transition-colors uppercase text-sm mb-3"
              >
                Request OTP
              </button>
              <p className="text-[11px] text-gray-500 text-center">
                By continuing, you agree to AK's <a href="#" className="text-blue-600 underline">Terms of Use</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
