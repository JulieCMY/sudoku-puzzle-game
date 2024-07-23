export type DialogActions =
    | ReturnType<typeof showCompletePuzzleDialog>
    | ReturnType<typeof dismissCompletePuzzleDialog>

export const showCompletePuzzleDialog = () => {
    return {
        type: "SHOW_COMPLETE_PUZZLE_DIALOG"
    } as const
}

export const dismissCompletePuzzleDialog = () => {
    return {
        type: "DISMISS_COMPLETE_PUZZLE_DIALOG"
    } as const
}