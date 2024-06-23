import React from "react"

export const Keyboard: React.FunctionComponent = () => {
    const keyboardInput: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    return (
        <div className="keyboard">
            {keyboardInput.map((row: number[], rowIndex: number) => (
                <div key={rowIndex} className="row">
                    {
                        row.map((cell: number, colIndex: number) => (
                            <div key={colIndex} className="button numberic">
                                <div className={`keyboard-svg key-${cell}`} />
                            </div>
                        ))
                    }
                </div>
            ))}
            <div key="delete" className="button delete" />
        </div>
    )
}