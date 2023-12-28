import React, { useEffect, useRef, useState } from "react";

type PushType = {
    isPush: boolean,
    type: number,
}

const Style = {
    BoxStyle: {
        display: "flex" as const,
        width: "inherit",
        marginTop: "12px"
    },

    LabelStyle: {
        letterSpacing: "-1pt",
        fontSize: "12pt",
        marginRight: "24px"
    }
}

const PushOption = () => {
    const sellRef = useRef<HTMLInputElement | null>(null);
    const expireRef = useRef<HTMLInputElement | null>(null);
    const [ config, setConfig ] = useState<PushType>(window.config);

    useEffect(() => {
        window.ipcRenderer.send('SET_PUSH_TYPE', config);

        if(!config.isPush) {
            sellRef.current!.checked = expireRef.current!.checked = false;
        } else {
            sellRef.current!.checked = (config.type == 1 || config.type == 0);
            expireRef.current!.checked = (config.type == 2 || config.type == 0);
        }
    }, [ config ]);
    
    const onChange = () => {

        const expireCheck = expireRef.current!.checked;
        const sellCheck = sellRef.current!.checked;

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
    }

    return (
        <div style={Style.BoxStyle}>
            <label style={Style.LabelStyle}>
                <span>판매알림</span>
                <input type="checkbox" ref={sellRef} onChange={() => onChange()}></input>
            </label>
            <label style={Style.LabelStyle}>
                <span>만료알림</span>
                <input type="checkbox" ref={expireRef} onChange={() => onChange()}></input>
            </label>
        </div>
    );
}

export default PushOption;