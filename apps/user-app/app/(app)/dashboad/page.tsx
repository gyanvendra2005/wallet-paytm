import Image, { type ImageProps } from "next/image";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";

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
  return (
    <div>
       <Navbar/>

    <div className="flex h-screen">
     <Sidebar/>
    {/* <aside className="w-64 bg-gray-100 p-6">
        <nav>
            <ul>
                <li className="mb-4">
                    <a href="#" className="flex items-center text-purple-600">
                        <i className="fas fa-home mr-2"></i> Home
                    </a>
                </li>
                <li className="mb-4">
                    <a href="#" className="flex items-center text-gray-600">
                        <i className="fas fa-search mr-2"></i> Explore
                    </a>
                </li>
                <li className="mb-4">
                    <a href="#" className="flex items-center text-gray-600">
                        <i className="fas fa-percentage mr-2"></i> Rewards
                    </a>
                </li>
                <li className="mb-4">
                    <a href="#" className="flex items-center text-gray-600">
                        <i className="fas fa-exchange-alt mr-2"></i> Transfer
                    </a>
                </li>
                <li className="mb-4">
                    <a href="#" className="flex items-center text-gray-600">
                        <i className="fas fa-clock mr-2"></i> Transactions
                    </a>
                </li>
            </ul>
        </nav>
    </aside> */}
    <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-purple-600">Good afternoon, Harkirat</h1>
        </header>
        <section className="mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-lg font-medium text-gray-600">Wallet Balance</h2>
                        <p className="text-3xl font-bold text-black">$0.00</p>
                    </div>
                </div>
                <div className="border-b border-purple-600 mb-4"></div>
                <div className="flex justify-between text-gray-600 text-sm">
                    <span>20 FEB</span>
                    <span>28 FEB</span>
                    <span>7 MAR</span>
                    <span>15 MAR</span>
                    <span>23 MAR</span>
                </div>
                <div className="flex justify-center mt-4">
                    <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full mx-1">1W</button>
                    <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full mx-1">1M</button>
                    <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full mx-1">3M</button>
                    <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full mx-1">6M</button>
                    <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full mx-1">1Y</button>
                    <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full mx-1">ALL</button>
                </div>
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
                    <h2 className="text-lg font-medium text-gray-600">Daily Transfer Limit</h2>
                </div>
                <p className="text-gray-600 mb-4">$100</p>
                <p className="text-gray-600 mb-4">To Increace the Amount Upgrade your account</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-full">Upgrade</button>
            </div>
        </section>
    </main>
</div>
</div>
// </div>
  );
}
