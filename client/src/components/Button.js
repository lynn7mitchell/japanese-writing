import React from 'react'

export default function Button(content) {
    const style={
        boxSizing: "border-box",
        border: " solid .5px #fff",
        background: "transparent",
        borderRadius: "8px",
        padding: "8px"
    }
    return (
        <button style={style}>
            {content.content}
        </button>
    )
}
