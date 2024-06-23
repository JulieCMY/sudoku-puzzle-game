import React from "react"
import { Board } from "./board"
import { Keyboard } from "./keyboard"
import "../css/body.css"
import "../css/board.css"
import "../css/keyboard.css"
import "../css/candidate.css"

export const Sudoku: React.FunctionComponent = () => {
    return (
        <div className="body">
            <Board />
            <div className="control">
                <Keyboard /> 
            </div>         
        </div>
    )

}