import React from "react"
import { Icon } from "./icon"

export const Candidate: React.FunctionComponent = () => {
    const candidateInput: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    return (
        <div className="candidate">
            {candidateInput.map((row: number[], rowIndex: number) => (
                <div key={rowIndex} className="row">
                    {
                        row.map((cell: number, colIndex: number) => (
                            <div key={colIndex} className="candidate-button">
                                <Icon value={cell}/>
                            </div>
                        ))
                    }
                </div>
            ))}
        </div>
    )
}