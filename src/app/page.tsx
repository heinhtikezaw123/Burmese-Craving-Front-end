"use client";
import { useGetEndpointQuery } from "@/services/apiSlice";
import { endpoints } from "@/services/endpoints";
import { useEffect, useState } from "react";

// Update this type to match your shop item data shape
type ShopItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  available: boolean;
};

export default function Home() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");

  const getShopItems = `${endpoints.shopItems}`; // Update your endpoint here
  const { data, isLoading, isError, error } = useGetEndpointQuery(getShopItems);

  useEffect(() => {
    console.log("shop data", data);
    setItems(data || []);
  }, [data]);

  return (
    <div className="flex flex-col max-w-7xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Burmese Craving</h1>
        <button
          className="px-4 py-2 bg-transparent rounded"
          onClick={() => setView(view === "grid" ? "list" : "grid")}
        >
          Switch to {view === "grid" ? "List" : "Grid"} View
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {String(error)}</p>}

      <div className={view === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-6" : "space-y-4"}>
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name} className="w-full aspect-video object-cover mb-3 rounded" />
            )}
            <h2 className="text-xl font-medium">{item.name}</h2>
            <p className="text-gray-600 text-sm">{item.description}</p>
            <p className="mt-2 text-green-600 font-semibold">${item.price.toFixed(2)}</p>
            {!item.available && <p className="text-red-500 text-sm mt-1">Out of stock</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
