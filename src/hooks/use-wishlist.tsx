"use client";

import type { Product } from '@/lib/types';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import { useToast } from './use-toast';

interface WishlistContextType {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        setItems(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const toggleWishlist = useCallback((product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        toast({
          title: "Removed from Wishlist",
          description: `${product.name} has been removed from your wishlist.`,
          variant: 'destructive',
        });
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        toast({
          title: "Added to Wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
        return [...prevItems, product];
      }
    });
  }, [toast]);
  
  const isInWishlist = useCallback((productId: string) => {
    return items.some(item => item.id === productId);
  }, [items]);

  const wishlistCount = useMemo(() => {
    return items.length;
  }, [items]);
  
  const value = useMemo(() => ({
    items,
    toggleWishlist,
    isInWishlist,
    wishlistCount
  }), [items, toggleWishlist, isInWishlist, wishlistCount]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
