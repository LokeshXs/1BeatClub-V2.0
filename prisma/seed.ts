import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const userObjectArr = [
  {
    id: "user_30bce7IVbyXKk7AJAW7pPxYQvaN",
    email: "lokesh1129ece@gmail.com",
    name: "Lokesh Singh",
    username: "lokesh_this_side",
  },
  {
    id: "user_30vJXXzKlEI85ds59huwDDn3q1w",
    email: "lokesh11112001@gmail.com",
    name: "Don Boss",
    username: "lokeshdon_21",
  },
];

async function main() {
  await Promise.all(
    userObjectArr.map(async (user) => {
      await prisma.user.create({
        data: {
          user_id: user.id,
          email: user.email,
          name: user.name,
          username: user.username,
        },
      });
    })
  );

  console.log("Seed data successfull");
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
