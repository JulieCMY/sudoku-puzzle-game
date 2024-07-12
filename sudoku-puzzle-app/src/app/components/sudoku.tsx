import React from "react"
import { ToolBar } from "./toolbar"
import { Board } from "./board"
import { Keyboard } from "./keyboard"
import { Dialog } from "./dialog"
import "../css/body.css"
import "../css/board.css"
import "../css/keyboard.css"
import "../css/candidate.css"
import "../css/dialog.css"
import "../css/toolbar.css"

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
            <Dialog>
                <i className="su-modal-star" />
                <h1 className="modal-system-header">Congrats!</h1>
                <p className="modal-system-subheader">You finished a <span className="highlight">medium</span> puzzle in 7:49.</p>
            </Dialog>
        </div>
    )
}