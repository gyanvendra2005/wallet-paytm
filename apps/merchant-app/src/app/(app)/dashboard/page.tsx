"use client"
import Image, { type ImageProps } from "next/image";
import { useSession } from "next-auth/react";
import LineChart from "@/app/components/LineChart";
import PieChart from "@/app/components/PieChart";
import BarChart from "@/app/components/BarChart";
// import LineChart from "@/app/components/LineChart";

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
    // console.log(session?.user.Balance);
    
  return (
    <>
     
      <div className="bg-gray-300 min-h-full">

   
                <div className="flex bg-gray-300">
                    <Sidebar />
                    <MainContent />
                </div>
      </div> 
    </>
  );
}

function Sidebar() {
    return (
        <div className="bg-gray-900 text-white w-64 p-6 flex flex-col justify-between">
            <div>
                <div className="flex items-center mb-8">
                    <div className="bg-green-500 h-10 w-10 rounded-full"></div>
                    <span className="ml-4 text-xl font-semibold">Dashboard</span>
                </div>
                <nav>
                    <NavItem icon="fas fa-tachometer-alt" label="Overview" />
                    <NavItem icon="fas fa-file-invoice-dollar" label="Billing" />
                    <NavItem icon="fas fa-bullhorn" label="Campaigns" />
                    <NavItem icon="fas fa-map-marker-alt" label="Locations" />
                    <NavItem icon="fas fa-receipt" label="Receipt" />
                    <NavItem icon="fas fa-square" label="Square" />
                    <NavItem icon="fas fa-cog" label="Settings" />
                </nav>
            </div>
            <div className="flex items-center">
                <img src="https://placehold.co/40x40" alt="User profile" className="h-10 w-10 rounded-full" />
                <span className="ml-4">Julia Alexander</span>
            </div>
        </div>
    );
}

function NavItem({ icon, label }) {
    return (
        <div className={`flex items-center py-2 px-4 mb-2 rounded-lg bg-gray-800 hover:bg-gray-800`}>
            <i className={`${icon} w-6`}></i>
            <span className="ml-4">{label}</span>
        </div>
    );
}

function MainContent() {
    return (


        <div className="flex-1 p-6">
  <Header />
  <div className="gap-6 mt-6">
   

    <div className="grid grid-cols-3 gap-4 mt-6">
    <Card title="Transactions" className="col-span-3">
        <LineChart />
    </Card>
      <Card title="Payment Fees Saved" className="col-span-1">
        <div className="flex flex-col items-center justify-center h-full">
          <img src="https://placehold.co/50x50" alt="Square logo" className="mb-4" />
          <span className="text-2xl font-semibold">$90</span>
          <span className="text-gray-500">Square account</span>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Cash out now
          </button>
        </div>
      </Card>

      <Card title="Payment Type" className="col-span-2  ">
        <div className="text-center mt-4">
          <PieChart/>
        </div>
      </Card>

      <Card title="Avg. Basket Size" className="col-span-2">
        <div className="text-center mt-4">
         <BarChart/>
        </div>
      </Card>

      <Card title="Loyalty Signups" className="col-span-1">
        <img src="https://placehold.co/200x100" alt="Loyalty signups graph" className="mx-auto" />
        <div className="text-center mt-4">
          <span className="text-red-500">-6.2%</span>
        </div>
      </Card>
    </div>
  </div>
</div>

    )}


   function Header() {
            return (
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Overview</h1>
                    <div className="flex items-center">
                        <span className="text-gray-500 mr-4">Sort by date range</span>
                        <button className="px-4 py-2 bg-white text-gray-900 rounded-lg shadow mr-4">This month</button>
                        <button className="px-4 py-2 bg-white text-gray-900 rounded-lg shadow">Select timeline</button>
                    </div>
                </div>
            );
        }

        function Card({ title, children, className }) {
            return (
                <div className={`bg-white p-6  rounded-lg shadow ${className}`}>
                    <h2 className="text-lg font-semibold mb-4">{title}</h2>
                    {children}
                </div>
            );
        }

