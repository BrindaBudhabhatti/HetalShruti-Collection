"use client";

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function ProductInteraction({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes[0] || null);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size.");
      return;
    }
    setError(null);
    addToCart(product, selectedSize);
  };

  return (
    <>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-foreground">Size</h3>
        <RadioGroup
          value={selectedSize ?? ""}
          onValueChange={setSelectedSize}
          className="mt-4 flex flex-wrap gap-4"
        >
          {product.sizes.map((size) => (
            <div key={size}>
              <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
              <Label
                htmlFor={`size-${size}`}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border text-sm transition-colors
                  ${selectedSize === size ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="mt-8">
        <Button onClick={handleAddToCart} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          Add to Cart
        </Button>
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </div>
    </>
  );
}
