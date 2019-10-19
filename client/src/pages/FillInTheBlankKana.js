import React, { Component } from "react";
import axios from "axios"
import katakana from "../katakana.json";
import hiragana from "../hiragana.json";

export class FillInTheBlankKana extends Component {
  state = {
    language: this.props.history.location.state.language,
    languageArray: [],
    answer: {},
    userAnswer: "",
    streak: 0
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
         let newStreak = this.state.streak += 1
         this.setState({
            streak: newStreak
         })
         console.log(this.state.streak)
     }else{
        console.log("Your answer " + this.state.userAnswer , "correct answer " + this.state.answer.roumaji, "false")
         this.setState({
            streak: 0
         })
         console.log(this.state.streak)

    }

    axios.put("api/user", this.state.streak)
    .then(res => console.log("worked"))
    .catch(err => console.log(err))
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
