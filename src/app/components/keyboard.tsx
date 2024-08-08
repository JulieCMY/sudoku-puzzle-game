import React from "react"
import { connect } from "react-redux"
import { selectSudokuKeyboard, deleteSudokuInput, selectCandidateModeCheckbox, selectSudokuCandidate, selectShowHighlightedCellCheckbox } from "../action/sudoku"
import { sudokuBoardData } from "../data/sudokuData"
import { RootState } from "../models/state"
import { SwitchToggle } from "./switch_toggle"
import { Language } from "../models/config"
import { getTextByLanguage } from "../logic/language"
import { checkIsCellPrefilled, checkIsKeyNumberCompleted, getSudokuRowColIndex, processSudokuPlayerData } from "../logic/sudoku"
import { NumberIcon } from "./number_icon"

const keyboardInput: number[] = Array.from({ length: 9 }, (_, i) => i + 1)

enum KeyboardMode {
    NORMAL = "NORMAL",
    CANDIDATE = "CANDIDATE"
}

interface StateProps {
    playerData: number[][]
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
    const { sudokuId, sudokuData} = sudokuBoardData[0]
    const { 
        sudoku: {
            playerStats,
            revealedCells,
            isAutoCandidateModeOn,
            isShowHighlightedCellOn,
            selectedCellIndex
        },
        config: {
            language
        }
    } = state
    const currentSudokuPlayerStats = playerStats[sudokuId] ?? {}
    const currectRevealedData = revealedCells[sudokuId] ?? []
    const playerData = processSudokuPlayerData(sudokuData, currentSudokuPlayerStats, currectRevealedData)
    return {
        playerData,
        isAutoCandidateModeOn,
        isShowHighlightedCellOn,
        selectedCellIndex,
        language
    }
}

const KeyboardComponent: React.FunctionComponent<KeyboardProps> = (props) => {
    const {
        playerData,
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
    const checkIsKeyNumberDisabled = (keyValue: number): boolean => {
        return isSelectedCellPrefilled || checkIsKeyNumberCompleted(keyValue, playerData)
    }
    const onNumericButtonClick = (id: number, keyValue: number): void => {
        if (!checkIsKeyNumberDisabled(keyValue)) {
            if (keyboardMode===KeyboardMode.NORMAL) {
                selectSudokuKeyboard(id, keyValue)
            } else {
                selectSudokuCandidate(id, keyValue)
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
                                className={`keyboard-svg ${keyboardMode===KeyboardMode.CANDIDATE && `key-candidate key-candidate-${cell}`}`} 
                            >
                                <NumberIcon 
                                    value={cell} 
                                    isBold={!checkIsKeyNumberDisabled(cell)}
                                    fillColour={checkIsKeyNumberDisabled(cell) ? "#959595" : undefined}
                                />
                            </div>
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