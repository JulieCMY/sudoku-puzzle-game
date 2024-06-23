import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectSudokuCell } from "../action/sudoku"
import { Cell } from "./cell"
import { getSudokuCellIndex, processSudokuPlayerData } from "../logic/sudoku"
import { SudokuState } from "../models/sudoku"

export const Board: React.FunctionComponent = () => {
    const dispatch = useDispatch()
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

    const selectedCellIndex = useSelector((state: SudokuState) => state.selectedCellIndex)
    const playerStats = useSelector((state: SudokuState) => state.playerStats)
    const currentSudokuPlayerStats = playerStats[1] ?? {}
    const playerData = processSudokuPlayerData(data, currentSudokuPlayerStats)

    const onCellClick = (rowIndex: number, colIndex: number): void => {
        const selectedIndex = getSudokuCellIndex(rowIndex, colIndex)
        if (selectedCellIndex !== selectedIndex) {
            dispatch(selectSudokuCell(selectedIndex))
        }
    }

    return (
        <div className="board">
            {playerData.map((row: number[], rowIndex: number) => (
                <div key={rowIndex} className="row">
                    {row.map((cell: number, colIndex: number) => (
                        <Cell 
                            key={getSudokuCellIndex(rowIndex, colIndex)}
                            sudokuData={data}
                            value={cell}
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
