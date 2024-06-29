import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectSudokuCell } from "../action/sudoku"
import { Cell } from "./cell"
import { findDuplicateCellIndex, getSudokuCellIndex, processSudokuPlayerData } from "../logic/sudoku"
import { SudokuState } from "../models/sudoku"
import { mockData } from "../data/mockData"

export const Board: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const { sudokuId: id, sudokuData: data} = mockData[0]

    const selectedCellIndex = useSelector((state: SudokuState) => state.selectedCellIndex)
    const playerStats = useSelector((state: SudokuState) => state.playerStats)
    const currentSudokuPlayerStats = playerStats[id] ?? {}
    const playerData = processSudokuPlayerData(data, currentSudokuPlayerStats)
    const duplicatedCellIndexList = findDuplicateCellIndex(playerData)

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
                            playerData={playerData}
                            sudokuId={id}
                            isConflict={duplicatedCellIndexList.includes(getSudokuCellIndex(rowIndex, colIndex))}
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
