import React from "react"
import { useOutsideClick } from "../utils/common"
import { connect } from "react-redux"
import { selectDropdownRevealPuzzle, selectDropdownResetPuzzle, selectDropdownRevealCell, selectDropdownCheckCell, selectDropdownCheckPuzzle } from "../action/sudoku"
import { sudokuBoardData } from "../data/sudokuData"
import { RootState } from "../models/state"
import { Language } from "../models/config"
import { getTextByLanguage } from "../logic/language"
import { showHowToPlayDialog } from "../action/dialog"

interface StateProps {
    shouldRevealPuzzle: boolean
    language: Language
}

interface DispatchProps {
    selectDropdownCheckCell: typeof selectDropdownCheckCell
    selectDropdownCheckPuzzle: typeof selectDropdownCheckPuzzle
    selectDropdownRevealCell: typeof selectDropdownRevealCell
    selectDropdownRevealPuzzle: typeof selectDropdownRevealPuzzle
    selectDropdownResetPuzzle: typeof selectDropdownResetPuzzle
    showHowToPlayDialog: typeof showHowToPlayDialog
}

interface ToolBardProps extends StateProps, DispatchProps {}

function mapStateToProps(state: RootState): StateProps {
    const { 
        sudoku: {
            shouldRevealPuzzle
        },
        config: {
            language
        }
    } = state
    return {
        shouldRevealPuzzle,
        language
    }
}

const ToolBarComponent: React.FunctionComponent<ToolBardProps> = (props) => {
    const {
        shouldRevealPuzzle,
        language,
        selectDropdownCheckCell,
        selectDropdownCheckPuzzle,
        selectDropdownRevealCell,
        selectDropdownRevealPuzzle,
        selectDropdownResetPuzzle,
        showHowToPlayDialog
    } = props
    const text = getTextByLanguage(language)
    const { sudokuId } = sudokuBoardData[0]
    const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false)

    const dropdown = shouldRevealPuzzle ? [
        {
            text: text.resetPuzzle,
            onClick: (): void => { selectDropdownResetPuzzle(sudokuId) }
        }
    ] :[
        {
            text: text.hint,
            onClick: (): void => {}
        },
        {
            text: text.checkCell,
            onClick: (): void => { selectDropdownCheckCell(sudokuId) }
        },
        {
            text: text.checkPuzzle,
            onClick: (): void => { selectDropdownCheckPuzzle(sudokuId) }
        },
        {
            text: text.revealCell,
            onClick: (): void => { selectDropdownRevealCell(sudokuId) }
        },
        {
            text: text.revealPuzzle,
            onClick: (): void => { selectDropdownRevealPuzzle(sudokuId) }
        },
        {
            text: text.resetPuzzle,
            onClick: (): void => { selectDropdownResetPuzzle(sudokuId) }
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
                    <span className="back-text">{text.back}</span>
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
                <button className="pz-toolbar-button" onClick={showHowToPlayDialog}>
                    <i className="su-app-help"/>
                </button>
            </div>         
        </div>
    )
}

const dispatchActions = {
    selectDropdownCheckCell,
    selectDropdownCheckPuzzle,
    selectDropdownRevealCell,
    selectDropdownRevealPuzzle,
    selectDropdownResetPuzzle,
    showHowToPlayDialog
}

export const ToolBar = connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    dispatchActions
)(ToolBarComponent)