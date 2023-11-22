import React, { useState, useRef } from 'react';
import LoginBox from './components/LoginBox';

const BodyStyle = {
    opacity: 0.8
};

const App = () => {
    return (
        <div>
            <p>로그인</p>
            <LoginBox></LoginBox>
        </div>  
    );
}

export default App;