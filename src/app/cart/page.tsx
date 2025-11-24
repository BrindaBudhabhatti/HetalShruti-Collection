"use client";

import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal, itemCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl mb-8">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="mt-6">
            <Link href="/category/all">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map(item => {
                const image = PlaceHolderImages.find(p => p.id === item.product.images[0].id);
                return (
                  <Card key={item.id}>
                    <CardContent className="p-4 flex gap-4">
                      <div className="relative h-32 w-24 rounded-md overflow-hidden">
                        {image && (
                          <Image 
                            src={image.imageUrl} 
                            alt={item.product.name} 
                            fill 
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                         <div>
                            <Link href={`/products/${item.product.slug}`} className="font-headline text-lg hover:underline">{item.product.name}</Link>
                            <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                            <p className="text-sm text-muted-foreground">
                              Price: ₹{item.product.price.toLocaleString('en-IN')}
                            </p>
                         </div>
                         <div className="flex items-center gap-4">
                           <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                              className="h-9 w-16"
                            />
                            <p className="font-medium text-lg">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </p>
                         </div>
                      </div>
                       <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                        <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive"/>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
          <div className="lg:col-span-1">
             <Card className="sticky top-28">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span>Subtotal ({itemCount} items)</span>
                        <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button asChild size="lg" className="w-full">
                        <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                </CardFooter>
             </Card>
          </div>
        </div>
      )}
    </div>
  );
}
