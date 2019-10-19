import React, { Component } from "react";
import setAuthToken from "../utils/setAuthtoken";
import axios from "axios"
import katakana from "../katakana.json";
import hiragana from "../hiragana.json";

export class FillInTheBlankKana extends Component {
  state = {
    language: this.props.history.location.state.language,
    languageArray: [],
    answer: {},
    user: {},
    userAnswer: "",
    streak: 0,
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
          highestStreak: response.data.katakana.fillInTheBlank.highest
        });
      })
      .catch(err => console.log(err.response));

    if (this.state.language === "katakana") {
      let languageArray = katakana;
      let answer =
        languageArray[Math.floor(Math.random() * languageArray.length)];


      this.setState({
        languageArray,
        answer,
        // heightStreak: this.state.user.katakana.fillInTheBlank.heightStreak
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


    let updatedUser = {
        katakana:{
            fillInTheBlank:{
                highest:this.state.streak
            }
        },
    }

    if(this.state.streak > this.state.user.katakana.fillInTheBlank.highest){
        axios.put("api/user", updatedUser)
        .then(res => console.log("worked"))
        .catch(err => console.log(err))
    }
    
    // reloads the page
    window.location.reload(false);

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
          <h3>{this.state.highestStreak}</h3>
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
