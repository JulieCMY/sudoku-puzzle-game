import React from "react"
import "../css/toolbar.css"

export const ToolBar: React.FunctionComponent = () => {
    return (
        <div className="pz-game-toolbar pz-flex-row">
            <div className="su-toolbar-left">
                <button className="back-container">
                    <i className="back-arrow"/>
                    <span className="back-text">Back</span>
                </button>
            </div>    
            <div className="su-toolbar-center">
                <div className="su-level">Level 1</div>
                <div className="su-timer">
                    <span className="su-timer-text">36:05</span>
                    <div className="su-timer-pause">
                        <i className="timer-pause-icon"/>
                    </div>
                </div>
            </div>
            <div className="su-toolbar-right">
                <button className="pz-toolbar-button">
                    <i className="su-app-help"/>
                </button>
                <div className="pz-dropdown">
                    <button className="pz-toolbar-button">
                        <i className="su-app-kebab"/>
                    </button>
                </div>
            </div>         
        </div>
    )
}