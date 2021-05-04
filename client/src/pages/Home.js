import React from "react";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="bg-gray-900 h-screen w-screen flex flex-col items-center content-center justify-center  font-bold font-m-plus-rounded text-white">
      <h1 className="lg:text-6xl text-3xl font-bold font-m-plus-rounded pb-1">
        Japanese Writing App
      </h1>
      <h3 className="text-lg text-gray-600 font-m-plus-rounded" >Learn Japanese Hiragana &amp; Katakana</h3>
      <div className="flex flex-col lg:flex-row content-around justify-self-end mt-96">
        <Link to={"/login"} className="pb-5">
          <button className="bg-blue-700 text-lg rounded-lg p-2 text-white w-screen font-bold font-m-plus-rounded">
            LOG IN
          </button>
        </Link>
        <Link to={"/signup"}>
          <button className="bg-blue-700 text-lg rounded-lg p-2 text-white w-screen font-bold font-m-plus-rounded">
            SIGN UP
          </button>
        </Link>
      </div>
      {/* <p>Demo Login:</p>
      <p>Email: code7sandbox@gmail.com</p>
      <p>Password: DemoTest#1</p> */}
    </div>
  );
}
