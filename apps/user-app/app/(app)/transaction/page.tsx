import React from 'react'
import { OnRampTransactions } from '../../../components/onramptransaction'
import { $Enums, PrismaClient } from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/option';

enum OnRampStatus {
  Success,
  Failed,
  Pending
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const prisma = new PrismaClient()
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    })as { startTime: Date; amount: number; status: string; provider: string }[];
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: OnRampStatus[t.status as keyof typeof OnRampStatus],
        provider: t.provider,
    })) as {time: Date, amount: number, status: OnRampStatus, provider: string}[];
}

const page = async () => {
  const transactions = await getOnRampTransactions();
  return (
    <div>
      {/* <Navbar/> */}

      <div className='flex h-auto'>
        {/* <Sidebar/> */}
      <div className="bg-yellow-50 p-5 m-5 w-full rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <p>Only 10 latest transaction</p>
            <OnRampTransactions transactions={transactions} />
       </div>
      </div>
    </div>
  )
}

export default page
