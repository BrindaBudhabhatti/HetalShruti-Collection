import type { PlaceHolderImages } from "./placeholder-images";

export type Category = 'kurtas' | 'kurta-sets' | 'lehengas' | 'all';

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: {
    id: string;
    alt: string;
  }[];
  category: Category;
  tags: ('regular' | 'festive')[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
};

export type CartItem = {
  id: string;
  product: Product;
  size: string;
  quantity: number;
};

export const categories: { name: string; slug: Category; description: string }[] = [
    { name: 'All Products', slug: 'all', description: 'Browse our entire collection of ethnic wear.'},
    { name: 'Kurtas', slug: 'kurtas', description: 'Graceful and elegant kurtas for every occasion.' },
    { name: 'Kurta Sets', slug: 'kurta-sets', description: 'Complete ensembles for a coordinated look.' },
    { name: 'Lehengas', slug: 'lehengas', description: 'Exquisite lehengas for celebrations.' },
];
