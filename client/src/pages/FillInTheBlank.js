import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
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
  return <div>fill in the blank</div>;
}
