import React, { Component } from "react";
import katakana from "../katakana.json";
// import hiragana from "../hiragana.json"

export class MultipleChoice extends Component {
  state = {
    language: this.props.history.location.state.language,
    languageArray: [],
    answer: {}

  };

  componentDidMount() {
      


    if (this.state.language === "katakana") {
      let languageArray = katakana;
      let answer = languageArray[Math.floor(Math.random() * languageArray.length)]
      console.log("hello",answer)

      this.setState({
          languageArray,
          answer
      })
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
        <h1>A</h1>
        <div className="container">
          <div className="row">
            <div className="col s4 container-outline">A</div>
            <div className="col s4 container-outline">A</div>
          </div>
          <div className="row">
            <div className="col s4 container-outline">A</div>
            <div className="col s4 container-outline">A</div>
          </div>
        </div>
      </div>
    );
  }
}

export default MultipleChoice;
