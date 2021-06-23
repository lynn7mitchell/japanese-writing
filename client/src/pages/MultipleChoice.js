// TODO LIST
// get list of multiple choice options
// create an answer
// put that into an object
// {
//   options: []
//   correctAnswer: []
// }
// Send to multichoice

import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import setAuthToken from "../utils/setAuthtoken";
import axios from "axios";
import katakanaCharacters from "../japanese-characters/katakana.json";
import hiraganaCharacters from "../japanese-characters/hiragana.json";
import Nav from "../components/Nav";
import Card from "../components/Card";
export default function MultipleChoice(props) {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({});
  const languageSystem = props.location.languageSystem;
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([])
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

    const options = [];

    if (languageSystem === "katakana") {
      for (let i = 4; options.length < 4; i++) {
       let option =
          katakanaCharacters[
            Math.floor(Math.random() * katakanaCharacters.length)
          ];

        if (!options.includes(option)) {
          options.push(option);
        }

        console.log("here")
      }

      console.log(options)

      
    }else{
      // if language system is hiragana
      for (let i = 4; options.length < 4; i++) {
        let option =
           hiraganaCharacters[
             Math.floor(Math.random() * hiraganaCharacters.length)
           ];
 
         if (!options.includes(option)) {
           options.push(option);
         }
       }
       console.log(options)

    }

    
    // FINAL OPTIONS AND ANSWER
    setMultipleChoiceOptions(options)
    setCorrectAnswer(options[Math.floor(Math.random() * options.length)].roumaji)


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
      <div className="text-7xl md:text-8xl">{correctAnswer}</div>
      <div className="flex flex-wrap justify-evenly md:justify-around">
        {multipleChoiceOptions.map(option =>{
          return(
          <Card character={option.kana}/>
          )
        })}
      </div>

      {/* <button className="bg-blue-700 lg:w-40 lg:mx-36 text-lg rounded-lg p-2 mt-9 text-white w-11/12 font-bold font-m-plus-rounded">
            AM I RIGHT?
          </button> */}

    </div>

    
  );
}
