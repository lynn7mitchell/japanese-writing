import React, { Component } from 'react'
import Button from '../components/Button'

export class Home extends Component {
    render() {

        const style={
            textAlign: "center",
            marginTop: "25vh"
        }

        return (
            <div style={style}>
                <h1>Japanese Writing</h1>
                <h2>Learn Japanese Katakana, Hiragana, and Kanji</h2>
                <Button content={"Log In"}/> <Button content={"Sign Up"}/>
            </div>
        )
    }
}

export default Home
