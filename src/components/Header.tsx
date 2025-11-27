
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Sparkles, Menu, Heart, User, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { categories } from '@/lib/types';
import { useUser, useAuth } from '@/firebase';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Header() {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  const navItems = categories.filter(c => c.slug !== 'all');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignOut = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      toast({ title: "Signed Out", description: "You have been successfully signed out." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to sign out." });
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">HetalShruti</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
          {navItems.map((item) => (
            <Link key={item.slug} href={`/category/${item.slug}`} className="transition-colors hover:text-primary">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <div className="relative">
                <Heart className="h-6 w-6 text-accent" />
                {isClient && wishlistCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <div className="relative">
                <ShoppingBag className="h-6 w-6 text-accent" />
                {isClient && itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </div>
            </Button>
          </Link>
          
          {isClient && (
            <>
              {!isUserLoading && (
                user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <User className="h-6 w-6 text-accent" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => { /* Navigate to profile page */ }}>Profile</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { /* Navigate to orders page */ }}>My Orders</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="hidden md:flex">
                     <Button variant="outline" asChild>
                        <Link href="/auth/login">
                            <LogIn className="mr-2"/>
                            Login
                        </Link>
                     </Button>
                  </div>
                )
              )}

              <div className="md:hidden">
                  <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                      <div className="flex flex-col gap-6 p-6">
                          <Link href="/" className="flex items-center gap-2 mb-4">
                              <Sparkles className="h-8 w-8 text-primary" />
                              <span className="font-headline text-2xl font-bold text-primary">HetalShruti</span>
                          </Link>
                          {navItems.map((item) => (
                              <Link key={item.slug} href={`/category/${item.slug}`} className="text-xl transition-colors hover:text-primary">
                              {item.name}
                              </Link>
                          ))}
                          <div className="mt-4 border-t pt-4">
                          {!isUserLoading && !user && (
                              <Link href="/auth/login">
                              <Button className="w-full">Login / Sign Up</Button>
                              </Link>
                          )}
                          </div>
                      </div>
                  </SheetContent>
                  </Sheet>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
