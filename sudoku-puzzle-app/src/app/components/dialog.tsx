import React from "react"

interface DialogProps extends React.PropsWithChildren<unknown> {
    onCloseButtonClick: () => void
}

export const Dialog: React.FunctionComponent<DialogProps> = props => {
    const { onCloseButtonClick } = props
    return (
        <div className="modal-wrapper">
            <div className="modal-overlay" />
            <div className="modal-body">
                <button className="modal-close" onClick={onCloseButtonClick}>
                    <i className="pz-icon-close" />
                </button>
                <article className="modal-content">
                    {props.children}
                </article>
            </div>  
        </div>
    )
}