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
  const environment = process.env.VERCEL_ENV;

  if (environment === "preview") {
    console.log("Seeding the preview database...");
  } else {
    console.log("Seeding the preview development database...");
  }

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

  const [paintingsCategory, sculpturesCategory, digitalArtCategory] =
    categories;

  const productsWithImages = [
    {
      title: "Culinary Stories: Vegetables",
      description:
        "A vibrant exploration of fresh vegetables through artistic interpretation.",
      price: 1200,
      quantity: 5,
      height: 30,
      width: 40,
      depth: 2,
      weight: 1.5,
      category: { connect: { id: paintingsCategory.id } },
      user: { connect: { id: createdUsers[0].id } }, // Erik Lindström
      images: [
        "befba1a9419c8e60452b95a0cd8416a44f566aae12880f16332c15d07f615ac3",
      ],
    },
    {
      title: "Fresh Garden Series",
      description: "Contemporary still life celebrating fresh ingredients.",
      price: 1400,
      quantity: 3,
      height: 35,
      width: 45,
      depth: 3.5,
      weight: 7,
      category: { connect: { id: paintingsCategory.id } },
      user: { connect: { id: createdUsers[3].id } }, // Sofia Andersson
      images: [
        "a207cfff753562d15a7b2542190abeb72364a30b4f11e6d6f6915e363fc9215c",
      ],
    },
    {
      title: "Sweet Moments",
      description:
        "A delightful painting capturing the essence of dessert artistry.",
      price: 1600,
      quantity: 2,
      height: 40,
      width: 50,
      depth: 4,
      weight: 8,
      category: { connect: { id: paintingsCategory.id } },
      user: { connect: { id: createdUsers[7].id } }, // Isabella Romano
      images: [
        "46e4150718f4710bd2c1a13824e559e680221d9afc33d0e55ecc5895bcf2dd54",
      ],
    },
    {
      title: "Italian Kitchen Series",
      description:
        "Traditional still life celebrating Italian culinary heritage.",
      price: 2200,
      quantity: 2,
      height: 60,
      width: 80,
      depth: 6,
      weight: 12,
      category: { connect: { id: paintingsCategory.id } },
      user: { connect: { id: createdUsers[7].id } }, // Isabella Romano
      images: [
        "f32179f1667fc4d5a4be89e0287f0199e9ba3ef5685280eff561c0b268e59584",
      ],
    },
    {
      title: "Sweet Traditions",
      description: "A celebration of traditional baking artistry.",
      price: 1800,
      quantity: 1,
      height: 45,
      width: 65,
      depth: 4.5,
      weight: 9,
      category: { connect: { id: paintingsCategory.id } },
      user: { connect: { id: createdUsers[0].id } }, // Erik Lindström
      images: [
        "9d04ddf9914b9478c2d128a7194fb96112b3c51c8215da369c1cc0afd2a2922e",
      ],
    },
    {
      title: "Sculptural Stool Collection",
      description:
        "A unique series of handcrafted sculptural stools, showcasing multiple perspectives.",
      price: 3500,
      quantity: 1,
      height: 45,
      width: 30,
      depth: 30,
      weight: 8,
      category: { connect: { id: sculpturesCategory.id } },
      user: { connect: { id: createdUsers[1].id } }, // Anna Björklund
      images: [
        "5cf66ebb94542c239aab0984ff3b8b691d156654f21b337e27f44b86213bd996",
        "b5b8731714004fe433abcf0d4ac870f19d57b58e8b4c8ea412c2234337838d25",
        "bc66e2ebcffc708af4775ca5bc5648e4dad358c233e00d701591a0e0a4ec9a51",
      ],
    },
    {
      title: "Sculptural Seating Studies",
      description: "Contemporary interpretation of functional sculpture.",
      price: 2800,
      quantity: 1,
      height: 40,
      width: 35,
      depth: 35,
      weight: 8,
      category: { connect: { id: sculpturesCategory.id } },
      user: { connect: { id: createdUsers[4].id } }, // Gustav Bergman
      images: [
        "9b528b70927296444beff745011c100ad699a6587df4f73995da245eb184d5da",
        "49470243068d99b34741bcea2ecfd52bfcd0a8b49cf61b9197bc367f320f35ef",
        "74ef850a7566b46d344ac52f83d647bf1ad99c94611dd3d600c97bd06085cd38",
      ],
    },
    {
      title: "Modern Forms",
      description: "Abstract sculpture exploring contemporary shapes.",
      price: 4200,
      quantity: 1,
      height: 70,
      width: 40,
      depth: 40,
      weight: 14,
      category: { connect: { id: sculpturesCategory.id } },
      user: { connect: { id: createdUsers[8].id } }, // James McCarthy
      images: [
        "14cb86e2b54f7ea26da5ff551126a2f621c98d8b88978228eb742974771d2b2a",
        "c00c76729e21e0f08fb67036b2dc1070ec78c1e25d8dbc3c728d742934777160",
      ],
    },
    {
      title: "Harmony in Bronze",
      description: "Bronze sculpture series exploring organic forms.",
      price: 3800,
      quantity: 1,
      height: 55,
      width: 35,
      depth: 35,
      weight: 11,
      category: { connect: { id: sculpturesCategory.id } },
      user: { connect: { id: createdUsers[1].id } }, // Anna Björklund
      images: [
        "b5ccdb74c65f41a260b90087562e63c58994f34b99a8ecc848936e2ffeced2fc",
        "116a495b2ad8870de23e6c3db6856c847f0edc51c45fca6b6d83304573fcce17",
      ],
    },
    {
      title: "Abstract Visions",
      description: "Contemporary sculpture with flowing forms.",
      price: 3200,
      quantity: 1,
      height: 60,
      width: 30,
      depth: 30,
      weight: 12,
      category: { connect: { id: sculpturesCategory.id } },
      user: { connect: { id: createdUsers[4].id } }, // Gustav Bergman
      images: [
        "569193f3570c7298c6923097b07eaf388e6b32e1e63095b3ea50ff3e349e50c6",
        "ecb634f67235d3cfe4570be236362564084864a54003f852e6402fbc5b2a376d",
      ],
    },
    {
      title: "Digital Dreamscape",
      description:
        "A surreal digital artwork exploring themes of consciousness.",
      price: 800,
      quantity: 10,
      height: 0,
      width: 0,
      depth: 0,
      weight: 0,
      category: { connect: { id: digitalArtCategory.id } },
      user: { connect: { id: createdUsers[2].id } }, // Lars Nilsson
      images: [
        "b0c9d8276e3da37fefe71b973f199e0b6e8be3cec2c8c6f8a05de03a8b2445d9",
      ],
    },
    {
      title: "Pixel Paradise",
      description: "A digital artwork series exploring virtual landscapes.",
      price: 950,
      quantity: 5,
      height: 0,
      width: 0,
      depth: 0,
      weight: 0,
      category: { connect: { id: digitalArtCategory.id } },
      user: { connect: { id: createdUsers[5].id } }, // Astrid Johansson
      images: [
        "9a7364028357e5da73e9b060a8c07c9a3174034e88266aff583a6c1cdac9ccf7",
      ],
    },
    {
      title: "Eastern Winds",
      description: "Contemporary Asian-inspired digital art piece.",
      price: 1100,
      quantity: 3,
      height: 0,
      width: 0,
      depth: 0,
      weight: 0,
      category: { connect: { id: digitalArtCategory.id } },
      user: { connect: { id: createdUsers[6].id } }, // Michael Chen
      images: [
        "9a7364028357e5da73e9b060a8c07c9a3174034e88266aff583a6c1cdac9ccf7",
      ],
    },
    {
      title: "Mediterranean Dreams",
      description: "Vibrant painting inspired by Italian coastal life.",
      price: 2800,
      quantity: 1,
      height: 80,
      width: 120,
      depth: 8,
      weight: 16,
      category: { connect: { id: paintingsCategory.id } },
      user: { connect: { id: createdUsers[7].id } }, // Isabella Romano
      images: [
        "b0c9d8276e3da37fefe71b973f199e0b6e8be3cec2c8c6f8a05de03a8b2445d9",
      ],
    },
    {
      title: "Tropical Fusion",
      description: "Digital art blending Brazilian tropical elements.",
      price: 750,
      quantity: 8,
      height: 0,
      width: 0,
      depth: 0,
      weight: 0,
      category: { connect: { id: digitalArtCategory.id } },
      user: { connect: { id: createdUsers[9].id } }, // Maria Santos
      images: [
        "9a7364028357e5da73e9b060a8c07c9a3174034e88266aff583a6c1cdac9ccf7",
      ],
    },
  ];

  console.log(`Start seeding products ...`);

  // Create each product with its assigned images
  for (const product of productsWithImages) {
    const { images, ...productData } = product;

    const newProduct = await prisma.product.create({
      data: {
        ...productData,
        sold_out: false,
        available_stock: product.quantity,
        backorder: false,
        status: "PUBLISHED",
      },
    });

    await Promise.all(
      images.map((imageKey) =>
        prisma.image.create({
          data: {
            image_key: imageKey,
            product: {
              connect: { id: newProduct.id },
            },
          },
        })
      )
    );

    console.log(
      `Created product ${product.title} with ${images.length} images`
    );
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
