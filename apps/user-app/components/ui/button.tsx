"use client"


import { createOnRampTransaction } from "../../lib/actions/createOnRamptxn";



export default function Button({redirectUrl, amount}: {redirectUrl: string, amount: number}) {

  const handleTransaction = async () => {
   
    try {

      const result = await createOnRampTransaction("HDFC Bank", amount);
      window.location.href = redirectUrl || "";
      console.log("Transaction successful:", result);
    } catch (error) {
      console.error("Error during transaction:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleTransaction}
      >
        Add Money
      </button>
    </div>
  );
}
