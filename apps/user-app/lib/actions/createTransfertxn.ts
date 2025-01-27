"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/option";

export async function createTransferTransaction(number: String, amount: number) {
    const session = await getServerSession(authOptions);
    const prisma = new PrismaClient();
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    console.log("Session:", session);
    
    // const token = (Math.random() * 1000).toString();
    // const result = await prisma.onRampTransaction.create({
    //     data: {
    //         provider,
    //         status: "Processing",
    //         startTime: new Date(),
    //         token: token,
    //         userId: Number(session?.user?.id),
    //         amount: amount * 100
    //     }
    // });
    try {
        console.log("Creating transaction");
        
        const token = (Math.random() * 1000).toString();
        const receiver = await prisma.user.findFirst({
            where: {
                number: String(number)
            }
        });
        await prisma.$transaction([
            // sender account
            prisma.balance.updateMany({
                where: {
                    userId: Number(session.user.id)
                },
                data: {
                    amount: {
                        
                        decrement: amount
                    }
                }
            }),
            // receiver account
            prisma.balance.updateMany({
                where: {
                    number: String(number)
                },
                data: {
                    amount: {
                       
                        increment: amount
                    }
                }
            }),
            // senders onRampTransaction
            prisma.onRampTransaction.createMany({
                data: {
                    provider:"UPI",
                    status: "Success",
                    startTime: new Date(),
                    token: token,
                    userId: Number(session?.user?.id),
                    amount: amount * 100,
                    type: "Debited"
                }
            }),
            // receivers onRampTransaction
            prisma.onRampTransaction.createMany({
                data: {
                    provider:"UPI",
                    status: "Success",
                    startTime: new Date(),
                    token: token+1,
                    userId: Number(receiver?.id),
                    amount: amount * 100,
                    type: "Credited"
                }
            }),
            
        ]);
        console.log("hi here");
        // return Response.json({
        //     message: "Transaction created",
        // })
        return {
            message: "Transaction created",
        }

    } catch (error) {
        console.log(error);
        return {
            message: "Transaction failed"
        }
        
    }
}
