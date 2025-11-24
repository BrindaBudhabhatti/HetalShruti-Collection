"use client";

import Link from 'next/link';
import { ShoppingBag, Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { categories } from '@/lib/types';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {
  const { itemCount } = useCart();
  const navItems = categories.filter(c => c.slug !== 'all');

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

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <div className="relative">
                <ShoppingBag className="h-6 w-6 text-accent" />
                {itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </div>
            </Button>
          </Link>
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
