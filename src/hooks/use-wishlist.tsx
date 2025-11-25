"use client";

import type { Product } from '@/lib/types';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
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
  const previousItemsRef = useRef<Product[]>([]);

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        const parsedItems = JSON.parse(storedWishlist);
        setItems(parsedItems);
        previousItemsRef.current = parsedItems;
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
    
    // Compare current items with previous items to determine if an item was added or removed
    if (items.length > previousItemsRef.current.length) {
        const addedItem = items.find(item => !previousItemsRef.current.some(p => p.id === item.id));
        if (addedItem) {
             toast({
                title: "Added to Wishlist",
                description: `${addedItem.name} has been added to your wishlist.`,
            });
        }
    } else if (items.length < previousItemsRef.current.length) {
        const removedItem = previousItemsRef.current.find(item => !items.some(p => p.id === item.id));
        if (removedItem) {
            toast({
                title: "Removed from Wishlist",
                description: `${removedItem.name} has been removed from your wishlist.`,
                variant: 'destructive',
            });
        }
    }

    previousItemsRef.current = items;
  }, [items, toast]);

  const toggleWishlist = useCallback((product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        return [...prevItems, product];
      }
    });
  }, []);
  
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
