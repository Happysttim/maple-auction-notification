import React, { useContext, useState, useLayoutEffect } from "react";
import { RouteViewContext, RouteViewDispatch, RouteViewList } from "../contexts/RouteViewContext";

type PanelItemBoxProps = {
    routeView: React.ReactNode,
    name: string,
    item: RouteViewList,
}

const PanelItemBox = (props: PanelItemBoxProps) => {

    const [ context, dispatch ] = [ useContext(RouteViewContext), useContext(RouteViewDispatch) ];
    const [ bgColor, setBgColor ] = useState<string>(context.name == props.item ? '#5A5A5A' : 'inherit');

    if(!dispatch) {
        throw new Error("Cannot find SelectedItemDispatch");
    }

    const PanelItemBoxStyle = {
        BoxStyle: {
            height: "70px",
            textAlign: "right" as const,
            margin: "5px",
            borderRadius: "10px",
            backgroundColor: bgColor
        },
    
        ItemStyle: {
            color: "white",
            letterSpacing: "-1pt",
            fontSize: "24pt",
            fontWeight: "100",
            display: "block" as const,
            position: "relative" as const,
            top: "50%",
            transform: "translateY(-50%)",
            marginRight: "15px"
        }
    }

    

    const ItemClick = () => {
        if(props.item != context.name) {
            dispatch({
                routeView: props.routeView,
                name: props.item
            });
        }
    }

    useLayoutEffect(() => {
        if(context.name == props.item) {
            setBgColor("#5A5A5A");
        } else {
            setBgColor("inherit");
        }
    }, [ context.name ])

    return (
        <div style={PanelItemBoxStyle.BoxStyle} onClick={ItemClick}>
            <span style={PanelItemBoxStyle.ItemStyle}>{ props.name }</span>
        </div>
    )
}

export default PanelItemBox;