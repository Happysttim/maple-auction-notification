import React, { FormEvent, useCallback, useContext, useRef } from 'react';
import { LoginTypeContext } from '../contexts/LoginTypeContext';
import LoginTypeBox from './LoginTypeBox';

const LoginBoxStyle = {
    width: '360px',
    backgroundColor: 'rgba(255, 224, 178, 0.5)',
    margin: '40px auto',
    borderRadius: '25px'
}

const FormStyle = {
    width: '100%',
    padding: '30px 0px',
    borderRadius: '0px 0px 25px 25px',
}

const FormControllStyle = {
    width: '100%',
    height: '40px',
    display: 'block',
}

const LabelStyle = {
    width: '133px',
    height: '30px',
    textAlign: 'left' as const,
    marginLeft: '20px',
    fontFamily: 'NanumGothicLight',
    letterSpacing: '-0.5px',
    display: 'inline-block' as const
}

const InputTextStyle = {
    width: '180px',
    height: '30px',
    backgroundColor: 'translate',
    border: '0.5px solid lightgray',
    outline: 'none'
}

const SubmitButtonStyle = {
    width: '320px',
    height: '40px',
    margin: '0 auto',
    marginTop: '10px',
    display: 'block',
    backgroundColor: '#ff804c',
    color: 'white',
    fontFamily: 'NanumGothicExtraBold',
    border: 'none'
}

const LoginBox = () => {
    const loginType = useContext(LoginTypeContext);

    const idRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    if(!loginType) {
        throw new Error('Cannot find LoginTypeContext');
    }

    const OnSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();

        if(idRef.current!.value.trim() == "" || passwordRef.current!.value.trim() == "") {
            window.ipcRenderer.send('SHOW_ERROR', '로그인 오류', '아이디 또는 비밀번호가 유효하지 않습니다.')

            return;
        }

        window.ipcRenderer.invoke('LOGIN', loginType, idRef.current!.value, passwordRef.current!.value);
    }, []);

    return (
        <div style={LoginBoxStyle}>
            <LoginTypeBox></LoginTypeBox>
            <form onSubmit={OnSubmit} style={FormStyle}>
                <div style={FormControllStyle}>
                    <span style={LabelStyle}>
                        {
                            loginType == 'email' ? '넥슨이메일ID' : '메이플ID'
                        }
                    </span>
                    <input type="text" ref={idRef} style={InputTextStyle} defaultValue=""></input>
                </div>
                <div style={FormControllStyle}>
                    <span style={LabelStyle}>
                        비밀번호
                    </span>
                    <input type="password" ref={passwordRef} style={InputTextStyle} defaultValue=""></input>
                </div>
                <div style={FormControllStyle}>
                    <input type="submit" style={SubmitButtonStyle} value="로그인"></input>
                </div>
            </form>
        </div>
    );
};

export default LoginBox;