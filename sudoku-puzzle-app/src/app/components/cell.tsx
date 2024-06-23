import React from "react"
import { useSelector } from "react-redux"
import { Candidate } from "./candidate"
import { SudokuState } from "../reducer/sudoku"
import { getSudokuCellIndex } from "../logic/sudoku"
import "../css/board.css"
import "../css/keyboard.css"

export const Cell: React.FunctionComponent<{
    sudokuData: number[][],
    value: number,
    rowIndex: number,
    colIndex: number,
    onPress: (rowIndex: number, colIndex: number) => void
}> = ({
    sudokuData,
    value,
    rowIndex,
    colIndex,
    onPress
}) => {
    const selectedCellIndex = useSelector((state: SudokuState) => state.selectedCellIndex)
    const initialCellValue = sudokuData[rowIndex][colIndex]
    const isCellPrefilled = !!initialCellValue
    const isCellSelected = selectedCellIndex === getSudokuCellIndex(rowIndex, colIndex)
    const shouldShowBottomBorder = ((rowIndex + 1) % 3 === 0 && rowIndex !== 8)
    const shouldShowRightBorder = ((colIndex + 1) % 3 === 0 && colIndex !== 8)
    const onCellClick = () => {
        if (!isCellPrefilled) {
            onPress(rowIndex, colIndex)
        }
    }
    return (
        <div 
            key={colIndex}
            onClick={onCellClick}
            className={`cell-container 
                ${isCellPrefilled ? "prefilled" : ""}
                ${isCellSelected ? "selected" : ""}
                ${shouldShowBottomBorder ? "cell-container-bottom-border" :""} 
                ${shouldShowRightBorder? "cell-container-right-border" : ""}`}
        >
            {
                !!value ? (
                    <div key={colIndex} className="numberic">
                        <div className={`keyboard-svg key-${value}`} />
                    </div>
                ) : (
                    <div key={colIndex}>
                        {
                            isCellSelected && (
                                <Candidate />
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}