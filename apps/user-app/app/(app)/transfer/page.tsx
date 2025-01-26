// import prisma from "@repo/db/client";
// "use client";
import { PrismaClient } from "@repo/db/client";
import { AddMoney } from "../../../components/addmoney";
import { BalanceCard } from "../../../components/balancecard";
import { OnRampTransactions } from "../../../components/onramptransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/option";
import { useSession } from "next-auth/react";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";

async function getBalance() {
    const prisma = new PrismaClient()
    // const {data:session} = useSession();
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const prisma = new PrismaClient()
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return (
        <div>
            <Navbar/>
            <div className="flex h-screen">
                <Sidebar/>
            <div className="w-screen">
        <div className="text-4xl text-purple-600 pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
            </div>
        </div>
    )
}