import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export const POST = async (request: Request) => {
  try {
    const { name, email, number, password } = await request.json();
    const client = new PrismaClient();

    console.log(password);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Save the merchant with the hashed password
    const user = await client.merchant.create({
      data: {
        email: email,
        name: name,
        password:password,
        number:number
      },
    });

    // Return a success response
    return new Response(
      JSON.stringify({
        message: 'Merchant created successfully',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);

    // Return an error response
    return new Response(
      JSON.stringify({
        message: 'An error occurred while creating the merchant',
      }),
      { status: 500 }
    );
  }
};
