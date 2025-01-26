import React from 'react'
import { OnRampTransactions } from '../../../components/onramptransaction'
import { PrismaClient } from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/option';

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

const page = async () => {
  const transactions = await getOnRampTransactions();
  return (
    <div>
       <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <OnRampTransactions transactions={transactions} />
       </div>
    </div>
  )
}

export default page
