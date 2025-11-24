import type { Product, Category } from './types';

const products: Product[] = [
  {
    id: '1',
    slug: 'ruby-red-anarkali-kurta',
    name: 'Ruby Red Anarkali Kurta',
    description: 'A stunning ruby red Anarkali kurta in georgette fabric, featuring intricate gold embroidery on the neckline and sleeves. Perfect for festive occasions.',
    price: 3499,
    images: [{ id: 'ruby-anarkali-1', alt: 'Front view of the Ruby Red Anarkali Kurta.' }, { id: 'ruby-anarkali-2', alt: 'Side view of the Ruby Red Anarkali Kurta.' }],
    category: 'kurtas',
    tags: ['festive'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '2',
    slug: 'golden-weave-lehenga-set',
    name: 'Golden Weave Lehenga Set',
    description: 'A magnificent lehenga set in a deep gold hue, crafted from Banarasi silk. The set includes a full-flare skirt, a matching blouse, and a sheer dupatta with a golden border.',
    price: 8999,
    images: [{ id: 'golden-lehenga-1', alt: 'Full view of the Golden Weave Lehenga Set.' }, { id: 'golden-lehenga-2', alt: 'Close-up of the golden weave.' }],
    category: 'lehengas',
    tags: ['festive'],
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: '3',
    slug: 'cream-silk-kurta-set',
    name: 'Cream Silk Kurta Set',
    description: 'An elegant cream-colored kurta set in pure silk. The straight-cut kurta is paired with matching trousers and a contrasting floral print dupatta. Ideal for regular wear and small gatherings.',
    price: 4200,
    images: [{ id: 'cream-kurta-set-1', alt: 'Front view of the Cream Silk Kurta Set.' }, { id: 'cream-kurta-set-2', alt: 'Detail of the embroidery.' }],
    category: 'kurta-sets',
    tags: ['regular', 'festive'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: '4',
    slug: 'sapphire-zari-kurta',
    name: 'Sapphire Zari Kurta',
    description: 'A beautiful sapphire blue straight-fit kurta made from Chanderi cotton. It features delicate silver Zari work around the placket and hem.',
    price: 2800,
    images: [{ id: 'sapphire-kurta-1', alt: 'A beautiful sapphire blue kurta.' }],
    category: 'kurtas',
    tags: ['regular'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '5',
    slug: 'emerald-green-sharara-set',
    name: 'Emerald Green Sharara Set',
    description: 'A vibrant emerald green sharara set. The short peplum-style kurta is adorned with mirror work and paired with flared sharara pants and a net dupatta.',
    price: 6500,
    images: [{ id: 'emerald-kurta-set-1', alt: 'An emerald green kurta set.' }],
    category: 'kurta-sets',
    tags: ['festive'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '6',
    slug: 'sunset-ombre-lehenga',
    name: 'Sunset Ombre Lehenga',
    description: 'Capture the hues of a sunset with this stunning ombre lehenga, flowing from a soft pink to a fiery orange. Embellished with sequins for a touch of sparkle.',
    price: 9500,
    images: [{ id: 'sunset-lehenga-1', alt: 'A stunning lehenga in shades of sunset.' }],
    category: 'lehengas',
    tags: ['festive'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '7',
    slug: 'classic-ivory-kurta',
    name: 'Classic Ivory Kurta',
    description: 'A timeless ivory white kurta in comfortable linen fabric. Features a simple band collar and wooden buttons, perfect for daily elegance.',
    price: 1999,
    images: [{ id: 'ivory-kurta-1', alt: 'A simple and elegant ivory white kurta.' }],
    category: 'kurtas',
    tags: ['regular'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: '8',
    slug: 'jet-black-palazzo-set',
    name: 'Jet Black Palazzo Set',
    description: 'A modern and chic jet black kurta set. The sleeveless, high-neck kurta is paired with wide-legged palazzo pants for a contemporary ethnic look.',
    price: 4800,
    images: [{ id: 'jet-black-set-1', alt: 'A modern jet black kurta set.' }],
    category: 'kurta-sets',
    tags: ['regular', 'festive'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

export function getProducts(category?: Category): Product[] {
  if (category && category !== 'all') {
    return products.filter((product) => product.category === category);
  }
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
