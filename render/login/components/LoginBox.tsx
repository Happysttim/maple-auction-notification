import React, { FormEvent, useCallback, useRef, useState } from "react";

const LoginBoxStyle = {
    width: 350,
    border: '1px solid lightgray',
    borderRadius: 20,
    background: '#ffffff',
    margin: '0 auto',
    padding: '50px 0px'
}

const FormControllerStyle = {
    width: 300,
    height: 40,
    margin: '0 auto',
}

const InputElementStyle = {
    width: 180,
    height: 30,
    border: '1px solid gray',
    outline: 'none'
}

const LabelElementStyle = {
    display: 'inline-block',
    width: 100,
    height: 30
}

const LoginBox = () => {

    const idBox = useRef<HTMLInputElement | null>(null);
    const passwordBox = useRef<HTMLInputElement | null>(null);
    
    const LoginSubmit = useCallback((event: FormEvent) => {
        if(idBox.current?.value.trim() == "" || passwordBox.current?.value.trim() == "") {
            alert("모든 정보를 입력해주세요.");
        } else {
            window.ipcRenderer.invoke('LOGIN',
                idBox.current?.value,
                passwordBox.current?.value
            );
        }
    
        event.preventDefault();
        return;
    }, []);

    return (
        <div style={LoginBoxStyle}>
            <form onSubmit={LoginSubmit}>
                <div style={FormControllerStyle}>
                    <span style={LabelElementStyle}>아이디: </span>
                    <input type="text" ref={idBox} style={InputElementStyle}></input>
                </div>
                <div style={FormControllerStyle}>
                    <span style={LabelElementStyle}>비밀번호: </span>
                    <input type="password" ref={passwordBox} style={InputElementStyle}></input>
                </div>
                <div style={FormControllerStyle}>
                    <input type="submit" value="로그인"></input>
                </div>
            </form>
        </div>
    );
}

export default LoginBox;