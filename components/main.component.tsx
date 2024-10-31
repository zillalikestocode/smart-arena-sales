"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Branch } from "@prisma/client";
import { ArrowUp } from "iconsax-react";

export default function MainComponent({ branches }: { branches: Branch[] }) {
  return (
    <div>
      <h4 className="font-semibold text-2xl tracking-[-0.04em]">Branches</h4>
      <div className="grid md:grid-cols-5 mt-2.5">
        {branches.map((item, i) => (
          <Card>
            <CardBody>
              <div className="flex items-center">
                <h4 className="font-semibold tracking-[-0.04em] text-lg">
                  {item.name}
                </h4>
                <button className="ml-auto">
                  <ArrowUp size={16} className="rotate-45 text-primary" />
                </button>
              </div>
              <p className="text-sm mt-1.5 text-foreground-500">
                {item.address}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
