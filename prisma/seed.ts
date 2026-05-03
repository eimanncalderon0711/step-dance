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
      supabaseId: "123e4567-e89b-12d3-a456-426614174000",
      role: {
        connect: { id: 1 }, // ADMIN
      },
      posts: {
        create: [
          {
            title: "Join the Prisma Discord",
            content: "https://discord.gg/prisma",
            published: true,
          },
          {
            title: "Prisma on YouTube",
            content: "https://www.youtube.com/prismander",
            published: true,
          },
        ],
      },
    },
    {
      name: "Bob",
      email: "bob@prisma.io",
      supabaseId: "123e4567-e89b-12d3-a456-426614174001",
      role: {
        connect: { id: 2 }, // USER
      },
      posts: {
        create: [
          {
            title: "Follow Prisma on Twitter",
            content: "https://www.twitter.com/prismaa",
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
