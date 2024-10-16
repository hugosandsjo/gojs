import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

// Define your initial data for both local and preview environments
const initialCategories: Prisma.CategoryCreateInput[] = [
  { title: "Paintings" },
  { title: "Sculptures" },
  { title: "Digital Art" },
];

async function seedDatabase() {
  // Check for the current environment
  const environment = process.env.VERCEL_ENV;

  if (environment === "preview") {
    console.log("Seeding the preview database...");
  } else {
    console.log("Seeding the local development database...");
  }

  // Seeding categories
  const categories = await Promise.all(
    initialCategories.map(async (category) => {
      const existingCategory = await prisma.category.findFirst({
        where: { title: category.title },
      });

      if (!existingCategory) {
        return await prisma.category.create({
          data: category,
        });
      }

      return existingCategory;
    })
  );

  console.log(`Created or found categories:`);
  categories.forEach((category) =>
    console.log(`${category.title}: ${category.id}`)
  );

  const [paintingsCategory, sculpturesCategory, digitalArtCategory] =
    categories;

  // Seeding products
  const initialProducts: Prisma.ProductCreateInput[] = [
    {
      title: "The Great Fall",
      description: "A vibrant abstract painting inspired by the energy of Goa.",
      price: new Prisma.Decimal(1200.0),
      sold_out: false,
      quantity: 5,
      image_url: "https://example.com/images/goa-gubbar.jpg",
      height: new Prisma.Decimal(30),
      width: new Prisma.Decimal(40),
      depth: new Prisma.Decimal(2),
      weight: new Prisma.Decimal(1.5),
      available_stock: 5,
      backorder: false,
      status: "PUBLISHED",
      category: {
        connect: { id: paintingsCategory.id },
      },
    },
    {
      title: "The Penguin",
      description:
        "An artwork depicting the elegance of penguins in their natural habitat.",
      price: new Prisma.Decimal(800.0),
      sold_out: false,
      quantity: 3,
      image_url: "https://example.com/images/penguin.jpg",
      height: new Prisma.Decimal(50),
      width: new Prisma.Decimal(70),
      depth: new Prisma.Decimal(2),
      weight: new Prisma.Decimal(2),
      available_stock: 3,
      backorder: true,
      status: "DRAFT",
      category: {
        connect: { id: sculpturesCategory.id },
      },
    },
    {
      title: "Batman",
      description: "A modern take on the classic superhero, Batman.",
      price: new Prisma.Decimal(1500.0),
      sold_out: false,
      quantity: 1,
      image_url: "https://example.com/images/batman.jpg",
      height: new Prisma.Decimal(60),
      width: new Prisma.Decimal(80),
      depth: new Prisma.Decimal(3),
      weight: new Prisma.Decimal(3),
      available_stock: 1,
      backorder: false,
      status: "PUBLISHED",
      category: {
        connect: { id: digitalArtCategory.id },
      },
    },
  ];

  console.log(`Start seeding products ...`);
  for (const product of initialProducts) {
    const newProduct = await prisma.product.create({
      data: product,
    });
    console.log(`Created product with id: ${newProduct.id}`);
  }

  console.log("Seeding finished");
}

seedDatabase()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
