import { Prisma, PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {
  await prisma.role.createMany({
    data: [
      { name: "ADMIN" },
      { name: "USER" },
    ],
    skipDuplicates: true,
  });

  const userData: Prisma.UserCreateInput[] = [
    {
      name: "Alice",
      email: "alice@prisma.io",
      role: {
        connect: { id: 1 }, // ADMIN
      },
      posts: {
        create: [
          {
            title: "Join the Prisma Discord",
            published: true,
          },
          {
            title: "Prisma on YouTube",
          },
        ],
      },
    },
    {
      name: "Bob",
      email: "bob@prisma.io",
      role: {
        connect: { id: 2 }, // USER
      },
      posts: {
        create: [
          {
            title: "Follow Prisma on Twitter",
            published: true,
          },
        ],
      },
    },
  ];

  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
