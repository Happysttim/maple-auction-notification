import React, { useEffect, useRef, useState } from "react";

type PushType = {
    isPush: boolean,
    type: number,
}

type ChangeType = "IS_PUSH" | "SELL" | "EXPIRE";

const Style = {
    BoxStyle: {
        display: "flex" as const,
        width: "inherit",
    },

    LabelStyle: {
        letterSpacing: "-1pt",
        fontSize: "12pt",
        margin: "0px 12px"
    }
}

const PushOption = () => {

    const isPushRef = useRef<HTMLInputElement | null>(null);
    const sellRef = useRef<HTMLInputElement | null>(null);
    const expireRef = useRef<HTMLInputElement | null>(null);
    const [ config, setConfig ] = useState<PushType>(window.config);

    useEffect(() => {
        window.ipcRenderer.send('SET_PUSH_TYPE', config);
        isPushRef.current!.checked = config.isPush;

        if(!config.isPush) {
            expireRef.current!.disabled = sellRef.current!.disabled = true;
            expireRef.current!.checked = sellRef.current!.checked = false;   
        } else {
            expireRef.current!.disabled = sellRef.current!.disabled = false;
            if(config.type == 0) {
                expireRef.current!.checked = sellRef.current!.checked = true; 
            }
        }
    }, [ config ]);
    
    const onChange = (type: ChangeType) => {

        const pushCheck = isPushRef.current!.checked;
        const expireCheck = expireRef.current!.checked;
        const sellCheck = sellRef.current!.checked;

        switch(type) {
            case "IS_PUSH":
                if(pushCheck) {
                    setConfig({
                        isPush: true,
                        type: 0,
                    });
                } else {
                    setConfig({
                        isPush: false,
                        type: 0,
                    });  
                }
            break;
            case "SELL":
            case "EXPIRE":
                if(sellCheck && expireCheck) {
                    setConfig({
                        isPush: true,
                        type: 0,
                    });
                } else if(!sellCheck && expireCheck) {
                    setConfig({
                        isPush: true,
                        type: 2,
                    });
                } else if(sellCheck && !expireCheck) {
                    setConfig({
                        isPush: true,
                        type: 1,
                    });
                } else {
                    setConfig({
                        isPush: false,
                        type: 0,
                    });
                }
            break;
        }
    }

    return (
        <div style={Style.BoxStyle}>
            <label style={Style.LabelStyle}>
                <span>알람 받기</span>
                <input type="checkbox" ref={isPushRef} onChange={() => onChange("IS_PUSH")}></input>
            </label>
            <label style={Style.LabelStyle}>
                <span>판매</span>
                <input type="checkbox" ref={sellRef} onChange={() => onChange("SELL")}></input>
            </label>
            <label style={Style.LabelStyle}>
                <span>만료</span>
                <input type="checkbox" ref={expireRef} onChange={() => onChange("EXPIRE")}></input>
            </label>
        </div>
    );
}

export default PushOption;