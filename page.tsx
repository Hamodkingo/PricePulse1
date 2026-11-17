"use client";

import { useState } from "react";
import PriceChart from "@/components/price-chart";

interface Product {
  id: string;
  name: string;
  url: string;
  currentPrice: number;
  targetPrice: number;
  inStock: boolean;
}

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "PlayStation 5 Slim Digital Edition",
      url: "https://example.com/ps5-slim",
      currentPrice: 449,
      targetPrice: 420,
      inStock: true,
    },
    {
      id: "2",
      name: "Xbox Series S 1TB Black",
      url: "https://example.com/xbox-series-s",
      currentPrice: 329,
      targetPrice: 340,
      inStock: true,
    },
  ]);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [targetPrice, setTargetPrice] = useState("");

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;
    const newItem: Product = {
      id: Date.now().toString(),
      name,
      url,
      currentPrice: Number(targetPrice) || 99,
      targetPrice: Number(targetPrice) || 89,
      inStock: true,
    };
    setProducts([newItem, ...products]);
    setName("");
    setUrl("");
    setTargetPrice("");
  };

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-8">
      <header className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold">PricePulse AI Dashboard</h1>
          <p className="text-sm text-zinc-400">Active competitor monitors & Telegram alerts</p>
        </div>
        <span className="rounded-md bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
          System Active
        </span>
      </header>

      <form onSubmit={addProduct} className="grid gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:grid-cols-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
        />
        <input
          type="url"
          placeholder="https://store.com/product"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
        />
        <input
          type="number"
          placeholder="Target Price ($)"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
        >
          + Track Product
        </button>
      </form>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Tracked Products</h2>
          {products.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-xs text-zinc-400 truncate max-w-xs">{item.url}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-400">${item.currentPrice}</p>
                <p className="text-xs text-zinc-400">Target: ${item.targetPrice}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <h2 className="mb-4 text-lg font-semibold">30-Day Price Trend</h2>
          <PriceChart />
        </div>
      </div>
    </div>
  );
}
