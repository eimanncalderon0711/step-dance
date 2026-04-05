import { prisma } from "@/lib/prisma";


async function main(){
    const getAllUsers = await prisma.user.findMany({
    include: {
      role: true,
      posts: true,
    },
  });

  const getRoleUsers = await prisma.role.findMany({
    include: {
        users: true,
    },
  });

//   const createUser = await prisma.user.create({
//     data: {
//       name: "Johny Bravo",
//       email: "johny@prisma.io",
//       role: {
//         create: { name: "TECH LEAD" }, // ADMIN
//       },
//     },
//   });


  const editUser = await prisma.user.update({
    where: { id: 1 },
    data: {
      name: "Alice Updated",
      posts: {
        create: { title: "New Post for Alice" },
      },
    },
  });

  console.log("New user created:", editUser);

//   console.log(JSON.stringify(getAllUsers, null, 2));


//   console.log(JSON.stringify(getRoleUsers, null, 2));
}

main();