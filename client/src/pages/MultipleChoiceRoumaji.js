import React, { Component } from "react";
import setAuthToken from "../utils/setAuthtoken";
import axios from "axios";
import katakana from "../katakana.json";
import hiragana from "../hiragana.json";

export class MultipleChoiceKana extends Component {
  state = {
    language: this.props.history.location.state.language,
    languageArray: [],
    answer: {},
    choices: [],
    listedAnswers: []
  };

  componentWillMount() {
    const token = localStorage.getItem("example-app");

    if (token) {
      setAuthToken(token);
    }

    axios
      .get("api/user")
      .then(response => {
        console.log(response.data)
        this.setState({
          user: response.data,
          highestStreak: response.data[this.state.language].multipleChoice.highest,
          currentStreak: response.data[this.state.language].multipleChoice.current,
        });
      })
      .catch(err => console.log(err.response));

    if (this.state.language === "katakana") {
      let languageArray = katakana;
      let answer =
        languageArray[Math.floor(Math.random() * languageArray.length)];
      let choices = [];

      choices.push(answer);

      for (let i = 0; i < 3; i++) {
        let choice;
        const choiceFunction = () => {
          choice =
            languageArray[Math.floor(Math.random() * languageArray.length)];
        };

        choiceFunction();

        if (choice === answer) {
          i--
          choiceFunction();
        } else {
          choices.push(choice);
        }
      }

      this.setState({
        languageArray,
        answer,
        choices
      });

      //   const { language, languageArray, answer, choices } = this.state;
      let listedAnswers = [];

      // Answer to my problem was found at
      // https://stackoverflow.com/questions/36069870/how-to-remove-random-item-from-array-and-then-remove-it-from-array-until-array-i
      // then modified to add to the listedAnswers array before splicing
      for (var i = choices.length - 1; i > -1; i--) {
        let index = Math.floor(Math.random() * choices.length);
        listedAnswers.push(choices[index]);
        choices.splice(index, 1);
        //   console.log(choices);
      }

      console.log(listedAnswers);

      this.setState({
        listedAnswers
      });
    } else if (this.state.language === "hiragana") {
      let languageArray = hiragana;
      let answer =
        languageArray[Math.floor(Math.random() * languageArray.length)];
      let choices = [];

      choices.push(answer);

      for (let i = 0; i < 3; i++) {
        let choice;
        const choiceFunction = () => {
          choice =
            languageArray[Math.floor(Math.random() * languageArray.length)];
        };

        choiceFunction();

        if (choice === answer) {
          choiceFunction();
        } else {
          choices.push(choice);
        }
      }

      this.setState({
        languageArray,
        answer,
        choices
      });

      //   const { language, languageArray, answer, choices } = this.state;
      let listedAnswers = [];

      // Answer to my problem was found at
      // https://stackoverflow.com/questions/36069870/how-to-remove-random-item-from-array-and-then-remove-it-from-array-until-array-i
      // then modified to add to the listedAnswers array before splicing
      for (var i = choices.length - 1; i >= 0; i--) {
        let index = Math.floor(Math.random() * choices.length);
        listedAnswers.push(choices[index]);
        choices.splice(index, 1);
        //   console.log(choices);
      }

      console.log(listedAnswers);

      this.setState({
        listedAnswers
      });
    }
  }
  onClick = e => {
    let userAnswer = e.target.innerHTML;

    if (userAnswer === this.state.answer.kana) {
      console.log("true");
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
        newStreak > this.state.user[this.state.language].multipleChoice.highest
      ) {
        //sets state to highest streak
        this.setState({
          highestStreak: newStreak
        });

        console.log(this.currentStreak);
        //New variable to send the new streak information with a put
        let updatedUser = {
          katakana: {
            multipleChoice: {
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
            multipleChoice: {
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
    } else if (userAnswer !== this.state.kana) {
      console.log("false");
      //WRONG ANSWER

      //Sets current streak to 0
      this.setState({
        currentStreak: 0
      });

      let updatedUser = {
        katakana: {
          multipleChoice: {
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

    // reloads the page
    window.location.reload(false);
  };

  render() {
    const style = {
      main: {
        textAlign: "center",
        marginTop: "25vh"
      }
    };
    return (
      <div style={style.main}>
        <div className="streak">
          <h3>Highest Streak: {this.state.highestStreak}</h3>
          <h3>Current Streak: {this.state.currentStreak}</h3>
        </div>
        <h1>{this.state.answer.roumaji}</h1>
        <div className="container">
          <div className="row">
            <div
              className="col s4 container-outline"
              name={this.state.listedAnswers[0].kana}
              onClick={this.onClick}

            >
              {console.log(this.state.listedAnswers)}
              {this.state.listedAnswers[0].kana}
            </div>
            <div
              className="col s4 container-outline"
              name={this.state.listedAnswers[1].kana}
              onClick={this.onClick}

            >
              {this.state.listedAnswers[1].kana}
            </div>
          </div>
          <div className="row">
            <div
              className="col s4 container-outline"
              name={this.state.listedAnswers[2].kana}
              onClick={this.onClick}

            >
              {this.state.listedAnswers[2].kana}
            </div>
            <div
              className="col s4 container-outline"
              name={this.state.listedAnswers[3].kana}
              onClick={this.onClick}
            >
              {this.state.listedAnswers[3].kana}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MultipleChoiceKana;
