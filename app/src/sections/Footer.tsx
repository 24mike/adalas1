import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useStore } from '@/hooks/useStore';
import { Facebook, Instagram, Twitter, CreditCard, Truck, ShieldCheck, RotateCcw } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Shop All', href: '#collection' },
  { name: 'New Arrivals', href: '#collection' },
  { name: 'Best Sellers', href: '#collection' },
  { name: 'Sale', href: '#collection' },
];

const customerService = [
  { name: 'Contact Us', href: '#newsletter' },
  { name: 'Shipping Info', href: '#' },
  { name: 'Returns & Exchanges', href: '#' },
  { name: 'Size Guide', href: '#' },
  { name: 'FAQ', href: '#' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
];

const features = [
  { icon: Truck, text: 'Free Shipping over $75' },
  { icon: ShieldCheck, text: 'Secure Payment' },
  { icon: RotateCcw, text: '30-Day Returns' },
];

export function Footer() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { currentStore } = useStore();

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer ref={ref} className="w-full bg-gray-900 text-white">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-8">
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-4"
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${currentStore.primaryColor}20` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: currentStore.primaryColor }} />
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <a href="#home" className="font-display text-3xl font-bold text-white">
              <span style={{ color: currentStore.primaryColor }}>
                {currentStore.logo.split(' ')[0]}
              </span>
              {currentStore.logo.split(' ')[1] && (
                <span>{currentStore.logo.split(' ').slice(1).join(' ')}</span>
              )}
            </a>
            <p className="text-gray-400 mt-4 leading-relaxed">
              {currentStore.tagline}. Discover timeless pieces
              designed to make you feel confident and beautiful.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-300 hover:text-white"
                  style={{ '--hover-bg': currentStore.primaryColor } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = currentStore.primaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1f2937';
                  }}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="font-display text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    style={{ '--hover-color': currentStore.primaryColor } as React.CSSProperties}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="font-display text-lg font-bold mb-6">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {customerService.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="font-display text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <span className="block text-sm text-gray-500">Email</span>
                <a
                  href={`mailto:hello@${currentStore.name.toLowerCase().replace(' ', '')}.com`}
                  className="hover:text-white transition-colors duration-300"
                  style={{ '--hover-color': currentStore.primaryColor } as React.CSSProperties}
                >
                  hello@{currentStore.name.toLowerCase().replace(' ', '')}.com
                </a>
              </li>
              <li>
                <span className="block text-sm text-gray-500">Phone</span>
                <a
                  href="tel:+15551234567"
                  className="hover:text-white transition-colors duration-300"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <span className="block text-sm text-gray-500">Address</span>
                <span>123 Fashion Ave, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
          <div
            className={`flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-gray-500 text-sm">
              © 2024 {currentStore.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <CreditCard className="w-8 h-5 text-gray-500" />
              <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-xs font-bold text-gray-400">
                VISA
              </div>
              <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-xs font-bold text-gray-400">
                MC
              </div>
              <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-xs font-bold text-gray-400">
                AMEX
              </div>
              <div className="w-10 h-6 bg-gray-700 rounded flex items-center justify-center text-xs font-bold text-gray-400">
                PP
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
