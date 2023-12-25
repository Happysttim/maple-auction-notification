import React, { useState, useContext, useEffect } from "react";
import { RecordListContext, RecordListDispatch } from "../contexts/RecordListContext";

const ListViewHeader = () => {
    const recordContext = useContext(RecordListContext);
    const dispatch = useContext(RecordListDispatch);

    if(!dispatch) {
        throw new Error("Cannot find RecordListDispatch");
    }

    const [ meso, setMeso ] = useState(0);
    const [ amount, setAmount ] = useState(0);

    useEffect(() => {
        if(recordContext.state != "CHECK") {
            if(amount != recordContext.state.length) {
                const start = (recordContext.state == "FILTER" || recordContext.state == "ADD") ? 0 : amount;
                const diff = Math.abs(start - recordContext.filtered.length);

                let addition = 0;

                for(let i = start; i < recordContext.filtered.length; i++) {
                    if(recordContext.state == "ADD" && i == diff) {
                        break;
                    }

                    if(recordContext.filtered[i].pushType == 1) {
                        addition += recordContext.filtered[i].price;
                    }    
                }

                if(recordContext.state == "ADD" || recordContext.state == "CONCAT") {
                    setMeso(meso => meso + addition);
                } else {
                    setMeso(addition);
                }

                setAmount(recordContext.filtered.length);
            }

            dispatch({
                type: "CHECK",
            });
        } else {
            let addition = 0;
            for(let i = 0; i < recordContext.filtered.length; i++) {
                addition += recordContext.filtered[i].price;
            }

            setMeso(addition);
            setAmount(recordContext.filtered.length);
        }
    }, [ recordContext.filtered ]);

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