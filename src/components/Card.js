import React, { Component } from 'react'
import katakana from './katakana.json'

export class Card extends Component {
    render() {
        return (
            <div>
                {katakana[0].kana}
            </div>
        )
    }
}

export default Card
