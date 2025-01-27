"use client"

import { useState } from "react";
// import  Button  from "./ui/button";
import { createTransferTransaction } from "../lib/actions/createTransfertxn";

export const Transfer = () => {
    const [amount, setAmount] = useState<number>();
    const [number, setNumber] = useState<string>("");

    
      const handleTransaction = async () => {
       
        try {
    
        //   const result = await createOnRampTransaction("HDFC Bank", amount);
        if (amount !== undefined) {
          const result = await createTransferTransaction(number, amount);
          console.log("Transaction successful:", result);
        } else {
          console.error("Amount is undefined");
        }
          // console.log("Transaction successful:", result);
        } catch (error) {
          console.error("Error during transaction:", error);
        }
      };

    return <div>
            <div className="mb-6">

             <h2 className="text-xl font-semibold mb-4">Transfer Money</h2>
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
        
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bank">To</label>
              <input 
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="amount" 
                     type="number" 
                     placeholder="Number/UPI"
                     value={number}
                     onChange={(e) => setNumber(e.target.value)}
                     />    
           
           </div>
           <button
            className="bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleTransaction}
           >
              Add Money
           </button>
   
        </div>
}