import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = PlaceHolderImages.find(p => p.id === product.images[0].id);

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <CardContent className="p-0">
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
