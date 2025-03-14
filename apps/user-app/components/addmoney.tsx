"use client"

import { Card } from "@repo/ui/tranfercard";

// import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    return <Card title="Add Money">
    <div className="w-full space-y-4">
      {/* Amount Input */}
      <TextInput
        label="Amount"
        placeholder="Enter amount"
        onChange={() => {}}
        // className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
  
      {/* Bank Selection */}
      <div className="py-4">
        <label className="block text-sm font-medium text-gray-700">Select Bank</label>
        {/* <Select onChange={(value: string) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
          }}
          onSelect={(value:String) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}

{/* <Select
  // onChange={(value: string) => {
  //   setRedirectUrl(
  //     SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
  //   );
  // }}
  // options={SUPPORTED_BANKS.map((x) => ({
  //   key: x.name,
  //   value: x.name,
  // }))}
  // className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/> */}
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bank">Bank</label>
              <select 
               onChange={ (e) => {setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === e.target.value)?.redirectUrl || "")}}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bank">
                {/* <option>HDFC Bank</option> */}
                {SUPPORTED_BANKS.map(option => <option value={option.name}>{option.name}</option>)}
              </select>

      </div>
  
      {/* Add Money Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => {
            window.location.href = redirectUrl || "";
          }}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Money
        </button>
      </div>
    </div>
  </Card>
  
}