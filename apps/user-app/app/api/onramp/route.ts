
// import { PrismaClient } from '@prisma/client';

// export const GET = async (request: Request) => {
//   try {
//     const { userId }  = await request.json();
//     const client = new PrismaClient();


//     const user = await client.onRampTransaction.findMany({
//         where: { userId: userId },
//     });


//     // Return a success response
//     return (
//       user
//     );
//   } catch (error) {
//     console.error('Error:', error);

//     // Return an error response
//     return new Response(
//       JSON.stringify({
//         message: 'An error occurred',
//       }),
//       { status: 500 }
//     );
//   }
// };



// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";
// import { URL } from "url";

// const prisma = new PrismaClient(); 

// export const GET = async (request: Request) => {
//   try {
  
//     const { searchParams } = new URL(request.url);
//     const userIdParam = searchParams.get("userId");
//      console.log(userIdParam);
     
//     if (!userIdParam) {
//       return new NextResponse(
//         JSON.stringify({ message: "Missing userId parameter" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const userId = parseInt(userIdParam, 10);

//     if (isNaN(userId)) {
//       return new NextResponse(
//         JSON.stringify({ message: "Invalid userId format" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }
// console.log(userId);

//     // Fetch transactions for the user
//     const transactions = await prisma.onRampTransaction.findMany({
//       where: { userId },
//     });
//     console.log("hi");
    
//     return new NextResponse(JSON.stringify(transactions), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     return new NextResponse(
//       JSON.stringify({ message: "An error occurred" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// };

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { URL } from "url";

const prisma = new PrismaClient(); // Initialize Prisma client once

export const GET = async (request: Request) => {
  try {
    // Extract userId from query parameters and convert to number
    const { searchParams } = new URL(request.url);
    const userIdParam = searchParams.get("userId");

    if (!userIdParam) {
      return new NextResponse(
        JSON.stringify({ message: "Missing userId parameter" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const userId = parseInt(userIdParam, 10);

    if (isNaN(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid userId format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch transactions for the user
    const transactions = await prisma.onRampTransaction.findMany({
      where: { userId },
    });

    // Ensure transactions is always an array
    return new NextResponse(
      JSON.stringify(transactions), // If null, return an empty array
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({ message: "An error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
