// import Link from 'next/link'
// import React from 'react'




// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-gray-100 p-6">
//         <nav>
//             <ul>
//                 <li className="mb-4">
//                     <Link href="/" className={`flex items-center text-purple-600`} >
//                         <i className="fas fa-home mr-2"></i> Home
//                     </Link>
//                     {/* <NavLink
//                             to="/"
//                             style={({ isActive }) => ({
//                                 color: isActive
//                                     ? "greenyellow"
//                                     : "white",
//                             })}
//                         >
//                             Home
//                         </NavLink> */}
//                 </li>
//                 <li className="mb-4">
//                     <Link href="dashboad" className="flex items-center text-gray-600">
//                         <i className="fas fa-search mr-2"></i> Dashboad
//                     </Link>
//                 </li>
//                 <li className="mb-4">
//                     <Link href="#" className="flex items-center text-gray-600">
//                         <i className="fas fa-percentage mr-2"></i> Rewards
//                     </Link>
//                 </li>
//                 <li className="mb-4">
//                     <Link href="#" className="flex items-center text-gray-600">
//                         <i className="fas fa-exchange-alt mr-2"></i> Transfer
//                     </Link>
//                 </li>
//                 <li className="mb-4">
//                     <Link href="#" className="flex items-center text-gray-600">
//                         <i className="fas fa-clock mr-2"></i> Transactions
//                     </Link>
//                 </li>
//             </ul>
//         </nav>
    
//     </div>
//   )
// }

// export default Sidebar

"use client" 

import { useState } from "react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { BiTransfer } from "react-icons/bi";
import { CiClock2 } from "react-icons/ci";

export default function Sidebar() {
  const [active, setActive] = useState("/"); // Tracks the active link

  const menuItems = [
    { href: "/", icon: <AiOutlineHome />, label: "Home" },
    { href: "dashboad", icon: <RxDashboard />, label: "Dashboad" },
    // { href: "#i", icon: "fas fa-percentage", label: "Rewards" },
    { href: "transfer", icon: <BiTransfer />, label: "Transfer" },
    { href: "transaction", icon: <CiClock2 />, label: "Transactions" },
  ];

  return (
    <div className="w-64 bg-gray-100 p-6">
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.label} className="mb-4">
              <Link
                href={item.href}
                className={`flex items-center font-bold px-4 py-2 rounded-lg  ${
                  active === item.href
                    ? "text-purple-600 "
                    : "text-gray-600 hover:text-purple-600"
                }`}
                onClick={() => setActive(item.href)} // Set active link
              >
                <i className={`${item.icon} mr-2 `}>{item.icon}</i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
