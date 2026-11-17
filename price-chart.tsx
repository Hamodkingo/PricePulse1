"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const sampleData = [
  { day: "Day 1", price: 479 },
  { day: "Day 7", price: 469 },
  { day: "Day 14", price: 459 },
  { day: "Day 21", price: 455 },
  { day: "Day 30", price: 449 },
];

export default function PriceChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis dataKey="day" stroke="#a1a1aa" fontSize={12} />
          <YAxis stroke="#a1a1aa" fontSize={12} domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#fafafa" }}
          />
          <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
