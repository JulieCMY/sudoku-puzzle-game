export const SwitchToggle: React.FunctionComponent<{
    selectedValue: any,
    toggleValues: any[],
    toggleTexts: string[],
    onClick: (value: any) => void
}> = (props) => {
    const {
        selectedValue,
        toggleValues,
        toggleTexts,
        onClick
    } = props
    return (
        <div>
            <button 
                type="button"
                onClick={(): void => {onClick(toggleValues[0])}}  
                className={`keyboard-mode normalMode ${selectedValue===toggleValues[0] && "keyboard-mode-selected"}`}
            >
                {toggleTexts[0]}
            </button>
            <button 
                type="button"
                onClick={(): void => {onClick(toggleValues[1])}} 
                className={`keyboard-mode candidateMode ${selectedValue===toggleValues[1] && "keyboard-mode-selected"}`}
            >
                {toggleTexts[1]}
            </button>
        </div>
    )
}