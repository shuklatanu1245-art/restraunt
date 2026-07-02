"use client";

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShoppingCart, Plus, Minus, Search, Trash2, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { menuItems, menuCategories, restaurantConfig } from '@/data/menu';

function MenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart, addToCart, updateQuantity, removeFromCart, cartTotal, cartCount, clearCart } = useCart();
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [tableNumber, setTableNumber] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);
  
  const itemRefs = useRef({});

  // Parse Table Number and Select items from Query Params
  useEffect(() => {
    const table = searchParams.get('table');
    if (table) {
      setTableNumber(table);
    } else {
      setTableNumber('01'); // default fallback table
    }

    const selectId = searchParams.get('select');
    if (selectId && itemRefs.current[selectId]) {
      setTimeout(() => {
        itemRefs.current[selectId].scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add a temporary highlight effect
        itemRefs.current[selectId].classList.add('ring-4', 'ring-accent');
        setTimeout(() => {
          itemRefs.current[selectId].classList.remove('ring-4', 'ring-accent');
        }, 2000);
      }, 500);
    }
  }, [searchParams]);

  // Filter Menu Items
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get item count in cart
  const getItemQuantity = (itemId) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Place Order Simulation
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const orderId = `QR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderId,
      table: tableNumber,
      items: [...cart],
      total: cartTotal,
      timestamp: new Date().toISOString()
    };

    // Store in localStorage for feedback reference or listing
    const previousOrders = JSON.parse(localStorage.getItem('qr_bites_orders') || '[]');
    localStorage.setItem('qr_bites_orders', JSON.stringify([...previousOrders, newOrder]));

    setPlacedOrderDetails(newOrder);
    setOrderPlaced(true);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Table Banner */}
      <div className="bg-primary text-cream py-3 px-4 text-center text-xs font-semibold tracking-wider uppercase border-b border-accent/20 flex items-center justify-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping"></span>
        <span>Ordering from <strong className="text-accent">Table {tableNumber}</strong></span>
      </div>

      {/* Menu Header with Category Slider */}
      <div className="sticky top-16 z-30 bg-cream/95 backdrop-blur border-b border-accent/10 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
            <input
              type="text"
              placeholder="Search dishes (e.g. coffee, burger)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-accent/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-primary placeholder-dark-muted/50 focus:outline-none focus:border-primary font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-primary text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar justify-start md:justify-center">
            {menuCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-primary text-accent shadow-md'
                    : 'bg-white text-dark-muted border border-accent/10 hover:border-accent/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Menu Items Grid */}
          <div className="lg:col-span-8 space-y-8">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredItems.map((item) => {
                  const qty = getItemQuantity(item.id);
                  return (
                    <div
                      key={item.id}
                      ref={el => itemRefs.current[item.id] = el}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-accent/10 flex flex-col h-full hover:border-accent/30 transition-all duration-200"
                    >
                      {/* Photo */}
                      <div className="relative h-44 bg-cream-dark">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.popular && (
                          <span className="absolute top-3 right-3 bg-primary/95 text-accent text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-accent/20">
                            Chef's Fav
                          </span>
                        )}
                        <span className="absolute bottom-3 left-3 bg-white/95 text-primary text-xs font-black px-2 py-1 rounded shadow-sm border border-accent/10">
                          ₹{item.price}
                        </span>
                      </div>

                      {/* Detail Section */}
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-1">
                          <h3 className="font-serif text-base font-bold text-primary">{item.name}</h3>
                          <p className="text-xs text-dark-muted font-sans leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {/* Order Controls */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-[10px] text-accent font-extrabold uppercase tracking-wider">
                            {item.category}
                          </span>

                          {qty > 0 ? (
                            <div className="flex items-center space-x-2.5 bg-primary text-cream rounded-xl p-1 shadow-sm">
                              <button
                                onClick={() => updateQuantity(item.id, qty - 1)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-primary-light text-accent transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-sans font-bold text-sm w-4 text-center">{qty}</span>
                              <button
                                onClick={() => addToCart(item)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-primary-light text-accent transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item)}
                              className="px-4 py-2 bg-cream hover:bg-primary hover:text-white border border-primary/20 text-primary font-sans text-xs font-bold uppercase rounded-xl transition-all duration-200"
                            >
                              + Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-accent/10 p-12 text-center max-w-md mx-auto space-y-4">
                <span className="text-4xl">🥘</span>
                <h3 className="font-serif text-lg font-bold text-primary">No dishes found</h3>
                <p className="text-xs text-dark-muted font-sans">
                  We couldn't find any dishes matching "{searchQuery}". Try searching for another keyword.
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                  className="px-4 py-2 bg-primary text-accent text-xs font-bold uppercase rounded-xl"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Desktop Sidebar Cart */}
          <div className="hidden lg:block lg:col-span-4 sticky top-48 bg-white border border-accent/15 rounded-2xl p-6 shadow-md space-y-6">
            <div className="flex items-center space-x-2 border-b border-accent/10 pb-4">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-lg font-bold text-primary">Order Summary</h2>
              <span className="bg-accent/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full ml-auto">
                {cartCount} items
              </span>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm font-sans">
                      <div className="space-y-0.5">
                        <span className="font-bold text-primary block leading-tight">{item.name}</span>
                        <span className="text-xs text-dark-muted block">₹{item.price} each</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1.5 bg-cream border border-accent/25 rounded-lg p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center hover:bg-cream-dark text-primary rounded"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-5 h-5 flex items-center justify-center hover:bg-cream-dark text-primary rounded"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <span className="font-bold text-primary w-12 text-right">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-accent/10 pt-4 space-y-2 font-sans">
                  <div className="flex justify-between text-xs text-dark-muted">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#25D366] font-semibold bg-[#25D366]/5 px-2 py-1 rounded">
                    <span>GST & Service Charge</span>
                    <span>₹0 (Waived)</span>
                  </div>
                  <div className="flex justify-between font-serif text-lg font-black text-primary border-t border-dashed border-accent/15 pt-2">
                    <span>Total Amount</span>
                    <span>₹{cartTotal}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-primary hover:bg-primary-light text-cream hover:text-accent font-sans text-xs font-bold uppercase py-3.5 rounded-xl shadow-md transition-all duration-200"
                >
                  Place Order (Table {tableNumber})
                </button>
              </>
            ) : (
              <div className="text-center py-10 space-y-3 font-sans">
                <span className="text-3xl block opacity-30">🛒</span>
                <p className="text-xs text-dark-muted">Your cart is empty.</p>
                <p className="text-[10px] text-accent font-bold uppercase tracking-wider">Add mouthwatering food above to start ordering!</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Floating Mobile Cart Bar */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 bg-primary text-cream rounded-2xl shadow-2xl p-4 border border-accent/25 flex items-center justify-between animate-fadeInUp">
          <div className="flex items-center space-x-3">
            <div className="relative bg-accent text-primary w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-md">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-white text-primary text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <div>
              <span className="text-xs text-cream/70 block leading-none font-sans">Table {tableNumber}</span>
              <span className="text-base font-black text-accent font-serif">₹{cartTotal}</span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-accent text-primary hover:bg-white hover:text-primary font-sans text-xs font-extrabold uppercase px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center space-x-1"
          >
            <span>View Cart</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Mobile Cart Details Modal / Bottom Sheet */}
      {isCartOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-dark/65 backdrop-blur-sm flex flex-col justify-end animate-fadeInUp">
          <div className="bg-white rounded-t-3xl border-t border-accent/20 p-6 space-y-6 max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-accent/10 pb-4">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h3 className="font-serif text-lg font-bold text-primary">Your Cart</h3>
                <span className="bg-accent/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                  Table {tableNumber}
                </span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="p-1 rounded-full bg-cream hover:bg-cream-dark text-dark-muted"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm font-sans py-2 border-b border-accent/5">
                  <div className="space-y-0.5">
                    <span className="font-bold text-primary block leading-tight">{item.name}</span>
                    <span className="text-xs text-dark-muted block">₹{item.price} each</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1.5 bg-cream border border-accent/20 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-cream-dark text-primary rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-cream-dark text-primary rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-primary w-12 text-right">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total summary */}
            <div className="space-y-2 border-t border-accent/10 pt-4 font-sans text-xs">
              <div className="flex justify-between text-dark-muted">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-[#25D366] font-semibold bg-[#25D366]/5 px-2 py-1 rounded">
                <span>GST & Service Charge</span>
                <span>₹0 (Waived)</span>
              </div>
              <div className="flex justify-between font-serif text-lg font-black text-primary border-t border-dashed border-accent/15 pt-2">
                <span>Total Amount</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2 pt-2">
              <button
                onClick={clearCart}
                className="px-4 py-3 bg-cream hover:bg-cream-dark border border-accent/25 text-primary font-sans text-xs font-bold uppercase rounded-xl transition-all"
                title="Clear Cart"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={handlePlaceOrder}
                className="flex-grow py-3 bg-primary hover:bg-primary-light text-cream hover:text-accent font-sans text-xs font-bold uppercase rounded-xl shadow-lg transition-all"
              >
                Confirm Order & Place
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Order Success Confirmation Overlay */}
      {orderPlaced && placedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-dark/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeInUp">
          <div className="bg-white rounded-2xl border border-accent/20 p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative">
            <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-accent font-extrabold uppercase tracking-widest block">Order Placed Successfully</span>
              <h3 className="font-serif text-2xl font-black text-primary">Your food is cooking!</h3>
              <p className="text-xs text-dark-muted font-sans">
                Order ID: <strong className="text-primary font-bold">{placedOrderDetails.orderId}</strong> | Table: <strong className="text-primary font-bold">{placedOrderDetails.table}</strong>
              </p>
            </div>

            {/* Item list review */}
            <div className="bg-cream rounded-xl p-4 text-left space-y-2 text-xs font-sans border border-accent/10">
              <span className="font-bold text-primary border-b border-accent/10 pb-1.5 block">Summary</span>
              <div className="space-y-1.5 max-h-[120px] overflow-y-auto">
                {placedOrderDetails.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-dark-muted">
                    <span>{item.name} <strong className="text-primary">x{item.quantity}</strong></span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-primary pt-1.5 border-t border-accent/10">
                <span>Total Bill</span>
                <span>₹{placedOrderDetails.total}</span>
              </div>
            </div>

            <div className="space-y-3 font-sans">
              <p className="text-[10px] text-dark-muted">
                To complete your contactless flow, please proceed to pay online.
              </p>
              <button
                onClick={() => {
                  setOrderPlaced(false);
                  router.push(`/payment?amount=${placedOrderDetails.total}&orderId=${placedOrderDetails.orderId}`);
                }}
                className="w-full py-3.5 bg-[#7A0C16] hover:bg-primary-light text-cream hover:text-accent text-xs font-bold uppercase rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceed to Pay</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setOrderPlaced(false)}
                className="text-xs text-dark-muted font-semibold underline hover:text-primary block mx-auto"
              >
                Pay at counter / Later
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-accent rounded-full animate-spin"></div>
        <p className="font-sans text-xs text-primary font-bold uppercase tracking-wider">Loading Digital Menu...</p>
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}
