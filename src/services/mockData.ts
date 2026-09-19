import { Category, Product } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'grocery',
    name: 'Grocery',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=80',
    subcategories: ['Staples', 'Snacks & Beverages', 'Packaged Food', 'Personal Care', 'Household Items']
  },
  {
    id: 'mobiles',
    name: 'Mobiles',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=80',
    subcategories: ['Flagship Phones', '5G Smartphones', 'Budget Phones', 'Mobile Accessories', 'Power Banks']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=150&auto=format&fit=crop&q=80',
    subcategories: ["Men's Clothing", "Women's Ethnic", "Footwear", "Watches & Accessories", "Kids Wear"]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Laptop',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=150&auto=format&fit=crop&q=80',
    subcategories: ['Laptops', 'Audio & Headphones', 'Smartwatches', 'Cameras', 'Computer Accessories']
  },
  {
    id: 'home',
    name: 'Home & Furniture',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&auto=format&fit=crop&q=80',
    subcategories: ['Cookware', 'Bedding & Linen', 'Sofas & Beds', 'Home Decor', 'Lighting']
  },
  {
    id: 'appliances',
    name: 'Appliances',
    icon: 'Tv',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=150&auto=format&fit=crop&q=80',
    subcategories: ['Televisions', 'Washing Machines', 'Refrigerators', 'Air Conditioners', 'Microwaves']
  },
  {
    id: 'beauty',
    name: 'Beauty & Toys',
    icon: 'Smile',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=80',
    subcategories: ['Makeup', 'Skincare', 'Baby Care', 'Action Figures', 'Sports Equipment']
  },
  {
    id: 'travel',
    name: 'Travel & Scooters',
    icon: 'Bike',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=150&auto=format&fit=crop&q=80',
    subcategories: ['Electric Scooters', 'Trolley Bags', 'Backpacks', 'Travel Accessories']
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'mob-1',
    name: 'Apple iPhone 15 Pro (Natural Titanium, 128 GB)',
    category: 'mobiles',
    subcategory: 'Flagship Phones',
    brand: 'Apple',
    price: 124900,
    originalPrice: 134900,
    discount: 7,
    rating: 4.7,
    ratingCount: 14820,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80'
    ],
    isAssured: true,
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.',
    specs: {
      'Display': '6.1-inch Super Retina XDR OLED (120Hz ProMotion)',
      'Processor': 'A17 Pro Chip (3nm Hexa Core)',
      'Camera': '48 MP Main + 12 MP Ultrawide + 12 MP Telephoto',
      'Battery': 'Up to 23 Hours Video Playback',
      'Security': 'Face ID, Ceramic Shield Front',
      'Warranty': '1 Year Brand Warranty'
    },
    deliveryDays: 1,
    inStock: true,
    bankOffers: [
      '10% Instant Discount on HDFC Credit Cards up to ₹5,000',
      'Flat ₹4,000 Cashback on Axis Bank Credit Cards',
      'No Cost EMI starting at ₹10,408/month'
    ],
    colors: ['Natural Titanium', 'Blue Titanium', 'Black Titanium', 'White Titanium'],
    reviews: [
      {
        id: 'r1',
        userName: 'Aarav Sharma',
        rating: 5,
        date: '28 Aug 2026',
        title: 'Mindblowing performance and camera!',
        comment: 'Upgraded from 12 Pro. Titanium frame feels extremely lightweight in hand. Photos are crisp and battery easily lasts full day.',
        verified: true
      },
      {
        id: 'r2',
        userName: 'Priya Mukherjee',
        rating: 4,
        date: '15 Aug 2026',
        title: 'Very premium phone',
        comment: 'Fast delivery by AK Store within 24 hours. The screen quality is unmatched.',
        verified: true
      }
    ]
  },
  {
    id: 'mob-2',
    name: 'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)',
    category: 'mobiles',
    subcategory: '5G Smartphones',
    brand: 'Samsung',
    price: 129999,
    originalPrice: 144999,
    discount: 10,
    rating: 4.6,
    ratingCount: 8940,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80'
    ],
    isAssured: true,
    description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, unleash whole new levels of creativity and productivity with Galaxy AI features & integrated S Pen.',
    specs: {
      'Display': '6.8-inch Quad HD+ Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3 Mobile Platform for Galaxy',
      'Camera': '200 MP + 50 MP + 12 MP + 10 MP Quad Camera',
      'Battery': '5000 mAh with 45W Fast Charging',
      'S Pen': 'Built-in Bluetooth S Pen',
      'Warranty': '1 Year Manufacturer Warranty'
    },
    deliveryDays: 2,
    inStock: true,
    bankOffers: [
      '₹10,000 Instant Discount on ICICI Bank Cards',
      'Extra ₹12,000 Off on Exchange of old smartphone'
    ],
    colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet'],
    reviews: [
      {
        id: 'r3',
        userName: 'Rohan Verma',
        rating: 5,
        date: '01 Sep 2026',
        title: 'Best Android flagship 2026!',
        comment: 'Circle to search feature and 100x zoom camera are insane. S Pen is super handy for quick notes.',
        verified: true
      }
    ]
  },
  {
    id: 'mob-3',
    name: 'Redmi Note 13 Pro 5G (Midnight Black, 128 GB)',
    category: 'mobiles',
    subcategory: 'Budget Phones',
    brand: 'Xiaomi',
    price: 24999,
    originalPrice: 28999,
    discount: 13,
    rating: 4.4,
    ratingCount: 34200,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80'
    ],
    isAssured: true,
    description: '200 MP Ultra-Clear OIS Camera with 1.5K 120Hz AMOLED display and Snapdragon 7s Gen 2 processor.',
    specs: {
      'Display': '6.67-inch 1.5K AMOLED 120Hz',
      'Processor': 'Snapdragon 7s Gen 2',
      'Camera': '200 MP OIS Main Camera',
      'Battery': '5100 mAh with 67W Turbo Charger'
    },
    deliveryDays: 1,
    inStock: true,
    bankOffers: [
      '₹2,000 Instant SBI Credit Card Discount',
      '5% Unlimited Cashback on AK Co-branded Card'
    ],
    reviews: []
  },
  {
    id: 'elec-1',
    name: 'Apple MacBook Air M2 (8GB RAM, 256GB SSD, Midnight)',
    category: 'electronics',
    subcategory: 'Laptops',
    brand: 'Apple',
    price: 94900,
    originalPrice: 114900,
    discount: 17,
    rating: 4.8,
    ratingCount: 19500,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80'
    ],
    isAssured: true,
    description: 'Redesigned around the next-generation M2 chip, MacBook Air is strikingly thin and brings exceptional speed and power efficiency inside its durable all-aluminum enclosure.',
    specs: {
      'Display': '13.6-inch Liquid Retina Display',
      'Processor': 'Apple M2 chip with 8-core CPU and 8-core GPU',
      'Memory': '8GB Unified RAM',
      'Storage': '256GB Superfast SSD',
      'Battery Life': 'Up to 18 hours battery life'
    },
    deliveryDays: 1,
    inStock: true,
    bankOffers: [
      'Flat ₹5,000 Instant Discount on HDFC Bank Cards',
      'No Cost EMI starting at ₹7,908/month'
    ],
    reviews: [
      {
        id: 'r4',
        userName: 'Vikram Mehta',
        rating: 5,
        date: '20 Aug 2026',
        title: 'Silent beast laptop',
        comment: 'Zero fan noise, battery lasts 2 full workdays! Midnight color looks incredible.',
        verified: true
      }
    ]
  },
  {
    id: 'elec-2',
    name: 'Sony WH-1000XM5 Noise Cancelling Headphones (Silver)',
    category: 'electronics',
    subcategory: 'Audio & Headphones',
    brand: 'Sony',
    price: 29990,
    originalPrice: 34990,
    discount: 14,
    rating: 4.6,
    ratingCount: 7820,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'
    ],
    isAssured: true,
    description: 'Industry leading noise canceling headphones with two processors and eight microphones for unprecedented sound quality.',
    specs: {
      'Driver': '30mm Precision Engineered Driver Unit',
      'Battery Life': 'Up to 30 Hours with ANC On',
      'Microphones': '8 Mics with Precise Voice Pickup',
      'Bluetooth': 'v5.2 with LDAC Codec Support'
    },
    deliveryDays: 2,
    inStock: true,
    bankOffers: ['10% Instant Discount on HDFC Cards'],
    reviews: []
  },
  {
    id: 'elec-3',
    name: 'Samsung Galaxy Watch 6 Classic (47mm, Bluetooth, Black)',
    category: 'electronics',
    subcategory: 'Smartwatches',
    brand: 'Samsung',
    price: 36999,
    originalPrice: 43999,
    discount: 15,
    rating: 4.5,
    ratingCount: 3120,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'
    ],
    isAssured: true,
    description: 'Physical rotating bezel smartwatch with BIA body composition analysis, Advanced Sleep Coaching, and ECG monitoring.',
    specs: {
      'Display': '1.5-inch Sapphire Crystal AMOLED',
      'OS': 'Wear OS powered by Samsung',
      'Water Resistance': '5ATM + IP68 Rating'
    },
    deliveryDays: 1,
    inStock: true,
    bankOffers: ['5% Unlimited Cashback on AK Bank Card'],
    reviews: []
  },
  {
    id: 'fash-1',
    name: "Men's Premium Heavy Denim Jacket (Indi-Blue)",
    category: 'fashion',
    subcategory: "Men's Clothing",
    brand: 'Roadster',
    price: 1499,
    originalPrice: 3999,
    discount: 62,
    rating: 4.3,
    ratingCount: 12400,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80'
    ],
    isAssured: true,
    description: '100% Cotton classic trucker denim jacket with button closure, double chest pockets, and durable stitching.',
    specs: {
      'Fabric': '100% Rigid Denim Cotton',
      'Fit': 'Regular Fit',
      'Pattern': 'Solid Indigo Wash'
    },
    deliveryDays: 2,
    inStock: true,
    bankOffers: ['Buy 2 Get Extra 10% Off'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    reviews: []
  },
  {
    id: 'fash-2',
    name: "Women's Embroidered Anarkali Kurta & Dupatta Set",
    category: 'fashion',
    subcategory: "Women's Ethnic",
    brand: 'Libas',
    price: 1899,
    originalPrice: 4999,
    discount: 62,
    rating: 4.5,
    ratingCount: 18900,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80'
    ],
    isAssured: true,
    description: 'Elegant Rayon Anarkali Kurta set with intricate Zari embroidery work on yoke, paired with matching trousers and organza dupatta.',
    specs: {
      'Fabric': 'Premium Rayon Cotton Blend',
      'Sleeve': 'Three-Quarter Sleeves',
      'Care': 'Hand Wash Separately'
    },
    deliveryDays: 2,
    inStock: true,
    bankOffers: ['Extra ₹200 Off on UPI Payments'],
    sizes: ['S', 'M', 'L', 'XL'],
    reviews: []
  },
  {
    id: 'fash-3',
    name: 'Nike Air Max Excee Running Shoes for Men (White/Black)',
    category: 'fashion',
    subcategory: 'Footwear',
    brand: 'Nike',
    price: 6495,
    originalPrice: 7995,
    discount: 18,
    rating: 4.6,
    ratingCount: 5400,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'
    ],
    isAssured: true,
    description: 'Inspired by the Nike Air Max 90, the Nike Air Max Excee celebrates a classic through a new lens.',
    specs: {
      'Upper Material': 'Mesh, Leather, and Suede',
      'Sole Material': 'Rubber Air Max Cushioning',
      'Closure': 'Lace-Up'
    },
    deliveryDays: 1,
    inStock: true,
    bankOffers: ['10% Instant SBI Credit Card Discount'],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    reviews: []
  },
  {
    id: 'home-1',
    name: 'Philips Digital Air Fryer HD9252/90 (4.1 Litre, 1400W)',
    category: 'home',
    subcategory: 'Cookware',
    brand: 'Philips',
    price: 7999,
    originalPrice: 11995,
    discount: 33,
    rating: 4.6,
    ratingCount: 14200,
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80'
    ],
    isAssured: true,
    description: 'Rapid Air Technology with unique starfish design swirls hot air to create delicious foods that are crispy on the outside and tender on the inside, with up to 90% less fat.',
    specs: {
      'Capacity': '4.1 Litres',
      'Power': '1400 Watts',
      'Presets': '7 Touch Screen Preset Programs',
      'Warranty': '2 Years Global Warranty'
    },
    deliveryDays: 1,
    inStock: true,
    bankOffers: ['Extra ₹500 Off with Bank Coupon'],
    reviews: []
  },
  {
    id: 'appliance-1',
    name: 'LG 55-inch 4K Ultra HD Smart OLED TV (OLED55C3)',
    category: 'appliances',
    subcategory: 'Televisions',
    brand: 'LG',
    price: 119990,
    originalPrice: 169990,
    discount: 29,
    rating: 4.8,
    ratingCount: 4300,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80'
    ],
    isAssured: true,
    description: 'α9 AI Processor Gen6, Brightness Booster Max, Dolby Vision & Atmos, 120Hz Refresh Rate with NVIDIA G-Sync for ultimate gaming.',
    specs: {
      'Screen Size': '55 Inches OLED',
      'Resolution': '4K Ultra HD (3840 x 2160)',
      'Refresh Rate': '120 Hz',
      'Sound': '40W 2.2 Channel Dolby Atmos'
    },
    deliveryDays: 2,
    inStock: true,
    bankOffers: [
      'Flat ₹7,500 Instant Off on HDFC Credit Cards',
      'Free Installation by LG Certified Engineers within 48h'
    ],
    reviews: []
  },
  {
    id: 'groc-1',
    name: 'Fortune Sunlite Refined Sunflower Oil 5L Pouch',
    category: 'grocery',
    subcategory: 'Staples',
    brand: 'Fortune',
    price: 649,
    originalPrice: 850,
    discount: 23,
    rating: 4.5,
    ratingCount: 45000,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80'
    ],
    isAssured: true,
    description: 'Enriched with Vitamin A and D to support good vision and healthy immunity. Light and easy to digest.',
    specs: {
      'Quantity': '5 Litres',
      'Form': 'Refined Sunflower Oil',
      'Shelf Life': '9 Months'
    },
    deliveryDays: 1,
    inStock: true,
    bankOffers: ['Supermart Deal: Item at ₹1 for orders above ₹1,499'],
    reviews: []
  },
  {
    id: 'trv-1',
    name: 'Ather 450X Gen 3 Electric Scooter (Space Grey)',
    category: 'travel',
    subcategory: 'Electric Scooters',
    brand: 'Ather',
    price: 139999,
    originalPrice: 154999,
    discount: 9,
    rating: 4.7,
    ratingCount: 2150,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
    ],
    isAssured: true,
    description: 'Instant torque, 150 km certified range, 7-inch touchscreen dashboard with Google Maps navigation and Warp Mode.',
    specs: {
      'Top Speed': '90 km/h',
      'True Range': '110 km (Eco Mode)',
      'Battery': '3.7 kWh Lithium-ion IP67',
      'Charging Time': '0-80% in 4 hrs 30 mins'
    },
    deliveryDays: 3,
    inStock: true,
    bankOffers: ['FAME II Subsidy Included', 'No Cost EMI starting at ₹4,999/mo'],
    reviews: []
  }
];

export const MOCK_PINCODES: Record<string, { city: string; state: string; deliveryDays: number }> = {
  '560001': { city: 'Bengaluru', state: 'Karnataka', deliveryDays: 1 },
  '110001': { city: 'New Delhi', state: 'Delhi', deliveryDays: 1 },
  '400001': { city: 'Mumbai', state: 'Maharashtra', deliveryDays: 1 },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', deliveryDays: 2 },
  '700001': { city: 'Kolkata', state: 'West Bengal', deliveryDays: 2 },
  '500001': { city: 'Hyderabad', state: 'Telangana', deliveryDays: 1 },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', deliveryDays: 2 },
  '302001': { city: 'Jaipur', state: 'Rajasthan', deliveryDays: 2 }
};
