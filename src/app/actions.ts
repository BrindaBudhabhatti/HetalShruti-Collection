'use server';

import { outfitRecommendations, type OutfitRecommendationsInput, type OutfitRecommendationsOutput } from "@/ai/flows/outfit-recommendations";

export async function getOutfitRecommendations(
  input: OutfitRecommendationsInput
): Promise<OutfitRecommendationsOutput> {
  try {
    const recommendations = await outfitRecommendations(input);
    return recommendations;
  } catch (error) {
    console.error("Error getting outfit recommendations:", error);
    throw new Error("Failed to get AI recommendations. Please try again later.");
  }
}
