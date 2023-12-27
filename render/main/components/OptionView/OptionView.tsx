import React from "react";
import BorderBox from "./BorderBox";
import PushOption from "./PushOption";

const OptionView = () => {
    return (
        <BorderBox borderStyle="1px solid gray" boxName="알림설정" height="50px" width="400px">
            <PushOption/>
        </BorderBox>
    );
}

export default OptionView;