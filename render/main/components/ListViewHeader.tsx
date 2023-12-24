import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import { RecordListContext, RecordListDispatch } from "../contexts/RecordListContext";

const ListViewHeader = () => {
    const context = useContext(RecordListContext);
    const dispatch = useContext(RecordListDispatch);

    if(!dispatch) {
        throw new Error("Cannot find RecordListDispatch");
    }

    const [ meso, setMeso ] = useState(0);
    const [ amount, setAmount ] = useState(0);

    useEffect(() => {
        if(!context.list) {
            setMeso(0);
            setAmount(0);
        } else {
            if(context.state != "CHECK" && context.state != "START") {
                let addition = 0, start = 0;
                
                if(context.state == "CONCAT") {
                    start = context.latestLength;
                } else if(context.state == "CONDITION") {
                    start = 0;
                } 

                for(let i = 0; i < context.list.length; i++) {
                    if(context.state == "ADD" && context.list[i].nSN == context.latestSN) {
                        break;
                    } 

                    addition += context.list[i].pushType == 1 ? context.list[i].price : 0;
                }
    
                switch(context.state) {
                    case "CONCAT":
                    case "ADD":
                        setMeso(meso => meso + addition);
                    break;
                    case "CONDITION":
                        setMeso(addition);
                    break;
                }

                setAmount(context.list.length);
    
                dispatch({
                    type: "CHECK",
                    victim: []
                });
            }   
        }
    }, [ context.list ]);

    const HeaderStyle = {
        BoxStyle: {
            padding: "25px 20px",
            letterSpacing: "-0.5pt",
            fontSize: "16pt",
            color: "black",
            display: "flex" as const,
            justifyContent: "space-between" as const,
            borderBottom: "1px solid rgba(0,0,0,0.3)",
        },

        ContentStyle: {
            BoxStyle: {
                width: "auto",
            },

            MesoStyle: {
                fontFamily: "NanumGothicExtraBold"
            }
        },
    }

    return (
        <div style={HeaderStyle.BoxStyle}>
            <div style={HeaderStyle.ContentStyle.BoxStyle}>
                <span>{ new Intl.NumberFormat("en-US").format(meso) }메소</span>
            </div>
            <div style={HeaderStyle.ContentStyle.BoxStyle}>
                <span>{ amount }건</span>
            </div>
        </div>      
    );
}

export default ListViewHeader;