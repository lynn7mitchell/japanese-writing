import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

export default function StudyMode(props) {
  const [redirect, setRedirect] = useState(false);

  const languageSystem = props.location.languageSystem;

  const handleLogout = () => {
    localStorage.removeItem("example-app");
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="bg-gray-900 h-screen w-screen flex flex-col items-center content-center justify-center font-bold font-m-plus-rounded text-white">
      <button
        className="absolute top-5 right-2 bg-blue-700 lg:w-36 w-28 text-m rounded-lg p-2 text-white font-bold font-m-plus-rounded"
        onClick={(e) => handleLogout(e)}
      >
        Log Out
      </button>
      <Link to={{ pathname: "/dashboard" }} className="absolute top-5 left-5">
        <i className="material-icons back-button">arrow_back</i>
      </Link>
      <h1 className="lg:text-6xl text-3xl font-bold font-m-plus-rounded pb-1 mb-20">
        Choose A Writing System
      </h1>
      <div className="flex justify-between lg:w-2/5">
        <Link
          to={{
            pathname: "/multiple-choice",
            languageSystem,
          }}
          className="p-7"
        >
          <h1 className="lg:text-4xl text-2xl text-center">Multiple Choice</h1>
        </Link>
        <Link
          to={{
            pathname: "/fill-in-the-blank",
            languageSystem,
          }}
          className="p-7"
        >
          <h1 className="lg:text-4xl text-2xl text-center">
            Fill In The Blank
          </h1>
        </Link>
      </div>
    </div>
  );
}
