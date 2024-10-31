"use client";

import { StockWithProduct } from "@/app/branch/[id]/page";
import StockItem from "./stock.item";
import { Input } from "@nextui-org/input";
import { SearchNormal1 } from "iconsax-react";
import { useState } from "react";

export default function StockTab({ stock }: { stock: StockWithProduct[] }) {
  const [query, setQuery] = useState("");
  return (
    <div>
      <h4 className="font-semibold text-sm mb-2.5">
        Total Items: {stock.reduce((acc, curr) => acc + curr.quantity, 0)}
      </h4>
      <Input
        value={query}
        onValueChange={setQuery}
        placeholder="Search Items"
        className="max-w-96 mb-5"
        startContent={<SearchNormal1 size={20} />}
      />
      <div className="grid grid-cols-4 gap-5">
        {stock
          .filter((item) =>
            item.product.name.toLowerCase().includes(query.toLowerCase()),
          )
          .map((item, i) => {
            return <StockItem item={item} key={i} />;
          })}
      </div>
    </div>
  );
}
