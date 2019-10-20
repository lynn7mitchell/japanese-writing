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
    listedAnswers: [],
    currentStreak: 0,
    highestStreak: 0
  };

  

  componentWillMount() {
    const token = localStorage.getItem("example-app");

    if (token) {
      setAuthToken(token);
    }

    axios
      .get("api/user")
      .then(response => {
        this.setState({
          user: response.data,
          highestStreak: response.data.katakana.multipleChoice.highest
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
      });    }
  }


  onClick = e =>{
    let userAnswer = e.target.innerHTML

    if(userAnswer === this.state.answer.roumaji){
      console.log("true")
    }else if(userAnswer !== this.state.roumaji){
      console.log("false")
    }
  }

  
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
        <h1>{this.state.answer.kana}</h1>
        <div className="container">
          <div className="row">
            <div className="col s4 container-outline" name={this.state.listedAnswers[0].roumaji} onClick={this.onClick}>
                {console.log(this.state.listedAnswers)}
              {this.state.listedAnswers[0].roumaji}
            </div>
            <div className="col s4 container-outline" name={this.state.listedAnswers[1].roumaji} onClick={this.onClick}>
              {this.state.listedAnswers[1].roumaji}
            </div>
          </div>
          <div className="row">
            <div className="col s4 container-outline" name={this.state.listedAnswers[2].roumaji} onClick={this.onClick}>
              {this.state.listedAnswers[2].roumaji}
            </div>
            <div className="col s4 container-outline" name={this.state.listedAnswers[3].roumaji} onClick={this.onClick}>
              {this.state.listedAnswers[3].roumaji}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MultipleChoiceKana;
