import React from "react";
import { Link } from "react-router-dom";
import arrow_icon from "../arrow_icon.png";

export default function Home() {
  return (
    <div className="bg-gray-900 h-screen w-screen flex flex-col items-center content-center justify-center font-bold font-m-plus-rounded text-white">
      <h1 className="lg:text-6xl text-3xl font-bold font-m-plus-rounded pb-1">
        Japanese Writing App
      </h1>
      <h3 className="text-lg text-gray-600 font-m-plus-rounded">
        Learn Japanese Hiragana &amp; Katakana
      </h3>
      <div className="flex flex-col lg:flex-row content-around justify-self-end lg:mt-80 mt-96">
        
        <Link to={"/login"} className="pb-5">
        <div className="w-full flex justify-center -mb-10 relative">
          <h3 className="self-top " >
            Demo Login Available
          </h3>
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23.18 37.92"
            width="4%"
            className="self-bottom pl-2"
            style={{ fill: "#fefefe" }}
          >
            <path
              d="M180.9,150.4c.72-3,1.9-5.92,2.07-8.92.36-6.83-2.76-11.93-8.81-15.19a9.47,9.47,0,0,1-1.78-1.1,1.93,1.93,0,0,1-.47-2.72,2.21,2.21,0,0,1,2.92-1q11.74,5.33,12.83,18.19c.36,4.45-.94,8.53-3.15,12.89l5-2c.64-.25,1.27-.54,1.91-.8a2.27,2.27,0,0,1,3.08,1.16,2.49,2.49,0,0,1-1.26,3.25q-6,2.46-11.94,4.82a2.49,2.49,0,0,1-3.26-1.5c-1.6-3.88-3.19-7.76-4.74-11.65a2.37,2.37,0,0,1,1.33-3.33c1.15-.45,2.36.22,3,1.62l2.62,6.21Z"
              transform="translate(-171.54 -121.22)"
            />
          </svg>
        </div>
        <div className="pt-12">
          <button className="bg-blue-700 lg:w-40 lg:mx-36 text-lg rounded-lg p-2 text-white w-screen font-bold font-m-plus-rounded">
            LOG IN
          </button></div>
        </Link>
        <Link to={"/signup"}>
        <div className="lg:pt-12">

          <button className="bg-blue-700 lg:w-40 lg:mx-36 text-lg rounded-lg p-2 text-white w-screen font-bold font-m-plus-rounded">
            SIGN UP
          </button></div>
        </Link>
      </div>
     
    </div>
  );
}
