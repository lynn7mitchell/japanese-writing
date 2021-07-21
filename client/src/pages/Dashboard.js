import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import setAuthToken from "../utils/setAuthtoken";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // gets the bearer token to validate the user that is logged in
    const token = localStorage.getItem("example-app");

    if (token) {
      setAuthToken(token);
    }

    axios
      .get("/api/user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err.res.data);
      });
  }, []);

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
      <h1 className="lg:text-6xl text-3xl font-bold font-m-plus-rounded pb-1 mb-20">
        Choose A Writing System
      </h1>
      <div className="flex justify-between lg:w-2/5">
        <Link
          to={{
            pathname: "/multiple-choice",
            languageSystem: "katakana",
          }}
          className="p-7"
        >
          <h1 className="text-6xl text-center">ア</h1>
          <h3 className="text-3xl">Katakana</h3>
        </Link>
        <Link
          to={{
            pathname: "/multiple-choice",
            languageSystem: "hiragana",
          }}
          className="p-7"
        >
          <h1 className="text-6xl text-center">あ</h1>
          <h3 className="text-3xl">Hiragana</h3>
        </Link>
      </div>
    </div>
  );
}
