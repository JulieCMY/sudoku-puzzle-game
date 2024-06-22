import React from "react"
import "../css/sudoku_board.css"
import { Cell } from "./cell"

export const Board: React.FunctionComponent = () => {
    const data: number[][] = [
        [0, 0, 8, 1, 9, 5, 6, 4, 0],
        [6, 5, 1, 0, 4, 0, 0, 8, 0],
        [2, 0, 0, 0, 0, 8, 0, 7, 1],
        [0, 0, 0, 7, 2, 9, 8, 0, 0],
        [0, 4, 0, 0, 5, 0, 0, 0, 3],
        [0, 6, 0, 0, 0, 0, 9, 5, 0],
        [7, 3, 5, 9, 0, 1, 0, 0, 0],
        [1, 2, 6, 4, 0, 0, 0, 0, 5],
        [0, 0, 0, 5, 0, 0, 1, 0, 6]
    ]

    const [selectedCellIndex, setSelectedCellIndex] = React.useState<number | null>(null)
    const onCellClick = (rowIndex: number, colIndex: number): void => {
        const selectedIndex = rowIndex * 9 + colIndex
        if (selectedCellIndex === selectedIndex) {
            setSelectedCellIndex(null)
        } else {
            setSelectedCellIndex(selectedIndex)
        }
    }

    return (
        <div className="board">
            {data.map((row: number[], rowIndex: number) => (
                <div key={rowIndex} className="row">
                    {row.map((cell: number, colIndex: number) => (
                        <Cell 
                            key={rowIndex * 9 + colIndex}
                            sudokuData={data}
                            value={cell}
                            selectedCellIndex={selectedCellIndex}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            onPress={onCellClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
