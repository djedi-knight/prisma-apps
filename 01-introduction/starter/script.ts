import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  // Create a post
  await prisma.post.create({
    data: {
      title: "Prisma makes databases easy",
      author: {
        connect: { email: "sarah@prisma.io" },
      },
    },
  });

  // Publish the post
  await prisma.post.update({
    where: { id: 2 },
    data: { published: true },
  });

  // Create a user and post record in the same call
  await prisma.user.create({
    data: {
      name: "Nancy",
      email: "nancy@prisma.io",
      posts: {
        create: { title: "Join us for Prisma Day 2020" },
      },
    },
  });

  // Get all users (include posts)
  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  });
  console.log("all users:");
  // Use `console.dir` to print nested objects
  console.dir(allUsers, { depth: null });

  // Filter all posts containing the word `prisma`
  const filteredPosts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: "prisma" } },
        { content: { contains: "prisma" } },
      ],
    },
  });
  console.log("filtered posts:");
  console.dir(filteredPosts, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });
