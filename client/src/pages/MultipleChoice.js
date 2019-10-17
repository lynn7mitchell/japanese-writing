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
      let answer = languageArray[Math.floor(Math.random() * languageArray.length)]
      let choices= [];

      choices.push(answer)

      for(let i = 0; i < 3; i++){
        let choice;
        const choiceFunction = () =>{
            choice = languageArray[Math.floor(Math.random() * languageArray.length)]
        }

        choiceFunction()

        if(choice === answer){
            choiceFunction()
        }else{
            choices.push(choice)
        }
        
    }
            
      this.setState({
          languageArray,
          answer,
          choices

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
