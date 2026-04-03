import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useStore } from '@/hooks/useStore';
import { Instagram, Send, Check } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { currentStore } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section
      id="newsletter"
      ref={ref}
      className="w-full py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Newsletter Content */}
          <div>
            <div
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <p 
                className="text-sm font-medium uppercase tracking-wider mb-4"
                style={{ color: currentStore.primaryColor }}
              >
                Newsletter
              </p>
              <h2 className="section-title mb-6">
                Stay in <span style={{ color: currentStore.primaryColor }}>Style</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Subscribe to our newsletter for exclusive offers, new arrivals,
                and styling tips. Be the first to know about our latest
                collections and special promotions.
              </p>
            </div>

            {/* Email Form */}
            <form
              onSubmit={handleSubmit}
              className={`transition-all duration-700 delay-200 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 border border-gray-200 focus:ring-2 outline-none transition-all duration-300"
                    style={{ '--tw-ring-color': `${currentStore.primaryColor}40` } as React.CSSProperties}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`px-8 py-4 font-medium flex items-center justify-center gap-2 transition-all duration-300 text-white ${
                    isSubmitted
                      ? 'bg-green-500'
                      : 'hover:opacity-90'
                  }`}
                  style={{ backgroundColor: isSubmitted ? undefined : currentStore.primaryColor }}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                By subscribing, you agree to receive marketing emails from
                {currentStore.name}. Unsubscribe anytime.
              </p>
            </form>

            {/* Benefits */}
            <div
              className={`grid grid-cols-2 gap-6 mt-10 transition-all duration-700 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${currentStore.primaryColor}15` }}
                >
                  <Check className="w-5 h-5" style={{ color: currentStore.primaryColor }} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Exclusive Deals</h4>
                  <p className="text-sm text-gray-500">Get 10% off your first order</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${currentStore.primaryColor}15` }}
                >
                  <Check className="w-5 h-5" style={{ color: currentStore.primaryColor }} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Early Access</h4>
                  <p className="text-sm text-gray-500">Be first to shop new arrivals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instagram Grid */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-20'
            }`}
          >
            <div className="text-center mb-6">
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <Instagram className="w-5 h-5" />
                Follow us on Instagram
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl font-bold hover:underline"
                style={{ color: currentStore.primaryColor }}
              >
                @{currentStore.name.toLowerCase().replace(' ', '')}.fashion
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {currentStore.instagramImages.map((image, index) => (
                <a
                  key={index}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative aspect-square overflow-hidden rounded-lg transition-all duration-500 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <img
                    src={image}
                    alt={`Instagram ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ backgroundColor: `${currentStore.primaryColor}CC` }}
                  >
                    <Instagram className="w-10 h-10 text-white" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
