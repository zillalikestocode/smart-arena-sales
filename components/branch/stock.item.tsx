"use client";

import { StockWithProduct } from "@/app/branch/[id]/page";
import { Card, CardBody } from "@nextui-org/react";

export default function StockItem({ item }: { item: StockWithProduct }) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center gap-2.5">
          <img
            src={`https://res.cloudinary.com/deipg69lh/image/upload/${item.product.images[0]}`}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="w-full">
            <h4 className="font-semibold text-sm line-clamp-1">
              {item.product.name}
            </h4>
            <div className="flex items-center w-full">
              {item.variant && (
                <h4 className="text-xs text-foreground-500">
                  {Object.keys(item.variant)
                    .map((value: any) => item.variant[value])
                    .join(", ")}
                </h4>
              )}
              <h4 className=" ml-auto text-xs">QTY: {item.quantity}</h4>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
