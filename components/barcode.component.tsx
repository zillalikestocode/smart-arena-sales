"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { Product } from "@prisma/client";
import { Barcode as Bcode, SearchNormal } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import Barcode from "react-barcode";
import { QRCodeCanvas } from "qrcode.react";
import { exportAsImage } from "@/utils/generateImages";

export default function BarcodeComponent({
  products,
}: {
  products: Product[];
}) {
  const [search, setSearch] = useState("");
  const [showTitle, setShowTitle] = useState(true);
  const exportRef = useRef(null);

  return (
    <div className="flex flex-col">
      <h4 className="font-semibold text-2xl tracking-[-0.04em]">
        Product Barcodes
      </h4>
      <Button
        className="w-fit my-2.5"
        color="primary"
        onClick={() => exportAsImage(exportRef.current)}
      >
        Download as Image
      </Button>
      <Checkbox isSelected={showTitle} onValueChange={setShowTitle}>
        Show Title
      </Checkbox>
      <Input
        className="md:w-96 w-full my-2.5"
        label="Search"
        placeholder="Filter Items"
        size="sm"
        startContent={<SearchNormal size={16} />}
        value={search}
        onValueChange={setSearch}
      />
      <div
        ref={exportRef}
        className={`grid ${showTitle ? "grid-cols-4" : "grid-cols-5"} gap-5 mt-2.5`}
      >
        {products
          .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((item, i) => (
            <BarcodeGroup showTitle={showTitle} product={item} key={item.id} />
          ))}
      </div>
    </div>
  );
}

const BarcodeGroup = ({
  product,
  showTitle,
}: {
  product: Product;
  showTitle: boolean;
}) => {
  return Object.keys(product.options as Array<any>).length !== 0 ? (
    <VariantBarCode showTitle={showTitle} product={product} />
  ) : (
    <div>
      {showTitle && (
        <h4 className="text-sm mb-2.5 font-medium text-foreground-700">
          {product.name}
        </h4>
      )}
      <QRCodeCanvas
        className="md:!w-10 !w-16 !h-16 md:!h-10"
        value={product.id}
      />
    </div>
  );
};

const VariantBarCode = ({
  product,
  showTitle,
}: {
  product: Product;
  showTitle: boolean;
}) => {
  const [options, setOptions] = useState<
    { id: string; name: string; options: any[] }[]
  >([]);

  useEffect(() => {
    function combineOptions(product: Product) {
      const optionKeys = Object.keys(product.options as object); // Get all the option categories (e.g., color, gang, etc.)

      // Recursive function to generate combinations
      function generateCombinations(index: number, currentCombination: object) {
        // If we have filled all options, push the current combination
        if (index === optionKeys.length || optionKeys[index].length === 0) {
          return [
            Object.assign(
              { name: product.name },
              { id: product.id },
              { options: { ...currentCombination } },
            ),
          ];
        }

        const key = optionKeys[index]; // Get the current option category (e.g., 'color')
        const optionValues: any[] = product.options![key as keyof object]; // Get all possible values for that category

        let combinations: any[] = [];

        // Iterate through each value in the current option category
        optionValues.forEach((optionValue: any) => {
          // Recur with the next option category
          combinations = combinations.concat(
            generateCombinations(
              index + 1,
              Object.assign({}, currentCombination, {
                [key]: optionValue.value,
              }),
            ),
          );
        });

        return combinations;
      }

      return generateCombinations(0, {}); // Start the recursion
    }

    // Get all combinations
    const combinationsArray = combineOptions(product);

    // Output the result
    setOptions(combinationsArray);
  }, []);
  return (
    <>
      {options.map((item, i) => (
        <div key={i}>
          <div>
            {showTitle && (
              <>
                <h4 className="text-sm font-medium text-foreground-700">
                  {product.name}
                </h4>
                <h4 className="text-xs mb-2.5 uppercase text-foreground-500">
                  {Object.keys(item.options).map(
                    (value) => item.options[value as keyof object] + " ",
                  )}
                </h4>
              </>
            )}
            <QRCodeCanvas
              className="md:!w-10 !w-16 !h-16 md:!h-10"
              value={
                product.id +
                "-" +
                Object.keys(item.options)
                  .map((value) => item.options[value as keyof object])
                  .join(",")
              }
            />
          </div>
        </div>
      ))}
    </>
  );
};
