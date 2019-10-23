import React, { Component } from "react";
import { Link } from "react-router-dom";
import setAuthToken from "../utils/setAuthtoken";
import axios from "axios";
import katakana from "../katakana.json";
import hiragana from "../hiragana.json";

export class FillInTheBlankKana extends Component {
  state = {
    language: this.props.history.location.state.language,
    languageArray: [],
    answer: {},
    user: {},
    userAnswer: "",
    currentStreak: 0,
    highestStreak: 0,
    rightOrWrong: ""
  };

  componentWillMount() {
    // Grabs user Information
    const token = localStorage.getItem("example-app");

    if (token) {
      setAuthToken(token);
    }

    axios
      .get("api/user")
      .then(response => {
        console.log(response.data);
        this.setState({
          user: response.data,
          currentStreak:
            response.data[this.state.language].fillInTheBlank.current,
          highestStreak:
            response.data[this.state.language].fillInTheBlank.highest
        });
        console.log(this.state.highestStreak);
      })
      .catch(err => console.log(err.response));

    // Checks the language set by the user
    if (this.state.language === "katakana") {
      //Set the array to katakana.json
      let languageArray = katakana;
      //Sets a random object from katakana.json as the answer
      let answer =
        languageArray[Math.floor(Math.random() * languageArray.length)];

      this.setState({
        languageArray,
        answer
      });
    } else if (this.state.language === "hiragana") {
      //Sets the array to hiragana.json
      let languageArray = hiragana;
      //Sets a random object from katakana.json as the answer
      let answer =
        languageArray[Math.floor(Math.random() * languageArray.length)];

      this.setState({
        languageArray,
        answer
      });
    }
  }

  //if the form field value changes it sets this.state.userAnswer to that value
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  
  onClick = e => {
        //prevents the button from reloading the page

    e.preventDefault();

    //makes sure the user's answer is lowercase and the checks if it is the correct answer
    if (this.state.userAnswer.toLowerCase() === this.state.answer.roumaji) {
      // CORRECT ANSWER

      // Variable that adds 1 to the current streak
      let newStreak = (this.state.currentStreak += 1);
      console.log(newStreak);
      console.log(this.state);
      console.log(this.state.userAnswer);
      console.log(this.state.answer);
      //sets state to current streak
      this.setState({
        currentStreak: newStreak
      });

      //Checks if the streak is higher than the highest streak
      if (
        newStreak > this.state.user[this.state.language].fillInTheBlank.highest
      ) {
        //sets state to highest streak
        this.setState({
          highestStreak: newStreak
        });

        console.log(this.currentStreak);
        //New variable to send the new streak information with a put
        let updatedUser = {
          katakana: {
            fillInTheBlank: {
              highest: newStreak,
              current: this.state.currentStreak
            }
          }
        };

        //if the highest streak is more than the highest streak in the database (which it already should be) it sends a put request

        axios
          .put("api/user", updatedUser)
          .then(res => console.log("highest", updatedUser))
          .catch(err => console.log(err));
      } else {
        let updatedUser = {
          katakana: {
            fillInTheBlank: {
              highest: this.state.highestStreak,
              current: this.state.currentStreak
            }
          }
        };

        axios
          .put("api/user", updatedUser)
          .then(res => console.log("worked"))
          .catch(err => console.log(err));
      }

      // //Sets the current streak with the updated streak (not highest just current)
      // this.setState({
      //   currentStreak: newStreak
      // });
    } else {
      //WRONG ANSWER

      //Sets current streak to 0
      this.setState({
        currentStreak: 0,
        rightOrWrong: "You got it wrong!"
      });

      let updatedUser = {
        katakana: {
          fillInTheBlank: {
            highest: this.state.highestStreak,
            current: 0
          }
        }
      };

      axios
        .put("api/user", updatedUser)
        .then(res => console.log("wrong"))
        .catch(err => console.log(err));
      console.log(this.state.streak);
    }
    
    
  };
  modalClose = e => {
    // reloads the page
    window.location.reload(false);
  };
  render() {
    //Styling
    const style = {
      main: {
        textAlign: "center",
        marginTop: "25vh"
      }
    };
    return (
      <div style={style.main}>
        <Link
          to={{
            pathname: "language-dashboard",
            state: { language: this.state.language }
          }}
        >
          <i className="material-icons back-button">arrow_back</i>
        </Link>

        <div className="streak">
          <h3>Highest Streak: {this.state.highestStreak}</h3>
          <h3>Current Streak: {this.state.currentStreak}</h3>
        </div>
        {/* Answer */}
        <h1>{this.state.answer.kana}</h1>

        <div className="container">
          {/* Fill in the blank form field */}
          <form onSubmit={this.onSubmit}>
            <div class="row">
              <div className="input-field col s6 m4 offset-m4 offset-s3">
                <input
                  id="user-guess"
                  name="userAnswer"
                  type="text"
                  className="validate"
                  onChange={this.onChange}
                />
                <label className="active" for="user-guess">
                  Your Answer
                </label>
                <button
                onClick={this.onClick}
                  style={style.button}
                  type="submit"
                  className="modal-trigger"
                  href="#modal1"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* MODAL */}

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>{this.state.rightOrWrong}</h4>
            <p>You chose {this.state.userAnswer}</p>
            <p>The correct answer was {this.state.answer.roumaji}</p>
          </div>
          <div className="modal-footer">
            <a
              onClick={this.modalClose}
              className="modal-close waves-effect waves-green btn-flat"
            >
              Okay
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default FillInTheBlankKana;
