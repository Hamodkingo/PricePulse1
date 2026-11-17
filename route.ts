import { NextResponse } from "next/server";
import { extractPriceFromHtml } from "@/lib/parse";
import { getPricingRecommendation } from "@/lib/recommend";

export async function POST(request: Request) {
  try {
    const { url, myPrice } = await request.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PricePulseBot/1.0)" },
    });
    const html = await response.text();
    const parsed = extractPriceFromHtml(html);

    const recommendation =
      parsed.price && myPrice
        ? getPricingRecommendation(Number(myPrice), parsed.price)
        : null;

    return NextResponse.json({
      url,
      ...parsed,
      recommendation,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to scrape URL" }, { status: 500 });
  }
}
