import MainComponent from "@/components/main.component";
import { prisma } from "@/config/prisma";
import { siteConfig } from "@/config/site";

export default async function Home() {
  const branches = await prisma.branch.findMany();
  return (
    <section className="">
      <MainComponent branches={branches} />
    </section>
  );
}
