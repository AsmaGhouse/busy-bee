export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  ratingCount: number;
  image: string;
  additionalImages: string[];
  isAssured: boolean;
  description: string;
  specs: Record<string, string>;
  deliveryDays: number;
  inStock: boolean;
  bankOffers: string[];
  reviews: Review[];
  colors?: string[];
  sizes?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  subcategories: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Address {
  id?: string;
  name: string;
  mobile: string;
  pincode: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  landmark?: string;
  alternatePhone?: string;
  type: 'Home' | 'Work';
}

export type PaymentMethodType = 'UPI' | 'CARD' | 'NET_BANKING' | 'COD' | 'PAY_LATER';

export interface PaymentDetails {
  method: PaymentMethodType;
  upiId?: string;
  cardNumber?: string;
  cardHolder?: string;
  cardExpiry?: string;
  cardCvv?: string;
  bankName?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  deliveryFee: number;
  address: Address;
  paymentMethod: string;
  paymentDetails: string;
  orderDate: string;
  expectedDelivery: string;
  status: 'Placed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
}

export interface FilterOptions {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  fAssuredOnly?: boolean;
  brands?: string[];
  searchQuery?: string;
  sortBy?: 'popularity' | 'price_low_high' | 'price_high_low' | 'newest' | 'rating';
}
