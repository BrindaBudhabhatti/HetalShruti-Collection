'use server';

/**
 * @fileOverview AI-powered outfit recommendations based on the item being viewed and the occasion.
 *
 * This file defines a Genkit flow that suggests matching pieces to complete an outfit,
 * enhancing the user's shopping experience by providing AI-driven style advice.
 *
 * - outfitRecommendations - The function to get outfit recommendations.
 * - OutfitRecommendationsInput - The input type for the outfitRecommendations function.
 * - OutfitRecommendationsOutput - The output type for the outfitRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for outfit recommendations
const OutfitRecommendationsInputSchema = z.object({
  itemType: z.string().describe('The type of the item (e.g., Kurta, Kurta Set, Lehenga)'),
  itemDescription: z.string().describe('Detailed description of the item including color, material, and design details'),
  occasion: z.string().describe('The occasion for which the outfit is intended (e.g., Regular, Festive)'),
  userPreferences: z.string().optional().describe('Optional user preferences regarding style, color, or fit'),
});
export type OutfitRecommendationsInput = z.infer<typeof OutfitRecommendationsInputSchema>;

// Define the output schema for outfit recommendations
const OutfitRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      itemType: z.string().describe('Type of recommended item'),
      itemDescription: z.string().describe('Description of the recommended item'),
      justification: z.string().describe('Why this item is a good match'),
    })
  ).describe('List of recommended items to complete the outfit'),
});
export type OutfitRecommendationsOutput = z.infer<typeof OutfitRecommendationsOutputSchema>;

// Exported function to get outfit recommendations
export async function outfitRecommendations(input: OutfitRecommendationsInput): Promise<OutfitRecommendationsOutput> {
  return outfitRecommendationsFlow(input);
}

const outfitRecommendationsPrompt = ai.definePrompt({
  name: 'outfitRecommendationsPrompt',
  input: {schema: OutfitRecommendationsInputSchema},
  output: {schema: OutfitRecommendationsOutputSchema},
  prompt: `You are a personal stylist for an e-commerce website specializing in women's ethnic wear.

  Based on the item description, occasion, and user preferences, provide a list of items that would complement the selected item to complete the outfit.

  Consider the color, material, design details, and occasion when making recommendations.

  Item Type: {{{itemType}}}
  Item Description: {{{itemDescription}}}
  Occasion: {{{occasion}}}
  User Preferences: {{{userPreferences}}}
  
  Respond with a list of items with descriptions and explain why each item is a good match.
  `,
});

// Genkit flow definition for outfit recommendations
const outfitRecommendationsFlow = ai.defineFlow(
  {
    name: 'outfitRecommendationsFlow',
    inputSchema: OutfitRecommendationsInputSchema,
    outputSchema: OutfitRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await outfitRecommendationsPrompt(input);
    return output!;
  }
);
