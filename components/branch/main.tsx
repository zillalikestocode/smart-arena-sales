"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { Branch, Stock } from "@prisma/client";
import StockTab from "./stock";
import { StockWithProduct } from "@/app/branch/[id]/page";

export default function BranchMain({
  branch,
  stock,
}: {
  branch: Branch;
  stock: StockWithProduct[];
}) {
  return (
    <div>
      <div className="mb-5">
        <h4 className="font-semibold text-xl">{branch.name}</h4>
        <p className="text-foreground-600">{branch.address}</p>
      </div>
      <Tabs aria-label="Tabs">
        <Tab key="stock" title="Stock">
          <StockTab stock={stock} />
        </Tab>
      </Tabs>
    </div>
  );
}
