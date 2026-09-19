import { FilterOptions, Order, PaymentDetails, Product, Address, CartItem } from '../types';
import { MOCK_CATEGORIES, MOCK_PRODUCTS, MOCK_PINCODES } from './mockData';

export const mockApi = {
  getCategories: async () => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_CATEGORIES;
  },

  getProducts: async (filters: FilterOptions = {}): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    let filtered = [...MOCK_PRODUCTS];

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.subcategory) {
      filtered = filtered.filter((p) => p.subcategory === filters.subcategory);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.minRating !== undefined) {
      filtered = filtered.filter((p) => p.rating >= filters.minRating!);
    }

    if (filters.fAssuredOnly) {
      filtered = filtered.filter((p) => p.isAssured);
    }

    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter((p) => filters.brands!.includes(p.brand));
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
      );
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_low_high':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_high_low':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.reverse();
          break;
        default:
          filtered.sort((a, b) => b.ratingCount - a.ratingCount);
      }
    }

    return filtered;
  },

  getProductById: async (id: string): Promise<Product | null> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_PRODUCTS.find((p) => p.id === id) || null;
  },

  getSearchSuggestions: async (query: string): Promise<string[]> => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const matches = new Set<string>();

    MOCK_PRODUCTS.forEach((p) => {
      if (p.name.toLowerCase().includes(q)) matches.add(p.name);
      if (p.brand.toLowerCase().includes(q)) matches.add(p.brand);
      if (p.category.toLowerCase().includes(q)) matches.add(p.category);
    });

    return Array.from(matches).slice(0, 6);
  },

  checkPincode: async (
    pincode: string
  ): Promise<
    | { serviceable: true; city: string; state: string; deliveryDays: number; message: string }
    | { serviceable: false; message: string }
  > => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const info = MOCK_PINCODES[pincode];
    if (info) {
      return {
        serviceable: true,
        city: info.city,
        state: info.state,
        deliveryDays: info.deliveryDays,
        message: `Express delivery available to ${info.city}, ${info.state} in ${info.deliveryDays} day(s).`
      };
    }
    // Generic fallback for any valid 6-digit Indian pincode
    if (/^\d{6}$/.test(pincode)) {
      return {
        serviceable: true,
        city: 'Standard Location',
        state: 'India',
        deliveryDays: 3,
        message: 'Standard delivery available in 2-3 business days.'
      };
    }
    return {
      serviceable: false,
      message: 'Invalid Pincode. Please enter a valid 6-digit Indian Pincode.'
    };
  },

  processPaymentAndCreateOrder: async (
    items: CartItem[],
    address: Address,
    paymentDetails: PaymentDetails
  ): Promise<{ success: boolean; order?: Order; message: string }> => {
    // Simulate secure network latency and SSL handshake validation
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Simple security validation simulation
    if (paymentDetails.method === 'CARD') {
      if (!paymentDetails.cardNumber || paymentDetails.cardNumber.replace(/\s/g, '').length < 16) {
        return { success: false, message: 'Invalid card number. Please provide a valid 16-digit card number.' };
      }
      if (!paymentDetails.cardCvv || paymentDetails.cardCvv.length < 3) {
        return { success: false, message: 'Invalid CVV code.' };
      }
    } else if (paymentDetails.method === 'UPI') {
      if (!paymentDetails.upiId || !paymentDetails.upiId.includes('@')) {
        return { success: false, message: 'Invalid UPI ID format. Example: mobile@upi or user@okicici.' };
      }
    }

    const totalMrp = items.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
    const totalSellingPrice = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discountAmount = totalMrp - totalSellingPrice;
    const deliveryFee = totalSellingPrice > 500 ? 0 : 40;

    const orderId = `OD${Math.floor(100000000000000 + Math.random() * 900000000000000)}`;
    const trackingNo = `FMPL${Math.floor(100000000 + Math.random() * 900000000)}`;

    const today = new Date();
    const deliveryDateObj = new Date(today);
    deliveryDateObj.setDate(today.getDate() + 2);
    const expectedDelivery = deliveryDateObj.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });

    let paymentDetailsStr: string = paymentDetails.method;
    if (paymentDetails.method === 'UPI') paymentDetailsStr = `UPI (${paymentDetails.upiId})`;
    if (paymentDetails.method === 'CARD') paymentDetailsStr = `Card ending in ****${paymentDetails.cardNumber?.slice(-4)}`;
    if (paymentDetails.method === 'NET_BANKING') paymentDetailsStr = `Net Banking (${paymentDetails.bankName || 'HDFC'})`;
    if (paymentDetails.method === 'COD') paymentDetailsStr = 'Cash on Delivery';

    const order: Order = {
      id: orderId,
      items: [...items],
      totalAmount: totalSellingPrice + deliveryFee,
      discountAmount,
      deliveryFee,
      address,
      paymentMethod: paymentDetails.method,
      paymentDetails: paymentDetailsStr,
      orderDate: today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      expectedDelivery,
      status: 'Placed',
      trackingNumber: trackingNo
    };

    return {
      success: true,
      order,
      message: 'Payment Verified & Order Successfully Placed!'
    };
  }
};
