import { PrismaClient } from "../src/generated/prisma";
import { createSlug } from "../src/lib/slug";

import { dataSeedProducts } from "./data/products";

const prisma = new PrismaClient();

async function main() {
  for (const seedProduct of dataSeedProducts) {
    const slug = createSlug(seedProduct.name);

    const animal = await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        ...seedProduct,
      },
    });

    console.log(`🐻 Animal: ${animal.name} (${animal.slug})`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
