import React from "react"
import "../css/toolbar.css"
import { useOutsideClick } from "../utils/common"
import { useDispatch, useSelector } from "react-redux"
import { selectDropdownRevealPuzzle, selectDropdownResetPuzzle, selectDropdownRevealCell } from "../action/sudoku"
import { SudokuState } from "../models/sudoku"

export const ToolBar: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const shouldRevealPuzzle = useSelector((state: SudokuState) => state.shouldRevealPuzzle)
    const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false)

    const dropdown = shouldRevealPuzzle ? [
        {
            text: "Reset Puzzle",
            onClick: (): void => { dispatch(selectDropdownResetPuzzle()) }
        }
    ] :[
        {
            text: "Hint",
            onClick: (): void => {}
        },
        {
            text: "Check Cell",
            onClick: (): void => {}
        },
        {
            text: "Check Puzzle",
            onClick: (): void => {}
        },
        {
            text: "Reveal Cell",
            onClick: (): void => { dispatch(selectDropdownRevealCell()) }
        },
        {
            text: "Reveal Puzzle",
            onClick: (): void => { dispatch(selectDropdownRevealPuzzle()) }
        },
        {
            text: "Reset Puzzle",
            onClick: (): void => { dispatch(selectDropdownResetPuzzle()) }
        }
    ]

    const onDropdownClick = (): void => {
        setIsDropdownOpen(!isDropdownOpen)
    }
    const dropdownRef = useOutsideClick(onDropdownClick)

    return (
        <div className="pz-game-toolbar pz-flex-row">
            <div className="su-toolbar-left">
                <button className="back-container">
                    <i className="back-arrow"/>
                    <span className="back-text">Back</span>
                </button>
            </div>    
            <div className="su-toolbar-center">
                <div className="su-level">Level 1</div>
                <div className="su-timer">
                    <span className="su-timer-text">36:05</span>
                    <div className="su-timer-pause">
                        <i className="timer-pause-icon"/>
                    </div>
                </div>
            </div>
            <div className="su-toolbar-right">
                <div className="pz-dropdown">
                    <button className="pz-toolbar-button pz-toolbar-dropdown-button" onClick={onDropdownClick}>
                        <i className="su-app-kebab"/>
                    </button>
                    {
                        isDropdownOpen && (
                            <nav className="pz-dropdown-list" ref={dropdownRef}>
                                <ul>
                                    {
                                        dropdown.map((item, index) => (
                                            <li className="pz-dropdown-menu-item" key={`pz-dropdown-item-${index}`}>
                                                <button 
                                                    onClick={item.onClick}
                                                    className={`pz-dropdown-button ${index !== 0 && "pz-dropdown-button-border"}`}
                                                >{item.text}</button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </nav>
                        )
                    }
                </div>
                <button className="pz-toolbar-button">
                    <i className="su-app-help"/>
                </button>
            </div>         
        </div>
    )
}