import React from 'react';

const MessageStyle = {
    fontStyle: "italic" as const,
    color: "gray",
    fontSize: "22pt",
    textAlign: "center" as const,
    marginTop: "20px",
}

const NoRecycle = () => {
    return (
        <p style={MessageStyle}>
            모든 데이터를 불러왔습니다.
        </p>
    );
}

export default NoRecycle;