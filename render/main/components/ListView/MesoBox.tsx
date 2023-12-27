import { useContext, useEffect, useState } from "react";
import { RecordListContext, RecordListDispatch } from "../../contexts/RecordListContext";
import Long from "long";

const Style = {
    BoxStyle: {
        letterSpacing: "-0.5pt",
        fontSize: "16pt",
        color: "black",
        display: "flex" as const,
        justifyContent: "space-between" as const,
        margin: "20px",
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

const MesoBox = () => {

    const recordContext = useContext(RecordListContext);
    const dispatch = useContext(RecordListDispatch);

    if(!dispatch) {
        throw new Error("Cannot find RecordListDispatch");
    }

    const [ meso, setMeso ] = useState<Long>(new Long(0));
    const [ amount, setAmount ] = useState(0);

    useEffect(() => {
        if(recordContext.state != "ERROR") {
            let addition = new Long(0), before = new Long(0), start = 0, end = 0;

            switch(recordContext.state) {
                case "ADD":
                case "CONCAT":
                    if(amount != recordContext.state.length) {
                        start = recordContext.state == "CONCAT" ? amount : 0;
                        end = Math.abs((recordContext.state == "CONCAT" ? 0 : start) - recordContext.filtered.length);
                    }
                break;
                case "CHECK":
                case "FILTER":
                    start = 0;
                    end = recordContext.filtered.length;
                break;
            }

            for(let i = start; i < end; i++) {
                if(recordContext.filtered[i].pushType == 1) {
                    const price = new Long(recordContext.filtered[i].price);
                    addition = before.add(price);
                    before = addition;
                }
            }

            setMeso((recordContext.state == "ADD" || recordContext.state == "CONCAT") ? meso.add(addition) : addition);
            setAmount(recordContext.filtered.length);

            if(recordContext.state != "CHECK") {
                dispatch({
                    type: "CHECK",
                });
            }
        }
    }, [ recordContext.filtered ]);

    return (
        <div style={Style.BoxStyle}>
            <div style={Style.ContentStyle.BoxStyle}>
                <span>{ new Intl.NumberFormat("en-US").format(meso.toNumber()) }메소</span>
            </div>
            <div style={Style.ContentStyle.BoxStyle}>
                <span>{ amount }건</span>
            </div>
        </div>
    );
}

export default MesoBox;