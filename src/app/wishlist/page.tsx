"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Heart } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-12">
        <Breadcrumb className="mb-8">
            <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>Wishlist</BreadcrumbPage>
            </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
      <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl mb-8">My Wishlist</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-2xl font-semibold">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added any items to your wishlist yet.</p>
          <Button asChild className="mt-6">
            <Link href="/category/all">Explore Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {items.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
}
