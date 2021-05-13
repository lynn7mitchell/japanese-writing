import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Nav from "../components/Nav";

export default function FillInTheBlank(props) {
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
      <Nav />
      fill in the blank
    </div>
  );
}
