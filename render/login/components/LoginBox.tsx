import React, { FormEvent, useRef, useState } from 'react';

type LoginType = "MAPLE_EMAIL" | "MAPLE_ID";

const Login = {
    BoxStyle: {
        position: 'relative' as const,
        width: '360px',
        backgroundColor: '#FFF3DD',
        margin: '0 auto',
        top: '50%',
        transform: 'translateY(-60%)'
        // borderRadius: '25px'
    },

    Form: {
        BoxStyle: {
            width: '100%',
            padding: '50px 0px',
            // borderRadius: '0px 0px 25px 25px',
        },
        
        ControllerStyle: {
            width: '100%',
            height: '40px',
            display: 'block' as const,
        },

        LabelStyle: {
            width: '133px',
            height: '30px',
            textAlign: 'left' as const,
            marginLeft: '20px',
            fontFamily: 'NotoSansKR-Light',
            letterSpacing: '-0.5px',
            display: 'inline-block' as const
        },

        TextFieldStyle: {
            width: '180px',
            height: '30px',
            backgroundColor: 'translate',
            border: '0.5px solid lightgray',
            outline: 'none' as const
        },

        SubmitStyle: {
            width: '320px',
            height: '40px',
            margin: '0 auto',
            marginTop: '30px',
            display: 'block',
            backgroundColor: '#FFC47E',
            color: 'white',
            fontSize: '12pt',
            fontFamily: 'NotoSansKR-SemiBold',
            border: 'none'
        }
    },
}

const TypeStyle = {
    width: '360px',
};

const LoginBox = () => {

    const idRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [ loginType, setLoginType ] = useState<LoginType>("MAPLE_ID");

    const OnSubmit = (e: FormEvent) => {
        e.preventDefault();

        if(idRef.current!.value.trim() == "" || passwordRef.current!.value.trim() == "") {
            window.ipcRenderer.send('SHOW_ERROR', '로그인 오류', '아이디 또는 비밀번호가 유효하지 않습니다.')
            return;
        }

        window.ipcRenderer.invoke('LOGIN', loginType, idRef.current!.value, passwordRef.current!.value)
            .then(isSuccess => {
                if(!isSuccess) {
                    window.ipcRenderer.send('SHOW_ERROR', '로그인 오류', '아이디 또는 비밀번호가 유효하지 않습니다.');
                }
            });
    };

    const typeStyle = (type: LoginType): React.CSSProperties => {
        return {
            width: '179.5px',
            display: 'inline-block',
            letterSpacing: '-0.5px',
            padding: '10px 0px',
            textAlign: 'center',
            backgroundColor: type == loginType ? 'inherit' : 'rgba(255, 214, 176, 0.5)',
            borderRight: type == 'MAPLE_EMAIL' ? '1px solid rgba(255, 214, 176, 0.5)' : 'none', 
            borderRadius: (type == 'MAPLE_EMAIL' ? '25px 0px 0px 0px' : '0px 25px 0px 0px'),
            cursor: 'pointer'
        }
    }

    const OnTypeClick = (value: LoginType) => {
        setLoginType(value);
    }

    return (
        <div style={Login.BoxStyle}>
            {/* <div style={TypeStyle}>
                <div style={typeStyle('MAPLE_EMAIL')} onClick={e => OnTypeClick('MAPLE_EMAIL')}>
                    넥슨이메일ID
                </div>
                <div style={typeStyle('MAPLE_ID')} onClick={e => OnTypeClick('MAPLE_ID')}>
                    메이플ID
                </div>
            </div> */}
            <form onSubmit={OnSubmit} style={Login.Form.BoxStyle}>
                <div style={Login.Form.ControllerStyle}>
                    <span style={Login.Form.LabelStyle}>
                        {
                            loginType == 'MAPLE_EMAIL' ? '넥슨이메일ID' : '메이플ID'
                        }
                    </span>
                    <input type="text" ref={idRef} style={Login.Form.TextFieldStyle} defaultValue=""></input>
                </div>
                <div style={Login.Form.ControllerStyle}>
                    <span style={Login.Form.LabelStyle}>
                        비밀번호
                    </span>
                    <input type="password" ref={passwordRef} style={Login.Form.TextFieldStyle} defaultValue=""></input>
                </div>
                <div style={Login.Form.ControllerStyle}>
                    <input type="submit" style={Login.Form.SubmitStyle} value="로그인"></input>
                </div>
            </form>
        </div>
    );
};

export default LoginBox;