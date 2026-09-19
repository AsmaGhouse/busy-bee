import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, CreditCard, ShieldCheck } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    title: 'THE BIG SAVINGS DAY',
    subtitle: '10% Instant Discount on HDFC & SBI Credit Cards',
    tagline: 'Lowest Prices of the Season on Mobiles & Laptops',
    bgGradient: 'from-blue-700 via-indigo-800 to-purple-900',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Shop Flagships',
    badge: 'MEGA SALE'
  },
  {
    id: 2,
    title: 'FASHION DHAMAKA SALE',
    subtitle: 'Min 50% - 80% Off on Top Clothing Brands',
    tagline: 'Roadster, Libas, Nike, Adidas & More',
    bgGradient: 'from-pink-600 via-rose-700 to-purple-800',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Explore Fashion',
    badge: 'TRENDING'
  },
  {
    id: 3,
    title: 'BEST OF ELECTRONICS & APPLIANCES',
    subtitle: 'No Cost EMI Up to 24 Months + Extra ₹10,000 Exchange Bonus',
    tagline: 'Smart TVs, Laptops, Air Fryers & Refrigerators',
    bgGradient: 'from-blue-900 via-cyan-900 to-slate-900',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Grab Deals',
    badge: 'LIMITED TIME'
  }
];

interface HeroBannerProps {
  onBannerClick?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onBannerClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const currentBanner = BANNERS[currentIndex];

  return (
    <div className="relative my-3 max-w-7xl mx-auto px-2 sm:px-4">
      <div
        className={`relative rounded-lg overflow-hidden shadow-xl bg-gradient-to-r ${currentBanner.bgGradient} transition-all duration-700 min-h-[220px] sm:min-h-[280px] flex items-center`}
      >
        {/* Background decorative shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full p-6 sm:p-10 relative z-10 items-center gap-6">
          <div className="text-white space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-gray-900 text-xs font-black px-2.5 py-1 rounded-sm uppercase tracking-wider shadow">
              <Zap className="w-3.5 h-3.5 fill-current" /> {currentBanner.badge}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight drop-shadow-md">
              {currentBanner.title}
            </h2>
            <p className="text-yellow-300 font-bold text-sm sm:text-lg">
              {currentBanner.subtitle}
            </p>
            <p className="text-blue-100 text-xs sm:text-sm font-medium">
              {currentBanner.tagline}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onBannerClick}
                className="bg-yellow-400 text-gray-900 font-extrabold px-6 py-2.5 rounded-sm hover:bg-yellow-300 transition-transform active:scale-95 shadow-lg text-sm uppercase tracking-wider"
              >
                {currentBanner.ctaText}
              </button>
              <span className="text-xs text-blue-200 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-300" /> AK Assured Guarantee
              </span>
            </div>
          </div>

          <div className="hidden md:flex justify-end items-center">
            <div className="relative group">
              <img
                src={currentBanner.image}
                alt={currentBanner.title}
                className="w-72 h-48 object-cover rounded-lg shadow-2xl border-2 border-white/20 transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-3 -left-3 bg-white text-gray-900 px-3 py-1.5 rounded-md shadow-lg font-bold text-xs flex items-center gap-1 border">
                <CreditCard className="w-4 h-4 text-[#2874f0]" /> 10% Instant Off
              </div>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-white hover:text-gray-900 p-2 rounded-full backdrop-blur-md transition-all shadow"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-white hover:text-gray-900 p-2 rounded-full backdrop-blur-md transition-all shadow"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx ? 'w-6 bg-yellow-400' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
