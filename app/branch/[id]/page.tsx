import BranchMain from "@/components/branch/main";
import { prisma } from "@/config/prisma";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

export const revalidate = 0;

export type StockWithProduct = Prisma.StockGetPayload<{
  include: { product: true };
}>;

export default async function BranchPage({
  params,
}: {
  params: { id: string };
}) {
  const branch = await prisma.branch.findUnique({ where: { id: params.id } });
  if (!branch) {
    return notFound();
  }
  const stock = await prisma.stock.findMany({
    where: { branchId: params.id },
    include: {
      product: true,
    },
  });

  return (
    <div>
      <BranchMain stock={stock} branch={branch} />
    </div>
  );
}
