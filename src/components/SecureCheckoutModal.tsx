import React, { useState } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building2,
  Banknote,
  CheckCircle2,
  MapPin,
  Clock,
  Download,
  Package,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Address, CartItem, Order, PaymentDetails, PaymentMethodType } from '../types';
import { mockApi } from '../services/mockApi';

interface SecureCheckoutModalProps {
  cart: CartItem[];
  currentAddress: Address;
  onClose: () => void;
  onOrderComplete: (order: Order) => void;
}

export const SecureCheckoutModal: React.FC<SecureCheckoutModalProps> = ({
  cart,
  currentAddress,
  onClose,
  onOrderComplete
}) => {
  const [step, setStep] = useState<'ADDRESS' | 'PAYMENT' | 'OTP' | 'SUCCESS'>('ADDRESS');
  const [address, setAddress] = useState<Address>(currentAddress);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('UPI');
  
  // Payment Form States
  const [upiId, setUpiId] = useState('user@okicici');
  const [cardNumber, setCardNumber] = useState('4532 8901 2345 6789');
  const [cardHolder, setCardHolder] = useState('Rahul Sharma');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('123');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [captchaInput, setCaptchaInput] = useState('');

  // Processing States
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const totalMrp = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const totalSelling = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = totalSelling > 500 ? 0 : 40;
  const finalPayable = totalSelling + deliveryFee;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.name || !address.mobile || !address.pincode || !address.address) {
      setErrorMsg('Please fill in all required address fields.');
      return;
    }
    setErrorMsg('');
    setStep('PAYMENT');
  };

  const handleProceedToOtp = () => {
    setErrorMsg('');
    if (paymentMethod === 'CARD') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        setErrorMsg('Please enter a valid 16-digit card number.');
        return;
      }
      if (!cardCvv || cardCvv.length < 3) {
        setErrorMsg('Please enter a valid CVV.');
        return;
      }
    } else if (paymentMethod === 'UPI') {
      if (!upiId || !upiId.includes('@')) {
        setErrorMsg('Please enter a valid UPI ID (e.g. name@upi).');
        return;
      }
    } else if (paymentMethod === 'COD') {
      if (captchaInput !== '4829') {
        setErrorMsg('Incorrect CAPTCHA code. Please enter 4829.');
        return;
      }
    }

    setStep('OTP');
  };

  const handleVerifyOtpAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.length < 4) {
      setErrorMsg('Please enter the 6-digit OTP code.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    const paymentDetails: PaymentDetails = {
      method: paymentMethod,
      upiId,
      cardNumber,
      cardHolder,
      cardExpiry,
      cardCvv,
      bankName: selectedBank
    };

    const result = await mockApi.processPaymentAndCreateOrder(cart, address, paymentDetails);

    setIsProcessing(false);

    if (result.success && result.order) {
      setCompletedOrder(result.order);
      setStep('SUCCESS');
      onOrderComplete(result.order);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setErrorMsg(result.message || 'Payment verification failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[94vh] overflow-y-auto custom-scrollbar shadow-2xl relative text-gray-800 my-auto">
        
        {/* Header Bar with Security Indicator */}
        <div className="bg-[#2874f0] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-md">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-yellow-300" />
            <h2 className="font-extrabold text-base sm:text-lg tracking-tight">
              AK 256-Bit Secure Payment Checkout
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1 text-xs bg-blue-700 text-blue-100 px-2.5 py-1 rounded font-medium border border-blue-400/40">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> PCI-DSS Compliant
            </span>
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 p-1.5 rounded-full text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-gray-50 min-h-[400px]">
          
          {errorMsg && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: ADDRESS SELECTION & FORM */}
          {step === 'ADDRESS' && (
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-xs border border-gray-200">
                <div className="flex items-center gap-2 text-gray-900 font-bold text-sm mb-3">
                  <MapPin className="w-4 h-4 text-[#2874f0]" /> 1. Enter Delivery Address
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2874f0]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Mobile Number *</label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={address.mobile}
                      onChange={(e) => setAddress({ ...address, mobile: e.target.value.replace(/\D/g, '') })}
                      placeholder="10-digit Mobile Number"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2874f0]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Indian Pincode *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                      placeholder="6-digit Pincode (e.g. 560001)"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2874f0]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Locality / Area *</label>
                    <input
                      type="text"
                      required
                      value={address.locality}
                      onChange={(e) => setAddress({ ...address, locality: e.target.value })}
                      placeholder="e.g. Koramangala 4th Block"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2874f0]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-1">Street Address / Flat / Building *</label>
                    <textarea
                      required
                      rows={2}
                      value={address.address}
                      onChange={(e) => setAddress({ ...address, address: e.target.value })}
                      placeholder="Flat No, Building Name, Street Address"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2874f0]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="e.g. Bengaluru"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2874f0]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      placeholder="e.g. Karnataka"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#2874f0]"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t">
                  <div className="flex gap-2">
                    {['Home', 'Work'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setAddress({ ...address, type: type as 'Home' | 'Work' })}
                        className={`px-3 py-1 text-xs font-semibold rounded border ${
                          address.type === type
                            ? 'bg-blue-50 border-[#2874f0] text-[#2874f0]'
                            : 'border-gray-300 text-gray-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="bg-[#fb641b] hover:bg-orange-600 text-white font-extrabold px-6 py-2.5 rounded-sm shadow text-xs uppercase tracking-wider"
                  >
                    Deliver Here & Continue
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD CHOICE */}
          {step === 'PAYMENT' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-xs border border-gray-200">
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-green-600" /> 2. Choose Payment Method
                  </div>
                  <div className="text-xs text-[#2874f0] font-bold">
                    Payable: ₹{finalPayable.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Left Tabs */}
                  <div className="space-y-1 md:col-span-1 border-r border-gray-200 pr-2">
                    {[
                      { id: 'UPI', label: 'UPI (GPay / PhonePe)', icon: Smartphone },
                      { id: 'CARD', label: 'Credit / Debit Card', icon: CreditCard },
                      { id: 'NET_BANKING', label: 'Net Banking', icon: Building2 },
                      { id: 'COD', label: 'Cash on Delivery', icon: Banknote }
                    ].map((item) => {
                      const IconComponent = item.icon;
                      const isActive = paymentMethod === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setPaymentMethod(item.id as PaymentMethodType)}
                          className={`w-full text-left p-2.5 rounded text-xs font-semibold flex items-center gap-2 transition-all ${
                            isActive
                              ? 'bg-blue-50 text-[#2874f0] border-l-4 border-[#2874f0]'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <IconComponent className="w-4 h-4 shrink-0" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Form Pane */}
                  <div className="md:col-span-3 space-y-4">
                    
                    {/* UPI Option */}
                    {paymentMethod === 'UPI' && (
                      <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
                        <p className="text-xs font-bold text-gray-800">
                          Pay instantly via UPI (Google Pay, PhonePe, Paytm, BHIM)
                        </p>
                        <div>
                          <label className="block text-[11px] text-gray-600 font-medium mb-1">
                            Enter Virtual Payment Address (VPA) / UPI ID:
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. mobile@upi, username@okicici"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#2874f0]"
                          />
                        </div>
                        <div className="text-[11px] text-gray-500 bg-white p-2.5 rounded border border-gray-200 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                          <span>You will receive a payment request on your UPI app.</span>
                        </div>
                      </div>
                    )}

                    {/* Credit / Debit Card Option */}
                    {paymentMethod === 'CARD' && (
                      <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
                        <p className="text-xs font-bold text-gray-800 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-green-600" /> Enter Card Details (Visa, Mastercard, RuPay)
                        </p>
                        <div>
                          <label className="block text-[11px] text-gray-600 font-medium mb-1">Card Number</label>
                          <input
                            type="text"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="xxxx xxxx xxxx xxxx"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#2874f0]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] text-gray-600 font-medium mb-1">Valid Thru (MM/YY)</label>
                            <input
                              type="text"
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#2874f0]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-gray-600 font-medium mb-1">CVV</label>
                            <input
                              type="password"
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="3 or 4 digits"
                              className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#2874f0]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-600 font-medium mb-1">Name on Card</label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Cardholder Name"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#2874f0]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Net Banking Option */}
                    {paymentMethod === 'NET_BANKING' && (
                      <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
                        <p className="text-xs font-bold text-gray-800">Select Net Banking Bank</p>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#2874f0]"
                        >
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="State Bank of India">State Bank of India (SBI)</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="Axis Bank">Axis Bank</option>
                          <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}

                    {/* Cash on Delivery */}
                    {paymentMethod === 'COD' && (
                      <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
                        <p className="text-xs font-bold text-gray-800">Cash on Delivery Verification</p>
                        <p className="text-xs text-gray-600">
                          Pay ₹{finalPayable.toLocaleString('en-IN')} cash at the time of delivery.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                          <span className="bg-yellow-200 text-gray-900 font-black tracking-widest px-3 py-1.5 rounded text-sm select-none border border-yellow-300">
                            4829
                          </span>
                          <input
                            type="text"
                            maxLength={4}
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            placeholder="Enter CAPTCHA (4829)"
                            className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#2874f0] w-36"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-3 border-t">
                      <button
                        type="button"
                        onClick={() => setStep('ADDRESS')}
                        className="text-xs text-gray-600 hover:underline font-semibold"
                      >
                        ← Back to Address
                      </button>
                      <button
                        type="button"
                        onClick={handleProceedToOtp}
                        className="bg-[#fb641b] hover:bg-orange-600 text-white font-extrabold px-8 py-2.5 rounded-sm shadow text-xs uppercase tracking-wider flex items-center gap-2"
                      >
                        <Lock className="w-3.5 h-3.5" /> Pay ₹{finalPayable.toLocaleString('en-IN')}
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3: OTP VERIFICATION MODAL */}
          {step === 'OTP' && (
            <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-lg border border-gray-200 text-center space-y-4">
              <div className="w-14 h-14 bg-blue-100 text-[#2874f0] rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Enter Bank OTP Code</h3>
              <p className="text-xs text-gray-600">
                A 6-digit authentication OTP has been sent to your registered mobile number ending in <span className="font-bold text-gray-800">****{address.mobile.slice(-4)}</span>.
              </p>

              <form onSubmit={handleVerifyOtpAndPay} className="space-y-4 pt-2">
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit OTP (e.g. 123456)"
                  className="w-full text-center tracking-widest text-lg font-bold border-2 border-gray-300 focus:border-[#2874f0] rounded py-2.5 focus:outline-none"
                />

                <div className="flex justify-between items-center text-[11px] text-gray-500">
                  <span>Resend OTP in 30s</span>
                  <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                    Resend Code
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('PAYMENT')}
                    className="w-1/3 bg-gray-100 text-gray-700 font-bold py-2.5 rounded text-xs hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-2/3 bg-[#388e3c] hover:bg-green-700 text-white font-extrabold py-2.5 rounded shadow text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Verifying...
                      </>
                    ) : (
                      'Confirm & Complete Payment'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: ORDER SUCCESS CELEBRATION */}
          {step === 'SUCCESS' && completedOrder && (
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-green-200 text-center space-y-4 max-w-xl mx-auto">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Order Confirmed!
              </h2>
              <p className="text-xs text-gray-600">
                Thank you for your order on AK Store. Your payment was verified securely.
              </p>

              <div className="bg-blue-50/70 p-4 rounded border border-blue-100 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-bold text-gray-900">{completedOrder.id}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Tracking No:</span>
                  <span className="font-bold text-[#2874f0]">{completedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Total Paid:</span>
                  <span className="font-extrabold text-green-700">₹{completedOrder.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Payment Mode:</span>
                  <span className="font-semibold text-gray-800">{completedOrder.paymentDetails}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Expected Delivery:</span>
                  <span className="font-bold text-gray-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-green-600" /> {completedOrder.expectedDelivery}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  onClick={() => {
                    alert(`Tax Invoice generated for Order #${completedOrder.id}. Downloading PDF...`);
                  }}
                  className="flex-1 border border-[#2874f0] text-[#2874f0] hover:bg-blue-50 font-bold py-2.5 rounded text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download Invoice
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-[#2874f0] hover:bg-blue-700 text-white font-extrabold py-2.5 rounded shadow text-xs uppercase tracking-wider"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
