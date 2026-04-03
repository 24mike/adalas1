export interface Store {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  heroImage: string;
  aboutImage: string;
  lookbookImages: string[];
  instagramImages: string[];
  features: Feature[];
}

export interface Product {
  id: number;
  storeId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: number;
  storeId: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface LookbookSlide {
  id: number;
  storeId: string;
  title: string;
  description: string;
  image: string;
  cta: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}
