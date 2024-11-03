import ReceiverMain from "@/components/receiver/main.component";
import { prisma } from "@/config/prisma";

export default async function ReceiverPage() {
  const receivers = await prisma.receiver.findMany();
  return (
    <div>
      <ReceiverMain receivers={receivers} />
    </div>
  );
}
