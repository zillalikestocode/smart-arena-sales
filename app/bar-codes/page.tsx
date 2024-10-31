import BarcodeComponent from "@/components/barcode.component";
import { prisma } from "@/config/prisma";

export default async function BarcodePage() {
  const products = await prisma.product.findMany();

  return (
    <div>
      <BarcodeComponent products={products} />
    </div>
  );
}
