export type DialogActions =
    | ReturnType<typeof showCompletePuzzleDialog>
    | ReturnType<typeof dismissCompletePuzzleDialog>
    | ReturnType<typeof showHowToPlayDialog>
    | ReturnType<typeof dismissHowToPlayDialog>

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

export const showHowToPlayDialog = () => {
    return {
        type: "SHOW_HOW_TO_PLAY_DIALOG"
    } as const
}

export const dismissHowToPlayDialog = () => {
    return {
        type: "DISMISS_HOW_TO_PLAY_DIALOG"
    } as const
}