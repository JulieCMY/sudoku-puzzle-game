import React from "react"
import "../css/board.css"
import "../css/keyboard.css"
import { Candidate } from "./candidate"

export const Cell: React.FunctionComponent<{
    sudokuData: number[][],
    value: number,
    selectedCellIndex: number | null,
    rowIndex: number,
    colIndex: number,
    onPress: (rowIndex: number, colIndex: number) => void
}> = ({
    sudokuData,
    value,
    selectedCellIndex,
    rowIndex,
    colIndex,
    onPress
}) => {
    const initialCellValue = sudokuData[rowIndex][colIndex]
    const isCellPrefilled = !!initialCellValue
    const isCellSelected = selectedCellIndex === rowIndex * 9 + colIndex
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