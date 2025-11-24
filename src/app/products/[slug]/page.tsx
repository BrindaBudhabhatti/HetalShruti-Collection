import { getProductBySlug, getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProductInteraction from './ProductInteraction';
import OutfitRecommender from '@/components/OutfitRecommender';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { categories } from '@/lib/types';


export async function generateStaticParams() {
    const products = getProducts();
    return products.map(product => ({ slug: product.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const category = categories.find(c => c.slug === product.category);

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
            {category && (
                <>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={`/category/${category.slug}`}>{category.name}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                </>
            )}
            <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
            </BreadcrumbList>
      </Breadcrumb>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
           <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img, index) => {
                  const image = PlaceHolderImages.find(p => p.id === img.id);
                  return (
                    <CarouselItem key={index}>
                        <div className="aspect-[3/4] relative">
                        {image && (
                            <Image
                                src={image.imageUrl}
                                alt={img.alt}
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={index === 0}
                                data-ai-hint={image.imageHint}
                            />
                        )}
                        </div>
                    </CarouselItem>
                  )
                })}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-3xl text-primary font-medium">₹{product.price.toLocaleString('en-IN')}</p>
          <div className="mt-6">
            <ProductInteraction product={product} />
          </div>

          <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {product.description}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="details">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Category: <span className="capitalize">{product.category.replace('-', ' ')}</span></li>
                    <li>Occasion: <span className="capitalize">{product.tags.join(', ')}</span></li>
                    <li>Care: Dry clean only</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="size-guide">
              <AccordionTrigger>Size Guide</AccordionTrigger>
              <AccordionContent>
                <p>All measurements are in inches.</p>
                <ul className="mt-2 space-y-1">
                    <li><strong>S:</strong> Bust 34", Waist 28"</li>
                    <li><strong>M:</strong> Bust 36", Waist 30"</li>
                    <li><strong>L:</strong> Bust 38", Waist 32"</li>
                    <li><strong>XL:</strong> Bust 40", Waist 34"</li>
                    <li><strong>XXL:</strong> Bust 42", Waist 36"</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
       <div className="mt-24">
        <OutfitRecommender product={product} />
      </div>
    </div>
  );
}

// Create a new file for this component to keep the page as a Server Component
// src/app/products/[slug]/ProductInteraction.tsx
import { useState } from 'react';
import type { Product } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';

function ProductInteraction({ product }: { product: Product }) {
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
