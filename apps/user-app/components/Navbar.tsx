import React from 'react'

const Navbar = () => {
  return (
    <div className="flex flex-col h-auto">
    <nav className="flex items-center justify-between bg-purple-50 p-4 border-b border-gray-200">
        {/* <div className="flex items-center">
            <img src="https://placehold.co/40x40" alt="Kraken logo" className="mr-2"/>
            <span className="text-2xl font-bold text-purple-600">kraken</span>
        </div>
        <div className="flex items-center space-x-4">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-full">Buy crypto</button>
            <i className="fas fa-th text-gray-600"></i>
            <i className="fas fa-question-circle text-gray-600"></i>
            <i className="fas fa-user-circle text-gray-600"></i>
        </div> */}
         <div className=" text-2xl font-bold text-purple-600">venmo</div>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="bg-purple-600 text-white px-4 py-2 rounded-full">Log in</a>
                            <button className="border border-gray-300 rounded-full px-4 py-1 flex items-center space-x-2">
                                <i className="fab fa-vimeo-v text-blue-600"></i>
                                <span className="text-gray-700">Merchant login</span>
                            </button>
                        </div>
    </nav>
      {/* <header className="w-full flex justify-between items-center p-4">
                        <div className="text-blue-600 text-2xl font-bold">venmo</div>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="text-gray-700">Log in</a>
                            <button className="border border-gray-300 rounded-full px-4 py-1 flex items-center space-x-2">
                                <i className="fab fa-vimeo-v text-blue-600"></i>
                                <span className="text-gray-700">Merchant login</span>
                            </button>
                        </div>
                    </header> */}
  </div>
  )
}

export default Navbar

