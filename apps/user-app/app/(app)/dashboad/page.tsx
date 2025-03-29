"use client"
import Image, { type ImageProps } from "next/image";
import { useSession } from "next-auth/react";
import LineChart from "../../../components/LineChart";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;
 
  

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Dashboad() {
    const { data: session } = useSession();
    console.log(session?.user?.name);
    console.log(session?.user.Balance);
    
  return (
    <div>
       {/* <Navbar/> */}

    {/* <div className="flex h-screen"> */}
     {/* <Sidebar/> */}
    <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-purple-600">Hello, {session?.user?.name}</h1>
        </header>
        <section className="mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-lg font-medium text-gray-600">Wallet Balance</h2>
                        <p className="text-3xl font-bold text-black">{session?.user?.Balance}</p>
                    </div>
                </div>
               <LineChart/>
            </div>
        </section>
        <section className="flex ">
            <div className="bg-white p-6 rounded-lg shadow w-1/3 m-3">
                <div className="flex items-center mb-4">
                    <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full mr-2">New</span>
                    <h2 className="text-lg font-medium text-gray-600">Kyc Required</h2>
                </div>
                <p className="text-gray-600 mb-4">Do KYC of your Account for Transactions</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-full">Get started</button>
            </div>
            {/* Daily limit */}
            <div className="bg-white p-6 rounded-lg shadow w-1/3 m-3">
                <div className="flex items-center mb-4">
                    <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full mr-2">New</span>
                    <h2 className="text-lg font-medium text-gray-600">Daily Transfer Limit Upto $100</h2>
                </div>
                <p className="text-gray-600 mb-4"></p>
                <p className="text-gray-600 mb-4">To Increace the Amount Upgrade your account</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-full">Upgrade</button>
            </div>
        </section>
    </main>
</div>
// </div>
// </div>
  );
}
