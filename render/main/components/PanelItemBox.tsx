import React, { useContext, useState, useLayoutEffect } from "react";
import { RouteViewContext, RouteViewDispatch, RouteViewList } from "../contexts/RouteViewContext";

type PanelItemBoxProps = {
    routeView: React.ReactNode,
    name: string,
    item: RouteViewList,
}

const PanelItemBox = (props: PanelItemBoxProps) => {

    const [ context, dispatch ] = [ useContext(RouteViewContext), useContext(RouteViewDispatch) ];
    const [ bgColor, setBgColor ] = useState<string>(context.name == props.item ? 'black' : '#909090');

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
        if(props.item != context.name) {
            dispatch({
                routeView: props.routeView,
                name: props.item
            });
        }
    }

    useLayoutEffect(() => {
        if(context.name == props.item) {
            setBgColor("#909090");
        } else {
            setBgColor("black");
        }
    }, [ context.name ])

    return (
        <div style={PanelItemBoxStyle.BoxStyle} onClick={ItemClick}>
            <span style={PanelItemBoxStyle.ItemStyle}>{ props.name }</span>
        </div>
    )
}

export default PanelItemBox;