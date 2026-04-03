import { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useStore } from '@/hooks/useStore';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Product } from '@/types';
import { getProductsByStore } from '@/config/stores';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'casual', name: 'Casual' },
  { id: 'formal', name: 'Formal' },
  { id: 'party', name: 'Party' },
  { id: 'tops', name: 'Tops' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'outerwear', name: 'Outerwear' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'footwear', name: 'Footwear' },
];

export function Collection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { addToCart } = useCart();
  const { currentStore } = useStore();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const products = getProductsByStore(currentStore.id);

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.category === activeCategory);

  // Get relevant categories for current store
  const availableCategories = categories.filter(cat => 
    cat.id === 'all' || products.some(p => p.category === cat.id)
  );

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section
      id="collection"
      ref={ref}
      className="w-full py-20 lg:py-32 bg-white"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p 
            className="text-sm font-medium uppercase tracking-wider mb-4"
            style={{ color: currentStore.primaryColor }}
          >
            Our Products
          </p>
          <h2 className="section-title mb-6">Our Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection, designed to make
            you feel confident and beautiful on every occasion.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {availableCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: activeCategory === category.id ? currentStore.primaryColor : undefined,
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group relative transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${150 + index * 80}ms` }}
            >
              {/* Product Card */}
              <div className="relative overflow-hidden bg-gray-50">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-black text-white text-xs font-medium px-3 py-1">
                      New
                    </span>
                  )}
                  {product.isSale && (
                    <span 
                      className="text-white text-xs font-medium px-3 py-1"
                      style={{ backgroundColor: currentStore.primaryColor }}
                    >
                      Sale
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-white"
                  style={{
                    backgroundColor: wishlist.includes(product.id) ? currentStore.primaryColor : 'white',
                  }}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      wishlist.includes(product.id)
                        ? 'fill-white text-white'
                        : ''
                    }`}
                  />
                </button>

                {/* Product Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Quick Actions Overlay */}
                <div 
                  className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
                  style={{
                    background: `linear-gradient(to top, ${currentStore.primaryColor}80, transparent)`,
                  }}
                >
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-white text-black py-3 text-sm font-medium hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
                      style={{ '--hover-bg': currentStore.primaryColor } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = currentStore.primaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-12 bg-white text-black hover:text-white transition-colors duration-300 flex items-center justify-center"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = currentStore.primaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4">
                <h3 className="font-medium text-gray-900 group-hover:text-coral transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span 
                    className="font-semibold"
                    style={{ color: currentStore.primaryColor }}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-coral text-coral"
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">(24)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-4 text-sm font-medium underline"
              style={{ color: currentStore.primaryColor }}
            >
              View all products
            </button>
          </div>
        )}

        {/* View All Button */}
        <div
          className={`text-center mt-16 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button 
            className="btn-secondary inline-flex items-center gap-2"
            style={{ 
              borderColor: currentStore.primaryColor,
              color: currentStore.primaryColor,
            }}
          >
            View All Products
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick View Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-3xl">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-[3/4] bg-gray-50">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <DialogHeader>
                  <DialogTitle className="font-display text-3xl">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2 mt-4">
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: currentStore.primaryColor }}
                  >
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-gray-400 line-through">
                      ${selectedProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-coral text-coral" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">24 reviews</span>
                </div>
                <p className="text-gray-600 mt-6">
                  Elevate your wardrobe with this stunning piece. Crafted from
                  premium materials with attention to every detail, this item is
                  designed to make you feel confident and beautiful.
                </p>
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 text-white py-4 font-medium transition-all duration-300 hover:opacity-90 flex items-center justify-center gap-2"
                    style={{ backgroundColor: currentStore.primaryColor }}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`w-14 border flex items-center justify-center transition-colors duration-300 ${
                      wishlist.includes(selectedProduct.id)
                        ? 'text-white'
                        : 'border-gray-300'
                    }`}
                    style={{
                      backgroundColor: wishlist.includes(selectedProduct.id) ? currentStore.primaryColor : 'transparent',
                      borderColor: wishlist.includes(selectedProduct.id) ? currentStore.primaryColor : undefined,
                    }}
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        wishlist.includes(selectedProduct.id) ? 'fill-white' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
