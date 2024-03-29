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
import { useHistory } from "react-router";
import katakanaCharacters from "../japanese-characters/katakana.json";
import hiraganaCharacters from "../japanese-characters/hiragana.json";
import Nav from "../components/Nav";
import Card from "../components/Card";
export default function MultipleChoice(props) {
  const history = useHistory();

  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({});
  const [languageSystem, setLanguageSystem] = useState("");
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  // This is set so that the user cannot click on another answer after the initial answer
  const [alreadyClicked, setAlreadyClicked] = useState(false);

  useEffect(() => {
    // gets the bearer token to validate the user that is logged in
    const token = localStorage.getItem("example-app");

    let languageSystem = "";

    if (props.location.languageSystem !== undefined) {
      setLanguageSystem(props.location.languageSystem);
      languageSystem = props.location.languageSystem;
      localStorage.setItem("languageSystem", props.location.languageSystem);
    } else {
      setLanguageSystem(localStorage.getItem("languageSystem"));
      languageSystem = localStorage.getItem("languageSystem");
    }

    console.log(languageSystem);

    if (token) {
      setAuthToken(token);
    }

    axios
      .get("/api/user")
      .then((res) => {
        setUser(res.data);
        setCurrentStreak(res.data[languageSystem].multipleChoice.current);
        setHighestStreak(res.data[languageSystem].multipleChoice.highest);
        console.log(res.data);
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

        console.log("here");
      }

      console.log(options);
    } else {
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
      console.log(options);
    }

    // FINAL OPTIONS AND ANSWER
    setMultipleChoiceOptions(options);
    setCorrectAnswer(options[Math.floor(Math.random() * options.length)]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("example-app");
    setRedirect(true);
  };

  const onUserAnswer = (e) => {
    setAlreadyClicked(true);

    if (!alreadyClicked) {
      let userAnswer = e.target.outerText;

      console.log(document.getElementsByClassName('roumaji')[0].classList)
      for(let i = 0; i < document.getElementsByClassName('roumaji').length; i++){
        document.getElementsByClassName('roumaji')[i].classList.remove('hidden')
      }

      if (userAnswer === correctAnswer.kana) {
        console.log("CORRECT " + correctAnswer.kana + " " + userAnswer);
        // Style change on user answer
        e.target.classList.remove("hover:bg-blue-700");
       document.getElementById(correctAnswer.kana).classList.add("bg-green-500");
        console.log(user[languageSystem].multipleChoice.current);

        let newCurrentStreak = currentStreak + 1;
        let newHighestStreak = highestStreak;
        if (newCurrentStreak >= highestStreak) {
          newHighestStreak = newCurrentStreak;
        }

        let newUser = {
          ...user,
          [languageSystem]: {
            multipleChoice: {
              ...user[languageSystem].multipleChoice,
              current: newCurrentStreak,
              highest: newHighestStreak,
            },
          },
        };

        axios.put("api/user", newUser).catch((err) => {
          console.error(err.res.data);
        });
      } else {
        console.log("WRONG " + correctAnswer.kana + " " + userAnswer);
        // Style change on user answer
        e.target.classList.remove("hover:bg-blue-700");
        e.target.classList.add("bg-red-500");
        document
          .getElementById(correctAnswer.kana)
          .classList.add("bg-green-500");

        let newCurrentStreak = 0;

        let newUser = {
          ...user,
          [languageSystem]: {
            multipleChoice: {
              ...user[languageSystem].multipleChoice,
              current: newCurrentStreak,
            },
          },
        };

        axios.put("api/user", newUser).catch((err) => {
          console.error(err.res.data);
        });
      }

      document.getElementById("next_button").classList.remove("hidden");
    }
  };

  const refresh = (e) => {
    history.go(0);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="bg-gray-900 h-screen w-screen flex flex-col items-center content-center justify-center font-bold font-m-plus-rounded text-white">
      <Nav />
      <div className="flex self-center justify-around md:selft-start md:justfy-start md:flex-col lg:w-2/3 md:w-4/5 m-4 mb-7 w-screen">
        <h4 className="text-lg">Current Streak: {currentStreak}</h4>
        <h4 className="text-lg">Highest Streak: {highestStreak}</h4>
      </div>
      <div className="text-7xl md:text-8xl">{correctAnswer.roumaji}</div>
      <div className="flex flex-wrap justify-evenly md:justify-around pb-20">
        {multipleChoiceOptions.map((option) => {
          return (
            <div
              onClick={(e) => onUserAnswer(e)}
              className="answer-options rounded-xl shadow-md text-center text-5xl border-4 pt-14 pb-14 w-40 mt-9 md:mx-5 hover:bg-blue-700 relative" 
              key={option.kana}
              id={option.kana}
            >
             {option.kana}
             <div className="roumaji text-lg hidden absolute inset-x-1/4	pt-2">{option.roumaji}</div>


            </div>
          );
        })}
      </div>

      <button
        id="next_button"
        className="bg-blue-700 hover:bg-blue-800 lg:w-40 lg:mx-36 text-lg rounded-lg p-2 -mt-11 text-white w-11/12 font-bold font-m-plus-rounded hidden"
        onClick={(e) => {
          refresh(e);
        }}
      >
        Next
      </button>
    </div>
  );
}
