import React from "react";

type BorderBoxProps = {
    children: React.ReactNode,
    boxName: string,
    width: number | string,
    height: number | string,
    borderStyle: string,
}

const BorderBox = (props: BorderBoxProps) => {

    const Style = {
        BoxStyle: {
            width: props.width,
            height: props.height,
            borderStyle: props.borderStyle,
            borderRadius: "12px",
            padding: "12px",
            margin: "8px",
            backgroundColor: "inherit"
        },

        LabelStyle: {
            width: "inherit",
            letterSpacing: "-1pt",
            fontSize: "14pt",
            fontWeight: "500"
        }
    }

    return (
        <div style={Style.BoxStyle}>
            <div style={Style.LabelStyle}>
                <span>
                    { props.boxName }
                </span>
                { props.children }
            </div>
        </div>
    );
}

export default BorderBox;