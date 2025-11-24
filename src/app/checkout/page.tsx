"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Upload } from 'lucide-react';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(5, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  paymentScreenshot: z.any().refine(
    (files) => files?.length === 1, 'Payment screenshot is required.'
  ),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { clearCart, cartTotal, itemCount } = useCart();
  const qrCodeImage = PlaceHolderImages.find(p => p.id === 'upi-qr-code');

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '', email: '', address: '', city: '', postalCode: '', country: '',
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Checkout Data:', {
      ...data,
      paymentScreenshot: data.paymentScreenshot[0].name,
    });
    toast({
      title: 'Order Submitted for Verification!',
      description: 'Thank you for your purchase. Your order will be confirmed via email or WhatsApp once payment is verified.',
    });
    clearCart();
    router.push('/');
  };
  
  if (itemCount === 0 && typeof window !== 'undefined') {
      router.replace('/cart');
      return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl mb-8">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader><CardTitle>Shipping Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                      <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="postalCode" render={({ field }) => (
                      <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="country" render={({ field }) => (
                      <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                  <CardDescription>
                    Please pay by scanning the QR code or using the UPI address below. Then, upload a screenshot of the payment confirmation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {qrCodeImage && (
                      <div className="w-48 h-48 relative">
                         <Image 
                          src={qrCodeImage.imageUrl} 
                          alt={qrCodeImage.description} 
                          fill 
                          className="rounded-md object-contain"
                          data-ai-hint={qrCodeImage.imageHint}
                        />
                      </div>
                    )}
                    <div className="text-center sm:text-left">
                      <p className="text-muted-foreground">Scan and Pay</p>
                      <p className="font-mono text-lg font-semibold break-all">hetalshruti@upi</p>
                      <p className="font-bold text-2xl mt-2">Total: ₹{cartTotal.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="paymentScreenshot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Payment Screenshot</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                              type="file" 
                              accept="image/*"
                              className="pl-10"
                              onChange={(e) => field.onChange(e.target.files)} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
               <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : `Submit Order for ₹${cartTotal.toLocaleString('en-IN')}`}
               </Button>
            </form>
          </Form>
        </div>
        <div className="md:col-span-1">
             <Card className="sticky top-28">
                <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                <CardContent>
                   <p>{itemCount} items</p>
                   <p className="text-2xl font-bold mt-2">Total: ₹{cartTotal.toLocaleString('en-IN')}</p>
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
