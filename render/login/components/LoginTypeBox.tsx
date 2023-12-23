import React, { MouseEvent, useContext } from 'react';
import { LoginType, LoginTypeContext, LoginTypeDispatch } from '../contexts/LoginTypeContext';

const TypeBoxStyle = {
    width: '360px',
};

const LoginTypeBox = () => {

    const typeContext = useContext(LoginTypeContext);
    const typeDispatch = useContext(LoginTypeDispatch);

    if(!typeDispatch) {
        throw new Error("Cannot find LoginTypeDispatch");
    }

    const typeStyle = (type: LoginType): React.CSSProperties => {
        return {
            width: '179.5px',
            display: 'inline-block',
            letterSpacing: '-0.5px',
            padding: '10px 0px',
            textAlign: 'center',
            backgroundColor: type == typeContext ? 'inherit' : 'rgba(255, 214, 176, 0.5)',
            borderRight: type == 'email' ? '1px solid rgba(255, 214, 176, 0.5)' : 'none', 
            borderRadius: (type == 'email' ? '25px 0px 0px 0px' : '0px 25px 0px 0px'),
            cursor: 'pointer'
        }
    }

    const OnTypeClick = (e: MouseEvent, value: string) => {
        e.preventDefault();
        if((value.trim() == 'email' || value.trim() == 'normal') && value.trim() != typeContext) {
            typeDispatch(value.trim() as LoginType);
            console.log(typeContext);
        }
    }

    return (
        <div style={TypeBoxStyle}>
            <div style={typeStyle('email')} onClick={e => OnTypeClick(e, 'email')}>
                넥슨이메일ID
            </div>
            <div style={typeStyle('normal')} onClick={e => OnTypeClick(e, 'normal')}>
                메이플ID
            </div>
        </div>
    )
}

export default LoginTypeBox;