import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
  })
  // Publish the post
  const post = await prisma.post.update({
    where: { id: 2 },
    data: { published: true },
  })
  console.log(post)
  // Get all users (include posts)
  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  })
  // use `console.dir` to print nested objects
  console.dir(allUsers, { depth: null })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
