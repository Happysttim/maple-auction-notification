import React from "react";

type BubbleProps = {
    width?: string,
    backgroundColor?: string,
    fontColor?: string,
    value: string,
}

const Bubble = (props: BubbleProps) => {

    const BubbleStyle = {
        width: props.width ?? "inherit",
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        padding: "3px 6px",
        display: "inline-block" as const,
        margin: "0px",
        marginRight: "5px",
        fontFamily: "NanumGothicBold",
        textAlign: "center" as const,
        backgroundColor: props.backgroundColor ?? "#D9D9D9",
        color: props.fontColor ?? "black",
        fontSize: "10pt",
        letterSpacing: "-1pt",
    }

    return (
        <p style={BubbleStyle}>
            { props.value }
        </p>
    )
}

export default Bubble;