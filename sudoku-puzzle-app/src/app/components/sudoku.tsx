import React from "react"
import { Board } from "./board"
import { Keyboard } from "./keyboard"
import "../css/sudoku_body.css"

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