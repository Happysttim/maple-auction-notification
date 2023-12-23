import React from "react";

const PanelBoxStyle = {
    width: "270px",
    height: "100%",
    backgroundColor: "black",
    zIndex: "9999",
    position: "relative" as const,
    top: '-30px',
    WebkitAppRegion: "no-drag"
}

type PanelBoxProps = {
    children: React.ReactNode
} 

const PanelBox = ({ children }: PanelBoxProps) => {
    return (
        <div style={PanelBoxStyle}>
            { children }
        </div>
    );
}

export default PanelBox;