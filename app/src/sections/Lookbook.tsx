import { useState, useEffect, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useStore } from '@/hooks/useStore';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { getLookbookByStore } from '@/config/stores';

export function Lookbook() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { currentStore } = useStore();

  const slides = getLookbookByStore(currentStore.id);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Reset slide when store changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [currentStore.id]);

  if (slides.length === 0) return null;

  return (
    <section
      id="lookbook"
      ref={ref}
      className="w-full py-20 lg:py-32 bg-white overflow-hidden"
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
            Lookbook
          </p>
          <h2 className="section-title mb-6">The Lookbook</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our latest collections through stunning visuals that capture
            the essence of {currentStore.name} style.
          </p>
        </div>

        {/* Slider */}
        <div
          className={`relative transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Slider Container */}
          <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentSlide
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105'
                }`}
              >
                {/* Background Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full px-8 lg:px-16">
                    <div
                      className={`max-w-xl transition-all duration-700 delay-300 ${
                        index === currentSlide
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-10'
                      }`}
                    >
                      <div className="glass-card p-8 lg:p-12 rounded-lg">
                        <h3 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
                          {slide.title}
                        </h3>
                        <p className="text-white/80 text-lg mb-8 leading-relaxed">
                          {slide.description}
                        </p>
                        <button 
                          className="text-white px-8 py-4 font-medium transition-all duration-300 flex items-center gap-2 group hover:opacity-90"
                          style={{ backgroundColor: currentStore.primaryColor }}
                        >
                          {slide.cta}
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:text-white transition-all duration-300 z-10"
            style={{ '--hover-bg': currentStore.primaryColor } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = currentStore.primaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:text-white transition-all duration-300 z-10"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = currentStore.primaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'w-8 h-2'
                    : 'w-2 h-2 bg-white/60 hover:bg-white'
                }`}
                style={{
                  backgroundColor: index === currentSlide ? currentStore.primaryColor : undefined,
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div
          className={`flex justify-center gap-4 mt-8 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`relative w-24 h-16 lg:w-32 lg:h-20 overflow-hidden rounded-lg transition-all duration-300 ${
                index === currentSlide
                  ? 'ring-2 ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                ringColor: index === currentSlide ? currentStore.primaryColor : undefined,
                '--tw-ring-color': currentStore.primaryColor,
              } as React.CSSProperties}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
