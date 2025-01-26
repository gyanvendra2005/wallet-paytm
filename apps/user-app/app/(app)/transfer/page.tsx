// import prisma from "@repo/db/client";
// "use client";
import { PrismaClient } from "@repo/db/client";
import { AddMoney } from "../../../components/addmoney";
import { BalanceCard } from "../../../components/balancecard";
import { OnRampTransactions } from "../../../components/onramptransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/option";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
// import { useState } from "react";
import { Select } from "../../../components/select";

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
   

    const SUPPORTED_BANKS = [{
        name: "HDFC Bank",
        redirectUrl: "https://netbanking.hdfcbank.com"
    }, {
        name: "Axis Bank",
        redirectUrl: "https://www.axisbank.com/"
    }];

    // const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
     let Unlocked = balance.amount;
     let Locked = balance.locked;
     let Total = balance.amount + balance.locked;
    return (
        <div>
            <Navbar/>
            <div className="flex h-screen">
                <Sidebar/>
            {/* <div className="w-screen">
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
    </div> */}
       <div className="p-6 w-full">
                    <h1 className="text-4xl font-bold text-purple-600 mb-6">Transfer</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md ">
                           
                           {/* <div> */}
                           <Select/>
                           {/* <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"  
                            //   onClick={() => {
                            //   window.location.href = redirectUrl || "";
                            //  }}
                            >
                               Add Money
                            </button> */}
                           {/* </div> */}
                          
                        </div>
                        <div>
                            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
                            <div className="bg-white p-6 rounded-lg shadow-md">
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