import React from "react";

const PanelBoxStyle = {
    width: "270px",
    height: "100%",
    backgroundColor: "#3D3D3D",
    zIndex: "9999",
    position: "relative" as const,
    top: '-30px',
    WebkitAppRegion: "no-drag"
}

type PanelBoxProps = {
    children: React.ReactNode
} 

const PanelBox = ({ children }: PanelBoxProps) => {
    React.Children
    return (
        <div style={PanelBoxStyle}>
            { children }
        </div>
    );
}

export default PanelBox;