// "use client"

// import { useState } from "react";
// import { PrismaClient } from "@repo/db/client";
// import { getServerSession } from "next-auth";



// async function transactions(){
//     const prisma = new PrismaClient()
//     const session = await getServerSession(authOptions);
// }

// export const Select = () => {
//     const SUPPORTED_BANKS = [{
//         name: "HDFC Bank",
//         redirectUrl: "https://netbanking.hdfcbank.com"
//     }, {
//         name: "Axis Bank",
//         redirectUrl: "https://www.axisbank.com/"
//     }];
//     const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);


    


//     return <div>
//      <div className="mb-6">
//         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bank">Bank</label>
//             <select 
//             onChange={ (e) => {setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === e.target.value)?.redirectUrl || "")}}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bank">
//                 {/* <option>HDFC Bank</option> */}
//                 {SUPPORTED_BANKS.map(option => <option value={option.name}>{option.name}</option>)}
//             </select>
          
//      </div>
//      <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"  
//            onClick={() => {
//           window.location.href = redirectUrl || "";
//         }}
//      >
//         Add Money
//     </button>
   
//   </div>
// }