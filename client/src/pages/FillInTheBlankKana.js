import React, { Component } from "react";
import katakana from "../katakana.json";
import hiragana from "../hiragana.json";
import { userInfo } from "os";

export class FillInTheBlankKana extends Component {
  state = {
    language: this.props.history.location.state.language,
    languageArray: [],
    answer: {},
    userAnswer: ""
  };

  componentWillMount() {
    if (this.state.language === "katakana") {
      let languageArray = katakana;
      let answer =
        languageArray[Math.floor(Math.random() * languageArray.length)];

      this.setState({
        languageArray,
        answer
      });
    } else if (this.state.language === "hiragana") {
      let languageArray = hiragana;
      let answer =
        languageArray[Math.floor(Math.random() * languageArray.length)];

      this.setState({
        languageArray,
        answer
      });
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
 onSubmit = e => {
     e.preventDefault()
    
     if(this.state.userAnswer.toLowerCase() === this.state.answer.roumaji )  {
         console.log("Your answer " + this.state.userAnswer , "correct answer " + this.state.answer.roumaji, "correct")
     }else{
        console.log("Your answer " + this.state.userAnswer , "correct answer " + this.state.answer.roumaji, "false")
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
                <button style={style.button} type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FillInTheBlankKana;
