import React from 'react';
import maple, { AuctionRecord } from '../utils/maple';

type CardContentsProps = {
    record: AuctionRecord
}

const CardContentsStyle = {
    BoxStyle: {
        width: "100%",
        height: "100%",
        display: "flex" as const,
        flexDirection: "column" as const
    },

    DateStyle: {
        color: "#8b8b8b",
        fontSize: "10pt",
        letterSpacing: "-1px",
        padding: "0px",
        margin: "0px",
        justifyContent: "space-between" as const
    },

    MessageStyle: {
        BoxStyle: {
            width: "100%",
            height: "100%",
            fontSize: "14pt",
            letterSpacing: "-1px"
        },

        ServerNameStyle: {
            color: "#737373"
        },

        ItemNameStyle: {
            color: "#56adb2"
        },

        PriceStyle: {
            color: "#9CB84E"
        }
    }
}

const Sell = (props: CardContentsProps) => {
    return (
        <>
            <span style={CardContentsStyle.MessageStyle.ServerNameStyle}>{maple.worldToName(props.record.worldId)}</span>서버
            에서 <span style={CardContentsStyle.MessageStyle.ItemNameStyle}>{props.record.itemName}({props.record.count}개)</span>이(가)&nbsp;
            <span style={CardContentsStyle.MessageStyle.PriceStyle}>{new Intl.NumberFormat("en-US").format(props.record.price)}메소</span>에 팔렸습니다.
        </>
    );
}

const Expiration = (props: CardContentsProps) => {
    return (
        <>
            <span style={CardContentsStyle.MessageStyle.ServerNameStyle}>{maple.worldToName(props.record.worldId)}</span>서버
            에서 <span style={CardContentsStyle.MessageStyle.ItemNameStyle}>{props.record.itemName}</span> 이(가) 만료되었습니다.
        </>
    )
}

const CardContents = (props: CardContentsProps) => {
    return (
        <div style={CardContentsStyle.BoxStyle}>
            <p style={CardContentsStyle.DateStyle}>
                { props.record.date }
            </p>
            <div style={CardContentsStyle.MessageStyle.BoxStyle}>
            {
                props.record.pushType === 1 ?
                <Sell record={props.record}></Sell> :
                <Expiration record={props.record}></Expiration>
            }
            </div>
        </div>
    )
}

export default CardContents;