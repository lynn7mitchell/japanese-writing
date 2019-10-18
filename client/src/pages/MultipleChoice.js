import React, { Component } from "react";
import katakana from "../katakana.json";
// import hiragana from "../hiragana.json"

export class MultipleChoice extends Component {
  state = {
    language: this.props.history.location.state.language,
    languageArray: [],
    answer: {},
    choices: []
  };

  componentDidMount() {
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
    } else if (this.state.language === "hiragana") {
      // arr = hiragana
    }
  }
  render() {
    const { language, languageArray, answer, choices } = this.state;
    let listedAnswers = [];

    // Answer to my problem was found at
    // https://stackoverflow.com/questions/36069870/how-to-remove-random-item-from-array-and-then-remove-it-from-array-until-array-i
    // then modified to add to the listedAnswers array before splicing
    for (var i = choices.length - 1; i >= 0; i--) {
      let index = Math.floor(Math.random() * choices.length);
      listedAnswers.push(choices[index]);
      choices.splice(index, 1);
      console.log(choices);
    }

    console.log(listedAnswers);
    const style = {
      main: {
        textAlign: "center",
        marginTop: "25vh"
      }
    };
    return (
      <div style={style.main}>
        <h1>{answer.kana}</h1>
        <div className="container">
          <div className="row">
            <div className="col s4 container-outline"></div>
            <div className="col s4 container-outline"></div>
          </div>
          <div className="row">
            <div className="col s4 container-outline"></div>
            <div className="col s4 container-outline"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default MultipleChoice;
