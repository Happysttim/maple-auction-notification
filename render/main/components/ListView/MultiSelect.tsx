import React from "react";

type MultiSelectProps = {
    children: React.ReactNode,
    display: boolean,
}

const MultiSelect = (props: MultiSelectProps) => {

    const SelectStyle = {
        display: props.display ? "block" : "none",
        position: "absolute" as const,
        width: "160px",
        height: "300px",
        backgroundColor: "white",
        overflowY: "auto" as const,
        overflowX: "hidden" as const,
        border: '1px solid rgba(0,0,0,0.3)',
        borderTop: 'none' as const,
        marginLeft: "20px",
        top: "57px"
    }

    return (
        <div style={SelectStyle}>
            { props.children }
        </div>
    );
}

export default MultiSelect;