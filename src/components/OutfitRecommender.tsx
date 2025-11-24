"use client";

import { useState, useTransition } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { getOutfitRecommendations } from '@/app/actions';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

type Recommendation = {
    itemType: string;
    itemDescription: string;
    justification: string;
};

export default function OutfitRecommender({ product }: { product: Product }) {
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGetRecommendations = () => {
    setError(null);
    setRecommendations(null);

    startTransition(async () => {
      try {
        const result = await getOutfitRecommendations({
          itemType: product.category,
          itemDescription: product.description,
          occasion: product.tags.join(', '),
        });
        setRecommendations(result.recommendations);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred.");
      }
    });
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="text-center">
        <Sparkles className="mx-auto h-12 w-12 text-accent" />
        <h2 className="font-headline text-3xl font-bold mt-4">AI Style Advisor</h2>
        <p className="mt-2 text-muted-foreground">
          Wondering how to style this piece? Let our AI stylist help you create the perfect outfit.
        </p>
        <Button onClick={handleGetRecommendations} disabled={isPending} className="mt-6">
          {isPending ? 'Generating Ideas...' : 'Get Outfit Recommendations'}
        </Button>
      </div>

      {isPending && (
         <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                    <CardHeader>
                        <div className="h-6 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-5/6"></div>
                         <div className="h-4 bg-muted rounded w-full mt-4"></div>
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                    </CardContent>
                </Card>
            ))}
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-8">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations && (
        <div className="mt-8">
            <h3 className="font-headline text-2xl font-semibold mb-6 text-center">Complete Your Look</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec, index) => (
                <Card key={index}>
                    <CardHeader>
                    <CardTitle className="font-headline text-xl">{rec.itemType}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-muted-foreground">{rec.itemDescription}</p>
                    <p className="mt-4 pt-4 border-t text-sm">
                        <strong className="text-primary">Why it works:</strong> {rec.justification}
                    </p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
