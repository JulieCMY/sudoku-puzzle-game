import React from "react"
import { connect } from "react-redux"
import { selectSudokuKeyboard, deleteSudokuInput, selectCandidateModeCheckbox, selectSudokuCandidate, selectShowHighlightedCellCheckbox } from "../action/sudoku"
import { sudokuBoardData } from "../data/sudokuData"
import { RootState } from "../models/state"
import { SwitchToggle } from "./switch_toggle"
import { Language } from "../models/config"
import { getTextByLanguage } from "../logic/language"
import { checkIsCellPrefilled, getSudokuRowColIndex } from "../logic/sudoku"

const keyboardInput: number[] = Array.from({ length: 9 }, (_, i) => i + 1)

enum KeyboardMode {
    NORMAL = "NORMAL",
    CANDIDATE = "CANDIDATE"
}

interface StateProps {
    isAutoCandidateModeOn: boolean
    isShowHighlightedCellOn: boolean
    selectedCellIndex?: number
    language: Language
}

interface DispatchProps {
    selectSudokuKeyboard: typeof selectSudokuKeyboard
    selectSudokuCandidate: typeof selectSudokuCandidate
    deleteSudokuInput: typeof deleteSudokuInput
    selectCandidateModeCheckbox: typeof selectCandidateModeCheckbox
    selectShowHighlightedCellCheckbox: typeof selectShowHighlightedCellCheckbox
}

interface KeyboardProps extends StateProps, DispatchProps {}

function mapStateToProps(state: RootState): StateProps {
    const { 
        sudoku: {
            isAutoCandidateModeOn,
            isShowHighlightedCellOn,
            selectedCellIndex
        },
        config: {
            language
        }
    } = state
    return {
        isAutoCandidateModeOn,
        isShowHighlightedCellOn,
        selectedCellIndex,
        language
    }
}

const KeyboardComponent: React.FunctionComponent<KeyboardProps> = (props) => {
    const {
        isAutoCandidateModeOn,
        isShowHighlightedCellOn,
        selectedCellIndex,
        language,
        selectSudokuKeyboard,
        selectSudokuCandidate,
        deleteSudokuInput,
        selectCandidateModeCheckbox,
        selectShowHighlightedCellCheckbox
    } = props
    const text = getTextByLanguage(language)
    const { sudokuId, sudokuData } = sudokuBoardData[0]
    const [ keyboardMode, setKeyboardMode ] = React.useState<KeyboardMode>(KeyboardMode.NORMAL)
    let isSelectedCellPrefilled = false
    if (selectedCellIndex !== undefined) {
        const { rowIndex, colIndex } = getSudokuRowColIndex(selectedCellIndex)
        isSelectedCellPrefilled = checkIsCellPrefilled(rowIndex, colIndex, sudokuData)
    }

    const onModeButtonClick = (mode: KeyboardMode): void => {
        setKeyboardMode(mode)
    }
    const onNumericButtonClick = (id: number, value: number): void => {
        if (!isSelectedCellPrefilled) {
            if (keyboardMode===KeyboardMode.NORMAL) {
                selectSudokuKeyboard(id, value)
            } else {
                selectSudokuCandidate(id, value)
            }
        }
    }

    return (
        <>
            <div className="su-divider" />
            <div className="keyboard">
                <SwitchToggle 
                    selectedValue={keyboardMode}
                    toggleValues={[KeyboardMode.NORMAL, KeyboardMode.CANDIDATE]}
                    toggleTexts={[text.normal,text.candidate]}
                    onClick={onModeButtonClick}
                />
                <div className="su-keyboard-container">
                    {keyboardInput.map((cell: number, index: number) => (
                        <div 
                            key={index} 
                            className="button numeric keyboard-numeric" 
                            onClick={(): void => {onNumericButtonClick(sudokuId, cell)}} 
                        >
                            <div 
                                className={`keyboard-svg key-${cell} ${isSelectedCellPrefilled && "key-disabled"} ${keyboardMode===KeyboardMode.CANDIDATE && `key-candidate key-candidate-${cell}`}`} 
                            />
                        </div>
                    ))}
                    <div 
                        key="delete" 
                        className="button numeric key-delete-container" 
                        onClick={(): void => {deleteSudokuInput(sudokuId)}}
                    >
                        <div className={`keyboard-svg ${isSelectedCellPrefilled && "key-disabled"} key-delete ${keyboardMode===KeyboardMode.CANDIDATE && "key-candidate-delete"}`} />
                    </div>
                </div>
                <div className="keyboard-auto" onClick={selectCandidateModeCheckbox}>
                    <input type="checkbox" checked={isAutoCandidateModeOn} className="keyboard-checkbox" />
                    <div>{text.autoCandidateMode}</div>
                </div>
                <div className="keyboard-auto" onClick={selectShowHighlightedCellCheckbox}>
                    <input type="checkbox" checked={isShowHighlightedCellOn} className="keyboard-checkbox" />
                    <div>{text.showHighlightedCell}</div>
                </div>
            </div>
        </>
    )
}

const dispatchActions = {
    selectSudokuKeyboard,
    selectSudokuCandidate,
    deleteSudokuInput,
    selectCandidateModeCheckbox,
    selectShowHighlightedCellCheckbox
}

export const Keyboard = connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    dispatchActions
)(KeyboardComponent)