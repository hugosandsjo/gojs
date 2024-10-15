import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const initalProducts: Prisma.ProductCreateInput[] = [
  {
    title: "Goa gubbar",
    content: "Goa gubbar content",
  },
  {
    title: "The penguin",
    content: "The penguins content",
  },
  {
    title: "Batman",
    content: "Batman har en tuff bil",
  },
];
async function main() {
  console.log(`Start seeding ...`);
  for (const product of initalProducts) {
    const NewProduct = await prisma.product.create({
      data: product,
    });
    console.log(`Created product with id: ${NewProduct.id}`);
  }
  console.log(`Seeding finished`);
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
