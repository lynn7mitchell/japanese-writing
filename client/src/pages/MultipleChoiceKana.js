import React, { Component } from "react";
import katakana from "../katakana.json";
// import hiragana from "../hiragana.json"

export class MultipleChoiceKana extends Component {
  state = {
    language: this.props.history.location.state.language,
    languageArray: [],
    answer: {},
    choices: [],
    listedAnswers: []
  };

  componentWillMount() {
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
      // arr = hiragana
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
        <h1>{this.state.answer.kana}</h1>
        <div className="container">
          <div className="row">
            <div className="col s4 container-outline" name={this.state.listedAnswers[0].roumaji}>
                {console.log(this.state.listedAnswers)}
              {this.state.listedAnswers[0].roumaji}
            </div>
            <div className="col s4 container-outline" name={this.state.listedAnswers[1].roumaji}>
              {this.state.listedAnswers[1].roumaji}
            </div>
          </div>
          <div className="row">
            <div className="col s4 container-outline" name={this.state.listedAnswers[2].roumaji}>
              {this.state.listedAnswers[2].roumaji}
            </div>
            <div className="col s4 container-outline" name={this.state.listedAnswers[3].roumaji}>
              {this.state.listedAnswers[3].roumaji}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MultipleChoiceKana;
