import { getProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import type { Category } from '@/lib/types';
import { categories } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


export async function generateStaticParams() {
  return categories.map((cat) => ({
    categoryName: cat.slug,
  }));
}

export default function CategoryPage({ params }: { params: { categoryName: Category } }) {
  const { categoryName } = params;
  const products = getProducts(categoryName);
  const category = categories.find(c => c.slug === categoryName);

  if (!category) {
    notFound();
  }

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
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">{category.name}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
