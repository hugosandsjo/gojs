import * as bcrypt from "bcryptjs";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function hashPassword(
  password: string,
  saltRounds = 10
): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const initialCategories: Prisma.CategoryCreateInput[] = [
  { title: "Painting" },
  { title: "Sculpture" },
  { title: "Digital Art" },
];

const artistUsers = [
  {
    name: "Erik Lindström",
    email: "erik.lindstrom@artist.com",
    password: "Erikart123",
  },
  {
    name: "Anna Björklund",
    email: "anna.bjorklund@artist.com",
    password: "Annaart123",
  },
  {
    name: "Lars Nilsson",
    email: "lars.nilsson@artist.com",
    password: "Larsart123",
  },
  {
    name: "Sofia Andersson",
    email: "sofia.andersson@artist.com",
    password: "Sofiaart123",
  },
  {
    name: "Gustav Bergman",
    email: "gustav.bergman@artist.com",
    password: "Gustavart123",
  },
  {
    name: "Astrid Johansson",
    email: "astrid.johansson@artist.com",
    password: "Astridart123",
  },
  {
    name: "Michael Chen",
    email: "michael.chen@artist.com",
    password: "Michaelart123",
  },
  {
    name: "Isabella Romano",
    email: "isabella.romano@artist.com",
    password: "Isabellaart123",
  },
  {
    name: "James McCarthy",
    email: "james.mccarthy@artist.com",
    password: "Jamesart123",
  },
  {
    name: "Maria Santos",
    email: "maria.santos@artist.com",
    password: "Mariaart123",
  },
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
  await prisma.$transaction([
    prisma.image.deleteMany(),
    prisma.product.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const createdUsers = await Promise.all(
    artistUsers.map(async (artist) => {
      const hashedPassword = await hashPassword(artist.password);
      const user = await prisma.user.create({
        data: {
          email: artist.email,
          name: artist.name,
          password: hashedPassword,
          role: "ARTIST",
        },
      });
      console.log(`Created artist: ${user.name}`);
      return user;
    })
  );

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
      user: { connect: { id: createdUsers[0].id } }, // Erik Lindström
    },
    {
      title: "Nordic Twilight",
      description:
        "A serene landscape capturing the mystical Nordic twilight hours.",
      price: 2200,
      sold_out: false,
      quantity: 2,
      height: 60,
      width: 80,
      depth: 3,
      weight: 2.5,
      available_stock: 2,
      backorder: false,
      status: "PUBLISHED",
      category: {
        connect: { id: paintingsCategory.id },
      },
      user: { connect: { id: createdUsers[0].id } }, // Erik Lindström
    },
    {
      title: "Copper Dreams",
      description: "Abstract sculpture made from recycled copper and bronze.",
      price: 3500,
      sold_out: false,
      quantity: 1,
      height: 45,
      width: 30,
      depth: 30,
      weight: 8,
      available_stock: 1,
      backorder: false,
      status: "PUBLISHED",
      category: {
        connect: { id: sculpturesCategory.id },
      },
      user: { connect: { id: createdUsers[1].id } }, // Anna Björklund
    },
    {
      title: "Forest Spirit",
      description: "A delicate sculpture inspired by Swedish folklore.",
      price: 1800,
      sold_out: false,
      quantity: 3,
      height: 40,
      width: 20,
      depth: 20,
      weight: 5,
      available_stock: 3,
      backorder: true,
      status: "DRAFT",
      category: {
        connect: { id: sculpturesCategory.id },
      },
      user: { connect: { id: createdUsers[1].id } }, // Anna Björklund
    },
    {
      title: "Digital Dreamscape",
      description:
        "A surreal digital artwork exploring themes of consciousness.",
      price: 800,
      sold_out: false,
      quantity: 10,
      height: 0,
      width: 0,
      depth: 0,
      weight: 0,
      available_stock: 10,
      backorder: false,
      status: "PUBLISHED",
      category: {
        connect: { id: digitalArtCategory.id },
      },
      user: { connect: { id: createdUsers[2].id } }, // Lars Nilsson
    },
    {
      title: "Urban Symphony",
      description: "A vibrant painting capturing city life in motion.",
      price: 1600,
      sold_out: false,
      quantity: 1,
      height: 100,
      width: 150,
      depth: 4,
      weight: 3,
      available_stock: 1,
      backorder: false,
      status: "PUBLISHED",
      category: {
        connect: { id: paintingsCategory.id },
      },
      user: { connect: { id: createdUsers[3].id } }, // Sofia Andersson
    },
    {
      title: "Crystal Memories",
      description: "Glass sculpture with embedded digital elements.",
      price: 4200,
      sold_out: false,
      quantity: 2,
      height: 50,
      width: 30,
      depth: 30,
      weight: 10,
      available_stock: 2,
      backorder: true,
      status: "PUBLISHED",
      category: {
        connect: { id: sculpturesCategory.id },
      },
      user: { connect: { id: createdUsers[4].id } }, // Gustav Bergman
    },
    {
      title: "Pixel Paradise",
      description: "A digital artwork series exploring virtual landscapes.",
      price: 950,
      sold_out: false,
      quantity: 5,
      height: 0,
      width: 0,
      depth: 0,
      weight: 0,
      available_stock: 5,
      backorder: false,
      status: "PUBLISHED",
      category: {
        connect: { id: digitalArtCategory.id },
      },
      user: { connect: { id: createdUsers[5].id } }, // Astrid Johansson
    },
    {
      title: "Eastern Winds",
      description: "Contemporary Asian-inspired digital art piece.",
      price: 1100,
      sold_out: false,
      quantity: 3,
      height: 0,
      width: 0,
      depth: 0,
      weight: 0,
      available_stock: 3,
      backorder: false,
      status: "PUBLISHED",
      category: {
        connect: { id: digitalArtCategory.id },
      },
      user: { connect: { id: createdUsers[6].id } }, // Michael Chen
    },
    {
      title: "Mediterranean Dreams",
      description: "Vibrant painting inspired by Italian coastal life.",
      price: 2800,
      sold_out: false,
      quantity: 1,
      height: 80,
      width: 120,
      depth: 3,
      weight: 4,
      available_stock: 1,
      backorder: false,
      status: "PUBLISHED",
      category: {
        connect: { id: paintingsCategory.id },
      },
      user: { connect: { id: createdUsers[7].id } }, // Isabella Romano
    },
    {
      title: "Celtic Whispers",
      description: "Bronze sculpture with traditional Irish motifs.",
      price: 3200,
      sold_out: false,
      quantity: 2,
      height: 60,
      width: 40,
      depth: 40,
      weight: 15,
      available_stock: 2,
      backorder: true,
      status: "PUBLISHED",
      category: {
        connect: { id: sculpturesCategory.id },
      },
      user: { connect: { id: createdUsers[8].id } }, // James McCarthy
    },
    {
      title: "Tropical Fusion",
      description: "Digital art blending Brazilian tropical elements.",
      price: 750,
      sold_out: false,
      quantity: 8,
      height: 0,
      width: 0,
      depth: 0,
      weight: 0,
      available_stock: 8,
      backorder: false,
      status: "PUBLISHED",
      category: {
        connect: { id: digitalArtCategory.id },
      },
      user: { connect: { id: createdUsers[9].id } }, // Maria Santos
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
