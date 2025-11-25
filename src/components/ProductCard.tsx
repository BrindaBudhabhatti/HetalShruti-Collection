"use client";

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useWishlist } from '@/hooks/use-wishlist';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = PlaceHolderImages.find(p => p.id === product.images[0].id);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  }

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <CardContent className="p-0 relative">
           <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 z-10 rounded-full bg-background/70 hover:bg-background"
            onClick={handleWishlistToggle}
            aria-label="Toggle Wishlist"
          >
            <Heart className={cn("h-6 w-6 text-accent transition-all", inWishlist && "fill-accent")} />
          </Button>
          <div className="relative aspect-[3/4] w-full">
            {image && (
                <Image
                src={image.imageUrl}
                alt={product.images[0].alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            )}
          </div>
          <div className="p-4">
            <h3 className="font-headline text-lg font-semibold tracking-tight truncate">{product.name}</h3>
            <p className="mt-2 text-primary font-medium">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
