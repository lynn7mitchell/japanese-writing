import React, { Component } from "react";
import { Link } from "react-router-dom"

export class Home extends Component {
  render() {
    const style = {
      main: {
        textAlign: "center",
        marginTop: "25vh"
      },
      button:{
          marginLeft: "10%",
          marginRight: "10%",
          marginTop: "10%"
      }
    };


    return (
      <div style={style.main}>
        <h1>Japanese Writing</h1>
        <h2>Learn Japanese Katakana, Hiragana, and Kanji</h2>
        <Link to={"/login"}><button style={style.button}>Log In</button></Link>
        <Link to={"/signup"}><button style={style.button} > Sign Up</button></Link>
      </div>
    );
  }
}

export default Home;
