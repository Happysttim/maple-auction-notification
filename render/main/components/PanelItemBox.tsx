import React, { useContext, useState, useLayoutEffect } from "react";
import { SelectedItem, SelectedItemContext, SelectedItemDispatch } from "../contexts/SelectedItemContext";

type PanelItemBoxProps = {
    item: SelectedItem,
    name: string,
}

const PanelItemBox = (props: PanelItemBoxProps) => {

    const [ selected, dispatch ] = [ useContext(SelectedItemContext), useContext(SelectedItemDispatch) ];
    const [ bgColor, setBgColor ] = useState<string>(selected == "VIEW_AUCTION_LIST" ? 'black' : '#909090');

    if(!dispatch) {
        throw new Error("Cannot find SelectedItemDispatch");
    }

    const PanelItemBoxStyle = {
        BoxStyle: {
            width: "100%",
            height: "70px",
            borderTop: "1px solid #909090",
            borderBottom: "0.25px solid #909090",
            textAlign: "right" as const,
            backgroundColor: bgColor
        },
    
        ItemStyle: {
            color: "white",
            letterSpacing: "-1px",
            fontSize: "22pt",
            display: "block" as const,
            position: "relative" as const,
            top: "50%",
            transform: "translateY(-50%)",
            marginRight: "10px"
        }
    }

    

    const ItemClick = () => {
        dispatch(props.item);
    }

    useLayoutEffect(() => {
        if(selected == props.item) {
            setBgColor("#909090");
        } else {
            setBgColor("black");
        }
    }, [ selected ])

    return (
        <div style={PanelItemBoxStyle.BoxStyle} onClick={ItemClick}>
            <span style={PanelItemBoxStyle.ItemStyle}>{ props.name }</span>
        </div>
    )
}

export default PanelItemBox;