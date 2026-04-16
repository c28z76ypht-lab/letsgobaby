import { PrismaClient } from "@prisma/client";
import { sampleProducts } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  for (const p of sampleProducts) {
    await prisma.productInventory.upsert({
      where: { productId: p.id },
      create: { productId: p.id, unitsTotal: 3 },
      update: {},
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
