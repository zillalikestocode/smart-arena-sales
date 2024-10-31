import { Refresh, Refresh2 } from "iconsax-react";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Refresh className="animate-spin" />
    </div>
  );
}
