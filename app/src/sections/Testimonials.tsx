import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useStore } from '@/hooks/useStore';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { getTestimonialsByStore } from '@/config/stores';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { currentStore } = useStore();

  const testimonials = getTestimonialsByStore(currentStore.id);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Reset index when store changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [currentStore.id]);

  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      ref={ref}
      className="w-full py-20 lg:py-32 bg-gray-50 overflow-hidden"
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
            Testimonials
          </p>
          <h2 className="section-title mb-6">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from real customers who have experienced the {currentStore.name}
            difference.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Quote Icon */}
          <div 
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-float"
            style={{ backgroundColor: currentStore.primaryColor }}
          >
            <Quote className="w-8 h-8 text-white" />
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 pt-16 relative overflow-hidden">
            {/* Decorative Background */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2"
              style={{ backgroundColor: `${currentStore.primaryColor}08` }}
            />
            <div 
              className="absolute bottom-0 left-0 w-48 h-48 rounded-full translate-y-1/2 -translate-x-1/2"
              style={{ backgroundColor: `${currentStore.primaryColor}08` }}
            />

            {/* Content */}
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === currentIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 absolute inset-0 translate-x-10'
                  }`}
                >
                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 fill-coral text-coral animate-pulse"
                        style={{ 
                          fill: currentStore.primaryColor,
                          color: currentStore.primaryColor,
                          animationDelay: `${i * 100}ms`
                        }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-center text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 font-light italic">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-20 h-20 rounded-full overflow-hidden border-4 mb-4"
                      style={{ borderColor: `${currentStore.primaryColor}30` }}
                    >
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-display text-xl font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p 
                      className="text-sm font-medium"
                      style={{ color: currentStore.primaryColor }}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:text-white transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = currentStore.primaryColor;
                  e.currentTarget.style.borderColor = currentStore.primaryColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? 'w-8 h-2'
                        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    style={{
                      backgroundColor: index === currentIndex ? currentStore.primaryColor : undefined,
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:text-white transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = currentStore.primaryColor;
                  e.currentTarget.style.borderColor = currentStore.primaryColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div
          className={`flex flex-wrap justify-center gap-8 mt-16 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center gap-2 text-gray-500">
            <Star 
              className="w-5 h-5" 
              style={{ fill: currentStore.primaryColor, color: currentStore.primaryColor }}
            />
            <span className="font-medium">4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="font-medium">10,000+ Happy Customers</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="font-medium">Free Returns</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="font-medium">Secure Checkout</span>
          </div>
        </div>
      </div>
    </section>
  );
}
