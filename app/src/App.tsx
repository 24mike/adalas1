import { StoreProvider } from '@/hooks/useStore';
import { CartProvider } from '@/hooks/useCart';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Collection } from '@/sections/Collection';
import { About } from '@/sections/About';
import { Lookbook } from '@/sections/Lookbook';
import { Testimonials } from '@/sections/Testimonials';
import { Newsletter } from '@/sections/Newsletter';
import { Footer } from '@/sections/Footer';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Hero />
            <Collection />
            <About />
            <Lookbook />
            <Testimonials />
            <Newsletter />
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </CartProvider>
    </StoreProvider>
  );
}

export default App;
