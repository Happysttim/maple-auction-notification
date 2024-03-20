import React from 'react';

type BubbleProps = {
    width?: string,
    backgroundColor?: string,
    fontColor?: string,
    value: string,
}

const Bubble = (props: BubbleProps) => {

    const BubbleStyle = {
        width: props.width ?? 'inherit',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 1)',
        padding: '3px 10px',
        display: 'inline-block' as const,
        margin: '4px',
        textAlign: 'center' as const,
        backgroundColor: props.backgroundColor ?? '#D9D9D9',
        color: props.fontColor ?? 'black',
        fontSize: '10pt',
        fontFamily: 'NotoSansKR-SemiBold',
        letterSpacing: '-1pt',
    };

    return (
        <p style={BubbleStyle}>
            { props.value }
        </p>
    );
};

export default Bubble;