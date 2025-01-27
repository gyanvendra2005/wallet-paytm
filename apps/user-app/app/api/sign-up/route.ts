// import { PrismaClient } from "@repo/db/client";
// import bcrypt from "bcrypt"



// export const POST = async (request: Request) => {
//   const { name, email, number, password } = await request.json();
//   const client = new PrismaClient();
//   console.log(password);
  
//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);
//   console.log(hashedPassword);
  
//   // Save the user with the hashed password
//   const user = await client.user.create({
//     data: {
//       email: email,
//       name: name,
//       number: number,
//       password: hashedPassword,
//     }
//   });
//   await client.balance.create({
//     data: {
//       amount: 0,
//       locked: 0,
//       userId: 2,
//       number: number
//     }
//   });
  

//   return Response.json({
//     message: "User created successfully"
//   }, {
//     status: 200
//   });
// }


// export const POST = async (request: Request) => {
//   try {
//     // Validate and parse request body
//     const body = await request.json();

//     if (!body) {
//       return new Response(
//         JSON.stringify({ error: "Request body is missing" }),
//         { status: 400 }
//       );
//     }

//     const { name, email, number, password } = body;

//     if (!name || !email || !password) {
//       return new Response(
//         JSON.stringify({ error: "Missing required fields" }),
//         { status: 400 }
//       );
//     }

//     const client = new PrismaClient();

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save the user with the hashed password
//     await client.user.create({
//       data: {
//         email,
//         name,
//         number,
//         password: hashedPassword,
//       },
//     });

//     return new Response(
//       JSON.stringify({ message: "User created successfully" }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return new Response(
//       JSON.stringify({ error: "Internal Server Error" }),
//       { status: 500 }
//     );
//   }
// };



import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export const POST = async (request: Request) => {
  try {
    const { name, email, number, password } = await request.json();
    const client = new PrismaClient();

    // Log the received password (for debugging, should be removed in production)
    console.log(password);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Save the user with the hashed password
    const user = await client.user.create({
      data: {
        email: email,
        name: name,
        number: number,
        password: hashedPassword,
      },
    });

    // Create an associated balance record for the user
    await client.balance.create({
      data: {
        amount: 0,
        locked: 0,
        userId: user.id,
        number: number,
      },
    });

    // Return a success response
    return new Response(
      JSON.stringify({
        message: 'User created successfully',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);

    // Return an error response
    return new Response(
      JSON.stringify({
        message: 'An error occurred while creating the user',
      }),
      { status: 500 }
    );
  }
};
