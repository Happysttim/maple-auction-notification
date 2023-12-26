import React, { useState, useContext, useEffect, useRef, ChangeEvent } from "react";
import { RecordListContext, RecordListDispatch } from "../contexts/RecordListContext";
import maple from "../utils/maple";
import MultiSelect from "./MultiSelect";
import MultiSelectOption from "./MultiSelectOption";
import Long from "long";

const ListViewHeader = () => {
    const recordContext = useContext(RecordListContext);
    const dispatch = useContext(RecordListDispatch);

    if(!dispatch) {
        throw new Error("Cannot find RecordListDispatch");
    }

    const [ meso, setMeso ] = useState<Long>(new Long(0));
    const [ amount, setAmount ] = useState(0);
    const [ isSelect, setSelectState ] = useState<boolean>(false);
    const sellRef = useRef<HTMLInputElement>(null);
    const expireRef = useRef<HTMLInputElement>(null);

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
                    setMeso(meso.add(addition));
                } else {
                    setMeso(new Long(addition));
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

            setMeso(new Long(addition));
            setAmount(recordContext.filtered.length);
        }
    }, [ recordContext.filtered ]);

    const selectToggle = () => {
        setSelectState(isSelect ? false : true)
    }

    const changePushType = (e: ChangeEvent) => {
        const type = ((): number => {
            if((sellRef.current!.checked && expireRef.current!.checked) || (!sellRef.current!.checked && !expireRef.current!.checked)) {
                return 0;
            } else {
                return sellRef.current!.checked ? 1 : 2;
            }
        })();

        dispatch({
            type: "FILTER",
            filter: {
                pushType: type
            }
        });
    }

    const HeaderStyle = {
        BoxStyle: {
            borderBottom: "1px solid rgba(0,0,0,0.3)",
        },
        FilterBox: {
            BoxStyle: {
                borderBottom: "1px solid rgba(0,0,0,0.3)",
                margin: "10px 0px",
                display: "flex" as const,
            },
            SelectBox: {
                BoxStyle: {
                    margin: "20px",
                    width: "160px",
                    display: "flex" as const,
                    borderBottom: "1px solid rgba(0,0,0,0.3)",
                    paddingBottom: "5px",
                },

                LabelStyle: {
                    width: "inherit",
                    height: "inherit",
                    display: "inline-block" as const,
                    textAlign: "center" as const,
                    fontWeight: "400",
                    letterSpacing: "-1pt",
                },

                ArrowStyle: {
                    display: "inline-block" as const,
                    width: "10px",
                    height: "10px",
                    borderLeft: "1px solid rgba(0,0,0,0.3)",
                    borderBottom: "1px solid rgba(0,0,0,0.3)",
                    transform: "rotate(-45deg)",
                    margin: "auto 0",
                    marginRight: "5px",
                }
            },

            PushTypeBox: {
                BoxStyle: {
                    width: "200px",
                    display: "flex",
                    margin: "auto 0",
                },

                LabelStyle: {
                    letterSpacing: "-1pt",
                    marginRight: "10px",
                }
            }
        },

        MesoBox: {
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
        },
    }



    return (
        <div style={HeaderStyle.BoxStyle}>
            <div style={HeaderStyle.FilterBox.BoxStyle}>
                <div style={HeaderStyle.FilterBox.SelectBox.BoxStyle} onClick={() => selectToggle()}>
                    <span style={HeaderStyle.FilterBox.SelectBox.LabelStyle}>
                    {
                        (() => {
                            const count = recordContext.filter.worldId.length;
                            if(count == 0) {
                                return "모든 서버";
                            } else if(count == 1) {
                                return maple.worldToName(recordContext.filter.worldId[0]);
                            }

                            return "일부";
                        })()
                    }
                    </span>
                    <div style={HeaderStyle.FilterBox.SelectBox.ArrowStyle}></div>
                </div>
                <MultiSelect display={isSelect}>
                    <MultiSelectOption id={1} value={maple.worldToName(1)}></MultiSelectOption>
                    <MultiSelectOption id={2} value={maple.worldToName(2)}></MultiSelectOption>
                    <MultiSelectOption id={3} value={maple.worldToName(3)}></MultiSelectOption>
                    <MultiSelectOption id={4} value={maple.worldToName(4)}></MultiSelectOption>
                    <MultiSelectOption id={5} value={maple.worldToName(5)}></MultiSelectOption>
                    <MultiSelectOption id={6} value={maple.worldToName(6)}></MultiSelectOption>
                    <MultiSelectOption id={7} value={maple.worldToName(7)}></MultiSelectOption>
                    <MultiSelectOption id={8} value={maple.worldToName(8)}></MultiSelectOption>
                    <MultiSelectOption id={9} value={maple.worldToName(9)}></MultiSelectOption>
                    <MultiSelectOption id={10} value={maple.worldToName(10)}></MultiSelectOption>
                    <MultiSelectOption id={11} value={maple.worldToName(11)}></MultiSelectOption>
                    <MultiSelectOption id={12} value={maple.worldToName(12)}></MultiSelectOption>
                </MultiSelect>
                <div style={HeaderStyle.FilterBox.PushTypeBox.BoxStyle}>
                    <label style={HeaderStyle.FilterBox.PushTypeBox.LabelStyle}>
                        <span>판매</span>
                        <input type="checkbox" value="1" ref={sellRef} onChange={changePushType}/>
                    </label>
                    <label style={HeaderStyle.FilterBox.PushTypeBox.LabelStyle}>
                        <span>만료</span>
                        <input type="checkbox" value="2" ref={expireRef} onChange={changePushType}/>
                    </label>
                </div>
            </div>
            <div style={HeaderStyle.MesoBox.BoxStyle}>
                <div style={HeaderStyle.MesoBox.ContentStyle.BoxStyle}>
                    <span>{ new Intl.NumberFormat("en-US").format(meso.toNumber()) }메소</span>
                </div>
                <div style={HeaderStyle.MesoBox.ContentStyle.BoxStyle}>
                    <span>{ amount }건</span>
                </div>
            </div> 
        </div>     
    );
}

export default ListViewHeader;