import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import setAuthToken from "../utils/setAuthtoken";
import axios from "axios";
import katakana from "../japanese-characters/katakana.json";
import hiragana from "../japanese-characters/hiragana.json";
import Nav from "../components/Nav";
export default function MultipleChoice(props) {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({});
  const languageSystem = props.location.languageSystem;
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);

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
      <Nav />
      multiple choice
    </div>
  );
}
