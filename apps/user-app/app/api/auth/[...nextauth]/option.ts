import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@repo/db/client"; // Singleton Prisma Client
const prisma = new PrismaClient();
import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID || "",
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
//         })
//     ],
//   }

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
          }),
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password must be provided");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("Invalid email or password");
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.passsword);

                if (!isPasswordCorrect) {
                    throw new Error("Invalid email or password");
                }

                return {
                    ...user,
                    id: user.id.toString(),
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id?.toString() || "";
                token.email = user.email;
                token.name = user.name;
            }
            if (trigger === "update" && session?.user) {
                return { ...token, ...session.user };
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                // session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
    },
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "gyani2004"
};



// import {db} from "@repo/db/client";
// import CredentialsProvider from "next-auth/providers/credentials"
// import bcrypt from "bcrypt";
// import { PrismaClient } from "@repo/db/client"
// const client = new PrismaClient();
// export const authOptions = {
//     providers: [
//       CredentialsProvider({
//           name: 'Credentials',
//           credentials: {
//             email: { label: "email", type: "text"},
//             password: { label: "Password", type: "password" }
//           },
//           // TODO: User credentials type from next-aut
//           async authorize(credentials: any) {
//             // Do zod validation, OTP validation here
//             const hashedPassword = await bcrypt.hash(credentials.password, 10);
//             const existingUser = await client.user.findFirst({
//                 where: {
//                     email: credentials.email
//                 }
//             });

//             if (existingUser) {
//                 const passwordValidation = await bcrypt.compare(credentials.password, existingUser.passsword);
//                 if (passwordValidation) {
//                     return {
//                         id: existingUser.id.toString(),
//                         name: existingUser.name,
//                         email: existingUser.email
//                     }
//                 }
//                 return null;
//             }

//             // try {
//             //     const user = await client.user.create({
//             //         data: {
//             //             ema: credentials.phone,
//             //             password: hashedPassword
//             //         }
//             //     });
            
//             //     return {
//             //         id: user.id.toString(),
//             //         name: user.name,
//             //         email: user.number
//             //     }
//             // } catch(e) {
//             //     console.error(e);
//             // }

//             return null
//           },
//         })
//     ],
//     secret: process.env.JWT_SECRET || "secret",
//     callbacks: {
//         // TODO: can u fix the type here? Using any is bad
//         async session({ token, session }: any) {
//             session.user.id = token.sub

//             return session
//         }
//     }
//   }
 