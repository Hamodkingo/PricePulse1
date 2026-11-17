export function getPricingRecommendation(currentPrice: number, competitorPrice: number): string {
  if (competitorPrice < currentPrice) {
    const suggested = Math.max(1, Number((competitorPrice - 1).toFixed(2)));
    return `Competitor is lower ($${competitorPrice}). Consider adjusting price to $${suggested}.`;
  }
  return "Your price is competitive. Maintain current margin.";
}
