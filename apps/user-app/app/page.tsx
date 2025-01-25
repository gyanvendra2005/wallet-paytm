import Image, { type ImageProps } from "next/image";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

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

export default function Home() {
  return (
<div>
  <Navbar/>
<div className="flex h-screen ">
                  <Sidebar/>
                  <div className="flex-1 p-6">
                    <main className="flex flex-col md:flex-row items-center  bg-purple-100 rounded-lg p-8 md:p-16 mt-8 mx-4 md:mx-12 mb-8">
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Fast, safe social payments</h1>
                            <p className="text-gray-700 mb-8">Pay, get paid, grow a business, and more. Join the tens of millions of people on PayWallet.</p>
                            <button className="bg-purple-600 text-white rounded-full px-6 py-3 text-lg font-bold shadow-lg hover:bg-purple-700">
                                <i className="fab fa-vimeo-v"></i> Get started
                            </button>
                        </div>
                        <div className="flex-1 mt-8 md:mt-0">
                            <img src="https://placehold.co/600x400" alt="Group of friends having a picnic in the park" className="rounded-lg shadow-lg"/>
                            <div className="bg-white rounded-full shadow-lg p-4 mt-4 flex items-center space-x-2">
                                <img src="https://placehold.co/40" alt="Profile picture of Trish A" className="rounded-full"/>
                                <div>
                                    <p className="text-gray-700"><strong>You paid Trish A</strong></p>
                                    <p className="text-gray-500">Picnic in the park <span role="img" aria-label="sandwich">🥪</span></p>
                                </div>
                            </div>
                        </div>
                    </main>
                    </div>
</div>
</div>
  );
}
