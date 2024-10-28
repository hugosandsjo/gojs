import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

// Define your initial data for both local and preview environments
const initialCategories: Prisma.CategoryCreateInput[] = [
  { title: "Painting" },
  { title: "Sculpture" },
  { title: "Digital Art" },
];

async function seedDatabase() {
  // Check for the current environment
  const environment = process.env.VERCEL_ENV;

  if (environment === "preview") {
    console.log("Seeding the preview database...");
  } else {
    console.log("Seeding the preview development database...");
  }

  // Delete all existing products
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.image.deleteMany();

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

  categories.forEach((category) =>
    console.log(`${category.title}: ${category.id}`)
  );

  const [paintingsCategory, sculpturesCategory, digitalArtCategory] =
    categories;

  const defaultUser = await prisma.user.upsert({
    where: { email: "hugosandsjo@gmail.com" },
    update: {},
    create: {
      email: "default@user.com",
      name: "Hugo Sandsjö",
      password: "defaultpassword",
      role: "ARTIST",
    },
  });

  // Seeding products
  const initialProducts: Prisma.ProductCreateInput[] = [
    {
      title: "The Great Fall",
      description: "A vibrant abstract painting inspired by the energy of Goa.",
      price: 1200,
      sold_out: false,
      quantity: 5,
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
      user: { connect: { id: defaultUser.id } },
    },

    {
      title: "The Penguin",
      description:
        "An artwork depicting the elegance of penguins in their natural habitat.",
      price: 800,
      sold_out: false,
      quantity: 3,
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
      user: { connect: { id: defaultUser.id } },
    },
    {
      title: "Batman",
      description: "A modern take on the classic superhero, Batman.",
      price: 1500,
      sold_out: false,
      quantity: 1,
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
      user: { connect: { id: defaultUser.id } },
    },
  ];

  console.log(`Start seeding products ...`);
  for (let index = 0; index < initialProducts.length; index++) {
    const product = initialProducts[index];
    const newProduct = await prisma.product.create({
      data: product,
    });
    console.log(`Created product with id: ${newProduct.id}`);

    const imageKey =
      index === 0
        ? "b0c9d8276e3da37fefe71b973f199e0b6e8be3cec2c8c6f8a05de03a8b2445d9"
        : "9a7364028357e5da73e9b060a8c07c9a3174034e88266aff583a6c1cdac9ccf7";

    await prisma.image.create({
      data: {
        image_key: imageKey,
        product: {
          connect: { id: newProduct.id },
        },
      },
    });
    console.log(`Added image for product with id: ${newProduct.id}`);
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
