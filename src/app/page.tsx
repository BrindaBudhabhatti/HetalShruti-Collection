import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const categories = [
  { name: 'Kurtas', href: '/category/kurtas', description: 'Graceful and elegant kurtas for every occasion.' },
  { name: 'Kurta Sets', href: '/category/kurta-sets', description: 'Complete ensembles for a coordinated look.' },
  { name: 'Lehengas', href: '/category/lehengas', description: 'Exquisite lehengas for celebrations.' },
];

export default function Home() {
  const featuredProducts = getProducts().slice(0, 4);
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <div className="space-y-16 md:space-y-24">
      <section className="relative h-[60vh] w-full text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
            Timeless Elegance
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
            Discover the exquisite collection of HetalShruti, where tradition meets contemporary design.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/category/kurtas">Shop Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
      
      <section className="container mx-auto px-4">
        <div className="text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">Our Collections</h2>
            <p className="mt-4 text-lg text-muted-foreground">Browse through our curated categories of ethnic wear.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {categories.map((category) => (
            <Link href={category.href} key={category.name} className="group">
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative h-96 w-full">
                    <Image
                      src={`https://picsum.photos/seed/${category.name.replace(/\s+/g, '-')}/600/800`}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint="ethnic fashion"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-headline text-3xl font-bold text-white">{category.name}</h3>
                    <p className="mt-2 text-white/90">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex items-center justify-center text-center">
            <Sparkles className="h-10 w-10 text-accent" />
            <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl ml-4">Featured Products</h2>
        </div>
        <p className="mt-4 text-center text-lg text-muted-foreground">Handpicked styles, just for you.</p>
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
                <Link href="/category/all">View All Products <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
