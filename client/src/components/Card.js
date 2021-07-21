import React from 'react'

export default function Card(props) {
    console.log(props.character)
    return (
        <div className="rounded-xl shadow-md text-center text-5xl border-4 pt-14 pb-14 w-40 mt-9 md:mx-5 hover:bg-blue-700 active:bg-green-700">
            {props.character}
        </div>
    )
}
