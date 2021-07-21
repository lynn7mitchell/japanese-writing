import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

export default function Nav(props) {
  const [redirect, setRedirect] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("example-app");
    localStorage.clear()
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="flex justify-between items-center w-screen absolute top-5">
    <Link to={{ pathname: "/dashboard" }} className="ml-5">
        <i className="material-icons back-button">arrow_back</i>
      </Link>
      <button
        className=" mr-2 bg-blue-700 lg:w-36 w-28 text-m rounded-lg p-2 text-white font-bold font-m-plus-rounded"
        onClick={(e) => handleLogout(e)}
      >
        Log Out
      </button>
      
    </div>
  );
}
