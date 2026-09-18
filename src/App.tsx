import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { HeroBanner } from './components/HeroBanner';
import { DealsSection } from './components/DealsSection';
import { ProductCard } from './components/ProductCard';
import { ProductFilters } from './components/ProductFilters';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartView } from './components/CartView';
import { SecureCheckoutModal } from './components/SecureCheckoutModal';
import { OrdersView } from './components/OrdersView';
import { Footer } from './components/Footer';

import { mockApi } from './services/mockApi';
import { Product, Category, CartItem, Address, Order, FilterOptions } from './types';
import { Sparkles, Heart, Package, ShoppingBag, X } from 'lucide-react';

const INITIAL_ADDRESS: Address = {
  name: 'Rahul Sharma',
  mobile: '9876543210',
  pincode: '560001',
  locality: 'Koramangala 4th Block',
  address: 'No 42, 8th Main Road, Near Sony Signal',
  city: 'Bengaluru',
  state: 'Karnataka',
  type: 'Home'
};

export function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'popularity',
    maxPrice: 150000
  });

  // Location / Pincode
  const [pincode, setPincode] = useState('560001');

  // User State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Modals State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);

  // Toast notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const cats = await mockApi.getCategories();
      setCategories(cats);
      const prods = await mockApi.getProducts({});
      setProducts(prods);
      setLoading(false);
    };
    loadData();
  }, []);

  // Filtered Products computation
  useEffect(() => {
    const updateFilteredProducts = async () => {
      const activeFilters: FilterOptions = {
        ...filters,
        category: selectedCategory,
        subcategory: selectedSubcategory,
        searchQuery
      };
      const result = await mockApi.getProducts(activeFilters);
      setProducts(result);
    };
    updateFilteredProducts();
  }, [selectedCategory, selectedSubcategory, searchQuery, filters]);

  // Derived available brands list for filters
  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.brand));
    return Array.from(set);
  }, [products]);

  // Cart Actions
  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`"${product.name.slice(0, 30)}..." added to Cart!`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from Cart.');
  };

  // Wishlist Actions
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('Removed from Wishlist.');
        return prev.filter((p) => p.id !== product.id);
      }
      showToast('Added to Wishlist!');
      return [...prev, product];
    });
  };

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(null);
    setCart([{ product, quantity: 1 }]);
    setShowCheckout(true);
  };

  const handleOrderComplete = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  };

  const currentCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f2f6] text-gray-800 antialiased font-sans">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-4 py-2.5 rounded shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce border border-yellow-400">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setShowCart(true)}
        onOpenWishlist={() => setShowWishlistModal(true)}
        onOpenOrders={() => setShowOrders(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedSubcategory(undefined);
        }}
        onSearch={(query) => setSearchQuery(query)}
        currentPincode={pincode}
        onChangePincode={(pin, city) => {
          setPincode(pin);
          showToast(`Location set to ${city} (${pin})`);
        }}
        activeSearchQuery={searchQuery}
      />

      {/* Category Navigation Strip */}
      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setSelectedSubcategory(undefined);
        }}
        onSelectSubcategory={(catId, sub) => {
          setSelectedCategory(catId);
          setSelectedSubcategory(sub);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 py-3 space-y-4">
        
        {/* Active Filters / Breadcrumb Banner */}
        {(selectedCategory || selectedSubcategory || searchQuery) && (
          <div className="bg-white p-3 rounded border border-gray-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-500 font-medium">Showing results for:</span>
              {selectedCategory && (
                <span className="bg-blue-50 text-[#2874f0] px-2 py-0.5 rounded font-bold uppercase">
                  {categories.find((c) => c.id === selectedCategory)?.name}
                </span>
              )}
              {selectedSubcategory && (
                <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-bold">
                  {selectedSubcategory}
                </span>
              )}
              {searchQuery && (
                <span className="bg-yellow-50 text-gray-800 px-2 py-0.5 rounded font-bold">
                  "{searchQuery}"
                </span>
              )}
            </div>

            <button
              onClick={() => {
                setSelectedCategory(undefined);
                setSelectedSubcategory(undefined);
                setSearchQuery('');
                setFilters({ sortBy: 'popularity', maxPrice: 150000 });
              }}
              className="text-xs text-red-600 hover:underline font-bold"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Hero Banner (Shown on home feed when no search/filters active) */}
        {!selectedCategory && !searchQuery && (
          <HeroBanner
            onBannerClick={() => {
              setSelectedCategory('mobiles');
            }}
          />
        )}

        {/* Deals of the Day (Shown on home feed) */}
        {!selectedCategory && !searchQuery && (
          <DealsSection
            products={products}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onViewAllDeals={() => setSelectedCategory('electronics')}
          />
        )}

        {/* Products Grid & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
          
          {/* Left Filter Sidebar */}
          <div className="lg:col-span-1 hidden lg:block sticky top-36">
            <ProductFilters
              filters={filters}
              onFilterChange={(newFilters) => setFilters(newFilters)}
              onResetFilters={() => setFilters({ sortBy: 'popularity', maxPrice: 150000 })}
              availableBrands={availableBrands}
            />
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-3 space-y-3">
            
            {/* Header info */}
            <div className="bg-white p-3 rounded-md shadow-xs border border-gray-200 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700">
                {products.length} {products.length === 1 ? 'Product' : 'Products'} Available
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 hidden sm:inline">Sort:</span>
                <select
                  value={filters.sortBy || 'popularity'}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                  className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-[#2874f0] font-semibold"
                >
                  <option value="popularity">Relevance / Popularity</option>
                  <option value="price_low_high">Price -- Low to High</option>
                  <option value="price_high_low">Price -- High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="bg-white rounded p-12 text-center text-gray-500 font-semibold border">
                Loading products...
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center text-gray-600 border space-y-3">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="text-lg font-bold">No Products Found</h3>
                <p className="text-xs text-gray-500">
                  Try clearing your search query or price filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(undefined);
                    setSelectedSubcategory(undefined);
                    setSearchQuery('');
                    setFilters({ sortBy: 'popularity', maxPrice: 150000 });
                  }}
                  className="bg-[#2874f0] text-white px-4 py-2 rounded text-xs font-bold uppercase"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.some((p) => p.id === product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    onClickProduct={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          isWishlisted={wishlist.some((p) => p.id === selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          currentPincode={pincode}
        />
      )}

      {/* Cart Drawer View */}
      {showCart && (
        <CartView
          cart={cart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onProceedToCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
          onCloseCart={() => setShowCart(false)}
          currentAddress={INITIAL_ADDRESS}
        />
      )}

      {/* Secure Checkout Modal */}
      {showCheckout && (
        <SecureCheckoutModal
          cart={cart}
          currentAddress={INITIAL_ADDRESS}
          onClose={() => setShowCheckout(false)}
          onOrderComplete={handleOrderComplete}
        />
      )}

      {/* Orders View */}
      {showOrders && (
        <OrdersView
          orders={orders}
          onClose={() => setShowOrders(false)}
        />
      )}

      {/* Wishlist Modal */}
      {showWishlistModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl relative text-gray-800 my-auto">
            <div className="bg-[#2874f0] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                <h3 className="font-extrabold text-lg">My Wishlist ({wishlist.length})</h3>
              </div>
              <button onClick={() => setShowWishlistModal(false)}>
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-4 sm:p-6 bg-gray-50">
              {wishlist.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">Your wishlist is empty.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {wishlist.map((item) => (
                    <div key={item.id} className="bg-white p-3 rounded border flex items-center gap-3">
                      <img src={item.image} alt="" className="w-16 h-16 object-contain p-1" />
                      <div className="flex-1 space-y-1">
                        <h4 className="text-xs font-bold line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-green-700 font-extrabold">₹{item.price.toLocaleString('en-IN')}</p>
                        <button
                          onClick={() => {
                            handleAddToCart(item);
                            setShowWishlistModal(false);
                            setShowCart(true);
                          }}
                          className="bg-[#ff9f00] text-white px-3 py-1 rounded text-[11px] font-bold uppercase"
                        >
                          Move to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
