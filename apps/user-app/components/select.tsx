"use client"

import { useState } from "react";
// import { PrismaClient } from "@repo/db/client";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../app/api/auth/[...nextauth]/option";
import  Button  from "./ui/button";


// async function transactions(){
//     const prisma = new PrismaClient()
//     const session = await getServerSession(authOptions);
    // const txns = await prisma.onRampTransaction.create({
    //     data: {
    //         userId: Number(session?.user?.id),
    //         amount: 100,
    //         provider: "HDFC Bank",
    //         status: "Processing",
    //         startTime: new Date(),
    //         token: "1234"
    //     }
    // });
// }

export const Select = () => {
    const SUPPORTED_BANKS = [{
        name: "HDFC Bank",
        redirectUrl: "https://netbanking.hdfcbank.com"
    }, {
        name: "Axis Bank",
        redirectUrl: "https://www.axisbank.com/"
    }];
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState<number>();
    // const onRampTransaction = ()=>{transactions()}; 

    


    return <div>
         

         <div className="mb-6">

            <h2 className="text-xl font-semibold mb-4">Add Money</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">Amount</label>
                    <input 
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="amount" 
                     type="number" 
                     placeholder="Amount"
                     value={amount}
                     onChange={(e) => setAmount(Number(e.target.value))}
                     />
                </div>
         </div>
     <div className="mb-6">
        
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bank">Bank</label>
            <select 
            onChange={ (e) => {setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === e.target.value)?.redirectUrl || "")}}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bank">
                {/* <option>HDFC Bank</option> */}
                {SUPPORTED_BANKS.map(option => <option value={option.name}>{option.name}</option>)}
            </select>
          
     </div>
    <Button redirectUrl={redirectUrl || ""} amount={amount || 0}  />
   
  </div>
}