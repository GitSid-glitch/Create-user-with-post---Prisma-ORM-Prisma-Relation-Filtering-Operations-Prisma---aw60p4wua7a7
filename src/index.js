const { prisma } = require("../db/config");

async function createUserWithPost({ name, email, title, content }) {
  // Write your code here
  if (!name || !email || !title || !content) {
    return { success: false };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Create the user
      const user = await tx.user.create({
        data: { name, email },
      });

      await tx.post.create({
        data: {
          title,
          content,
          userId: user.id,
        },
      });
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

module.exports = { createUserWithPost };
