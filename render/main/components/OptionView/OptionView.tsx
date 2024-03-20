import React from 'react';
import BorderBox from './BorderBox';
import PushOption from './PushOption';

const OptionView = () => {
    return (
        <BorderBox borderStyle='1px solid rgba(0,0,0,0.2)' boxName='알림설정' height='auto' width='auto'>
            <PushOption/>
        </BorderBox>
    );
};

export default OptionView;