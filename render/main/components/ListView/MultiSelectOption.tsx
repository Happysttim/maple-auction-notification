import { useRef, useContext, useState } from "react";
import { RecordListContext, RecordListDispatch } from "../../contexts/RecordListContext";

type OptionProps = {
    id: number,
    value: string,
}

const MultiSelectOption = (props: OptionProps) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [ isHover, setHoverState ] = useState<boolean>(false);
    const context = useContext(RecordListContext);
    const dispatch = useContext(RecordListDispatch);

    if(!dispatch) {
        throw new Error("Cannot find RecordListDispatch");
    }

    const hoverToggle = () => {
        setHoverState(isHover ? false : true);
    }

    const optionClick = () => {
        const worldId = context.filter.worldId;
        const index = worldId.indexOf(props.id);
        console.log(`INDEX: ${index}, type: ${context.state}, worldId: ${context.filter.worldId}`);

        if(index == -1) {
            dispatch({
                type: "FILTER",
                filter: {
                    worldId: worldId.concat(props.id)
                }
            });
        } else {
            worldId.splice(index, 1)
            dispatch({
                type: "FILTER",
                filter: {
                    worldId: worldId
                }
            });
        }
    }

    const OptionStyle = {
        BoxStyle: {
            boxShadow: context.filter.worldId.indexOf(props.id) == -1 ? "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" : "box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
            backgroundColor: (isHover || context.filter.worldId.indexOf(props.id) > -1) ? "#F4F4F4" : "white",
            padding: "15px 10px",
            display: "flex",
        },

        OptionStyle: {
            backgroundColor: context.filter.worldId.indexOf(props.id) == -1 ? "inherit" : "#D9D9D9",
            width: "10px",
            height: "10px",
            display: "inline-block" as const,
            margin: "auto 0",
            marginRight: "15px",
            borderRadius: "25px"
        },

        LabelStyle: {
            color: "black",
            flexGrow: "2",
            textAlign: "right" as const,
            fontWeight: "500",
            fontSize: "12pt",
            marginRight: "10px",
            letterSpacing: "-1pt",
        }
    }

    return (
        <div ref={divRef} style={OptionStyle.BoxStyle} onClick={optionClick} onMouseEnter={() => hoverToggle()} onMouseLeave={() => hoverToggle()}>
            <div style={OptionStyle.OptionStyle}></div>
            <span style={OptionStyle.LabelStyle}>
                { props.value }
            </span>
        </div>
    );
}

export default MultiSelectOption;