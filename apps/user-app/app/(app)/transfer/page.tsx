
import { PrismaClient } from "@repo/db/client";
import { OnRampTransactions } from "../../../components/onramptransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/option";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import { Select } from "../../../components/select";

async function getBalance() {
    const prisma = new PrismaClient()
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
   

     let Unlocked = balance.amount;
     let Locked = balance.locked;
     let Total = balance.amount + balance.locked;
    return (
        <div>
            <Navbar/>
            <div className="flex h-screen">
                <Sidebar/>
               <div className="p-6 w-full">
                    <h1 className="text-4xl font-bold text-purple-600 mb-6">Transfer</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-6 rounded-lg shadow-md h-100 ">

                           <Select/>
                          
                        </div>
                        <div>
                            <div className="bg-pink-50 p-6 rounded-lg shadow-md mb-6">
                                <h2 className="text-xl font-semibold mb-4">Balance</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Unlocked balance</span>
                                    <span>{Unlocked} INR</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Total Locked Balance</span>
                                    <span>{Locked} INR</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Balance</span>
                                    <span>{Total} INR</span>
                                </div>
                            </div>
                            <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
                                {/* <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2> */}
                                <OnRampTransactions transactions={transactions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}