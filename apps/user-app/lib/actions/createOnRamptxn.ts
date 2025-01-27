"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/option";

export async function createOnRampTransaction(provider: string, amount: number) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await getServerSession(authOptions);
    const prisma = new PrismaClient();
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random() * 1000).toString();
    const result = await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100,
            type: "Credited"
        }
    });

    return {
        message: "Transaction created",
    }
}
