import { NextResponse } from "next/server"
import { PrismaClient } from "@repo/db/client";
import bcrypt from "bcrypt"

const client = new PrismaClient();

export const POST = async (request: Request) => {
  const { name, email, age, password } = await request.json();
  console.log(password);
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  
  // Save the user with the hashed password
  await client.user.create({
    data: {
      email: email,
      name: name,
      age: age,
      passsword: hashedPassword, // Use the hashed password here
    }
  });

  return Response.json({
    message: "User created successfully"
  }, {
    status: 200
  });
}
