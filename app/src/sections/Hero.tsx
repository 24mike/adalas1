import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '@/hooks/useStore';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentStore } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToCollection = () => {
    const element = document.querySelector('#collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: `linear-gradient(135deg, white 0%, ${currentStore.primaryColor}15 50%, white 100%)`,
      }}
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ 
            backgroundColor: `${currentStore.primaryColor}20`,
            animation: 'float 10s ease-in-out infinite'
          }}
        />
        <div
          className={`absolute bottom-40 right-20 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 delay-200 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ 
            backgroundColor: `${currentStore.primaryColor}15`,
            animation: 'float 12s ease-in-out infinite 2s'
          }}
        />
        <div
          className={`absolute top-1/2 left-1/3 w-48 h-48 rounded-full blur-2xl transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ 
            backgroundColor: `${currentStore.primaryColor}18`,
            animation: 'float 8s ease-in-out infinite 1s'
          }}
        />
      </div>

      <div className="relative w-full min-h-screen flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div className="space-y-2">
                <h1
                  className={`font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-black leading-tight transition-all duration-700 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  Discover
                </h1>
                <h1
                  className={`font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight transition-all duration-700 delay-100 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ color: currentStore.primaryColor }}
                >
                  Your
                </h1>
                <h1
                  className={`font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-black leading-tight transition-all duration-700 delay-200 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  Unique
                </h1>
                <h1
                  className={`font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight transition-all duration-700 delay-300 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ color: currentStore.primaryColor }}
                >
                  Style
                </h1>
              </div>

              <p
                className={`mt-8 text-lg text-gray-600 max-w-md mx-auto lg:mx-0 transition-all duration-700 delay-400 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {currentStore.description}
              </p>

              <div
                className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <button
                  onClick={scrollToCollection}
                  className="flex items-center justify-center gap-2 group text-white px-8 py-4 font-medium transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: currentStore.primaryColor }}
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={scrollToCollection}
                  className="btn-secondary flex items-center justify-center"
                >
                  View Collection
                </button>
              </div>

              {/* Stats */}
              <div
                className={`mt-16 grid grid-cols-3 gap-8 transition-all duration-700 delay-600 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-center lg:text-left">
                  <p 
                    className="font-display text-3xl font-bold"
                    style={{ color: currentStore.primaryColor }}
                  >
                    500+
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Products</p>
                </div>
                <div className="text-center lg:text-left">
                  <p 
                    className="font-display text-3xl font-bold"
                    style={{ color: currentStore.primaryColor }}
                  >
                    10k+
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Customers</p>
                </div>
                <div className="text-center lg:text-left">
                  <p 
                    className="font-display text-3xl font-bold"
                    style={{ color: currentStore.primaryColor }}
                  >
                    4.9
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Rating</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div
              className={`order-1 lg:order-2 relative transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="relative aspect-[4/5] lg:aspect-[3/4] max-w-lg mx-auto">
                {/* Decorative Frame */}
                <div 
                  className="absolute -inset-4 border-2 rounded-lg transform rotate-3"
                  style={{ borderColor: `${currentStore.primaryColor}30` }}
                />
                <div 
                  className="absolute -inset-8 border rounded-lg transform -rotate-2"
                  style={{ borderColor: `${currentStore.primaryColor}15` }}
                />
                
                {/* Main Image */}
                <img
                  src={currentStore.heroImage}
                  alt={currentStore.name}
                  className="relative w-full h-full object-cover rounded-lg shadow-2xl"
                />
                
                {/* Floating Badge */}
                <div
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl animate-float"
                >
                  <p className="text-xs text-gray-500 uppercase tracking-wide">New Collection</p>
                  <p 
                    className="font-display text-lg font-bold"
                    style={{ color: currentStore.primaryColor }}
                  >
                    2024
                  </p>
                </div>
                
                {/* Price Tag */}
                <div
                  className="absolute -top-4 -right-4 text-white p-4 rounded-lg shadow-xl animate-float-delayed"
                  style={{ backgroundColor: currentStore.primaryColor }}
                >
                  <p className="text-xs uppercase tracking-wide">Starting at</p>
                  <p className="font-display text-xl font-bold">$25</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
