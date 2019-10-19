import React, { Component } from "react";
import katakana from "../katakana.json";
import hiragana from "../hiragana.json";

export class FillInTheBlankKana extends Component {
  state = {
    language: this.props.history.location.state.language,
    languageArray: [],
    answer: {}
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
          <form>
            <div class="row">
              <div className="input-field col s6 m4 offset-m4 offset-s3">
                <input
                  id="user-guess"
                  name="user-guess"
                  type="text"
                  className="validate"
                />
                <label className="active" for="user-guess">
                  Your Answer
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FillInTheBlankKana;
