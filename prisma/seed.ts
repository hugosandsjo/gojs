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
      price: 1200,
      sold_out: false,
      quantity: 5,
      image_url: "https://example.com/images/goa-gubbar.jpg",
      height: 30,
      width: 40,
      depth: 2,
      weight: 1.5,
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
      price: 800,
      sold_out: false,
      quantity: 3,
      image_url: "https://example.com/images/penguin.jpg",
      height: 50,
      width: 70,
      depth: 2,
      weight: 2,
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
      price: 1500,
      sold_out: false,
      quantity: 1,
      image_url: "https://example.com/images/batman.jpg",
      height: 55,
      width: 80,
      depth: 3,
      weight: 3,
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
