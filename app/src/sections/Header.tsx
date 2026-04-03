import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useStore } from '@/hooks/useStore';
import { StoreSelector } from '@/components/StoreSelector';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, items, totalPrice, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useCart();
  const { currentStore } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Shop', href: '#collection' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#newsletter' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className={`font-display text-2xl font-bold transition-all duration-300 ${
              isScrolled ? 'text-black scale-90' : 'text-black'
            }`}
          >
            <span style={{ color: currentStore.primaryColor }}>
              {currentStore.logo.split(' ')[0]}
            </span>
            {currentStore.logo.split(' ')[1] && (
              <span>{currentStore.logo.split(' ').slice(1).join(' ')}</span>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="relative text-sm font-medium text-gray-800 hover:text-coral transition-colors duration-300 group"
                style={{ '--hover-color': currentStore.primaryColor } as React.CSSProperties}
              >
                {link.name}
                <span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: currentStore.primaryColor }}
                />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Store Selector */}
            <div className="hidden sm:block">
              <StoreSelector />
            </div>

            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-800" />
            </button>

            {/* Cart */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <button
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                  aria-label="Shopping cart"
                >
                  <ShoppingBag className="w-5 h-5 text-gray-800" />
                  {totalItems > 0 && (
                    <span 
                      className="absolute -top-1 -right-1 w-5 h-5 text-white text-xs font-medium rounded-full flex items-center justify-center animate-scale-in"
                      style={{ backgroundColor: currentStore.primaryColor }}
                    >
                      {totalItems}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="font-display text-2xl">Your Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col h-[calc(100vh-180px)]">
                  {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-gray-500">Your cart is empty</p>
                      <p className="text-sm text-gray-400 mt-2">Add some items to get started</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto space-y-4 pr-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-24 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{item.name}</h4>
                              <p 
                                className="font-semibold mt-1"
                                style={{ color: currentStore.primaryColor }}
                              >
                                ${item.price.toFixed(2)}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 flex items-center justify-center bg-white border rounded hover:border-coral transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-medium w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 flex items-center justify-center bg-white border rounded hover:border-coral transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-auto p-1 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-display text-xl font-bold">
                            ${totalPrice.toFixed(2)}
                          </span>
                        </div>
                        <button 
                          className="w-full text-white py-4 font-medium transition-all duration-300 hover:opacity-90"
                          style={{ backgroundColor: currentStore.primaryColor }}
                        >
                          Checkout
                        </button>
                        <p className="text-xs text-gray-400 text-center mt-2">
                          Shipping calculated at checkout
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-800" />
              ) : (
                <Menu className="w-5 h-5 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-lg transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {/* Mobile Store Selector */}
        <div className="px-6 py-3 border-b border-gray-100">
          <StoreSelector />
        </div>
        <nav className="flex flex-col py-4">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
