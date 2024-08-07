import React from "react"
import { ToolBar } from "./toolbar"
import { Board } from "./board"
import { Keyboard } from "./keyboard"
import { DialogCompletePuzzle } from "./dialog/dialog_complete_puzzle"
import "../css/body.css"
import "../css/board.css"
import "../css/keyboard.css"
import "../css/candidate.css"
import "../css/dialog.css"
import "../css/toolbar.css"
import { DialogHowToPlay } from "./dialog/dialog_how_to_play"

export const Sudoku: React.FunctionComponent = () => {
    return (
        <div className="pz-game-wrapper">
            <ToolBar />
            <div className="board-square">
                <Board />
                <div className="board-control">
                    <Keyboard /> 
                </div>        
            </div>
            <DialogCompletePuzzle />
            <DialogHowToPlay />
        </div>
    )
}