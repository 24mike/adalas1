import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useStore } from '@/hooks/useStore';
import { Gem, Leaf, Ruler, Truck } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Gem,
  Leaf,
  Ruler,
  Truck,
};

export function About() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { currentStore } = useStore();

  return (
    <section
      id="about"
      ref={ref}
      className="w-full py-20 lg:py-32 bg-gray-50 overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-20'
            }`}
          >
            {/* Decorative Elements */}
            <div 
              className="absolute -top-8 -left-8 w-full h-full border-2 rounded-lg"
              style={{ borderColor: `${currentStore.primaryColor}30` }}
            />
            <div 
              className="absolute -bottom-8 -right-8 w-2/3 h-2/3 rounded-lg"
              style={{ backgroundColor: `${currentStore.primaryColor}10` }}
            />
            
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <img
                src={currentStore.aboutImage}
                alt={`About ${currentStore.name}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Stats Card */}
            <div
              className={`absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl transition-all duration-700 delay-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${currentStore.primaryColor}15` }}
                >
                  <span 
                    className="font-display text-2xl font-bold"
                    style={{ color: currentStore.primaryColor }}
                  >
                    10+
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Years of</p>
                  <p className="text-gray-500">Excellence</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
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
                About Us
              </p>
              <h2 className="section-title mb-6">
                Crafting Style with{' '}
                <span style={{ color: currentStore.primaryColor }}>Passion</span>
              </h2>
            </div>

            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At {currentStore.name}, we believe every person deserves to feel confident
                and express their unique style. {currentStore.description}
              </p>
              <p className="text-gray-600 leading-relaxed mb-10">
                Founded with a passion for fashion and a commitment to quality,
                we source the finest materials and work with skilled artisans to
                create pieces that not only look stunning but feel incredible to
                wear.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {currentStore.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon] || Gem;
                return (
                  <div
                    key={feature.id}
                    className={`group p-6 bg-white rounded-lg hover:shadow-lg transition-all duration-500 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
                      style={{ 
                        backgroundColor: `${currentStore.primaryColor}15`,
                      }}
                    >
                      <IconComponent 
                        className="w-6 h-6 transition-colors duration-300"
                        style={{ color: currentStore.primaryColor }}
                      />
                    </div>
                    <h3 className="font-display text-lg font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
