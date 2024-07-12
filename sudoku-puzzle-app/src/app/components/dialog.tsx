import React from "react"

export const Dialog: React.FunctionComponent<React.PropsWithChildren<unknown>> = props => {
    return (
        <div className="modal-wrapper">
            <div className="modal-overlay" />
            <div className="modal-body">
                <div className="modal-close">
                    <i className="pz-icon-close" />
                </div>
                <article className="modal-content">
                    {props.children}
                </article>
            </div>  
        </div>
    )
}