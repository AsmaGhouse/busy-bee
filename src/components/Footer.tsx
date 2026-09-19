import React from 'react';
import { HelpCircle, ShieldCheck, RefreshCw, Truck, Gift, Star } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#172337] text-white text-xs mt-10">
      
      {/* Top Value Props Ribbon */}
      <div className="border-b border-gray-700/80 bg-[#121c2d]">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-yellow-400 shrink-0" />
            <div>
              <p className="font-bold text-white">100% Original</p>
              <p className="text-[11px] text-gray-400">Guaranteed for all products</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-yellow-400 shrink-0" />
            <div>
              <p className="font-bold text-white">7 Day Return</p>
              <p className="text-[11px] text-gray-400">Easy return & exchange policy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-yellow-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Fast Delivery</p>
              <p className="text-[11px] text-gray-400">Across 20,000+ Indian pincodes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Gift className="w-6 h-6 text-yellow-400 shrink-0" />
            <div>
              <p className="font-bold text-white">AK Rewards & Coins</p>
              <p className="text-[11px] text-gray-400">Earn rewards on every order</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-6 gap-6">
        
        <div>
          <h4 className="font-bold text-gray-400 uppercase text-[11px] tracking-wider mb-3">
            ABOUT
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">AK Stories</a></li>
            <li><a href="#" className="hover:underline">Press & Media</a></li>
            <li><a href="#" className="hover:underline">Corporate Information</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-400 uppercase text-[11px] tracking-wider mb-3">
            GROUP COMPANIES
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:underline">Myntra</a></li>
            <li><a href="#" className="hover:underline">Cleartrip</a></li>
            <li><a href="#" className="hover:underline">Shopsy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-400 uppercase text-[11px] tracking-wider mb-3">
            HELP
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:underline">Payments</a></li>
            <li><a href="#" className="hover:underline">Shipping</a></li>
            <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Report Infringement</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-400 uppercase text-[11px] tracking-wider mb-3">
            CONSUMER POLICY
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
            <li><a href="#" className="hover:underline">Terms Of Use</a></li>
            <li><a href="#" className="hover:underline">Security</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Sitemap</a></li>
            <li><a href="#" className="hover:underline">Grievance Redressal</a></li>
          </ul>
        </div>

        <div className="border-t md:border-t-0 md:border-l border-gray-700 pt-4 md:pt-0 md:pl-6 space-y-2 col-span-2 md:col-span-2">
          <h4 className="font-bold text-gray-400 uppercase text-[11px] tracking-wider mb-2">
            Registered Office Address:
          </h4>
          <p className="text-gray-400 leading-relaxed text-[11px]">
            AK Retail Private Limited,<br />
            Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103, Karnataka, India<br />
            CIN : U51109KA2012PTC066107<br />
            Telephone: <span className="text-[#2874f0]">044-45614700 / 044-67415800</span>
          </p>
        </div>

      </div>

      {/* Bottom Legal & Accepted Payment Logos */}
      <div className="border-t border-gray-800 py-4 bg-[#111927]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1 text-white font-bold">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" /> Become a Seller
            </span>
            <span>Advertise</span>
            <span>Gift Cards</span>
            <span>Help Center</span>
          </div>

          <p>© 2007-2026 AK Store. All Rights Reserved.</p>

          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-300">Accepted Payments:</span>
            <span className="bg-gray-800 px-2 py-0.5 rounded text-white font-bold text-[10px]">VISA</span>
            <span className="bg-gray-800 px-2 py-0.5 rounded text-white font-bold text-[10px]">Mastercard</span>
            <span className="bg-gray-800 px-2 py-0.5 rounded text-white font-bold text-[10px]">RuPay</span>
            <span className="bg-gray-800 px-2 py-0.5 rounded text-yellow-300 font-bold text-[10px]">UPI</span>
            <span className="bg-gray-800 px-2 py-0.5 rounded text-green-400 font-bold text-[10px]">NetBanking</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
