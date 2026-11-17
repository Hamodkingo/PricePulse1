import * as cheerio from "cheerio";

export function extractPriceFromHtml(html: string): { price: number | null; inStock: boolean } {
  const $ = cheerio.load(html);
  const priceText =
    $('[itemprop="price"]').attr("content") ||
    $(".price").first().text() ||
    $('[data-price]').first().attr("data-price") ||
    "";

  const numeric = parseFloat(priceText.replace(/[^0-9.]/g, ""));
  const bodyText = $("body").text().toLowerCase();
  const inStock = !bodyText.includes("out of stock") && !bodyText.includes("sold out");

  return {
    price: isNaN(numeric) ? null : numeric,
    inStock,
  };
}
