import React, { useContext } from "react";
import { RecordListContext } from "../contexts/RecordListContext";
import ListItem from "./ListItem";
import ItemImage from "./ItemImage";
import ListItemContent from "./ListItemContent";
import Bubble from "./Bubble";
import ListViewHeader from "./ListViewHeader";
import ListView from "./ListView";
import { dateFormat } from "../utils/maple";

import maple from "../utils/maple";
import Watcher from "./Watcher";

const ListAuctionView = () => {

    const context = useContext(RecordListContext);

    return (
        <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
            <Watcher></Watcher>
            <ListViewHeader></ListViewHeader>
            <ListView>
                {
                    context.filtered && context.filtered.map(record => {
                        return (
                            <ListItem record={record} key={record.nSN}>
                                <ItemImage itemCode={record.itemId} itemName={record.itemName}></ItemImage>
                                <ListItemContent>
                                    <div style={{
                                        height: "100%",
                                    }}>
                                        <Bubble value={record.pushType == 1 ? "판매" : "만료"} width="30px" backgroundColor={record.pushType == 1 ? "#FF9898" : "#D9D9D9"} fontColor={record.pushType == 1 ? "white" : "black"}></Bubble>
                                        <Bubble value={maple.worldToName(record.worldId)}></Bubble>
                                        <div style={{
                                            display: "inline-block",
                                            float: "right",
                                            margin: "4px"
                                        }}>
                                            <span style={{color: "#CBCBCB", fontFamily: "NotoSansKR-Regular", fontSize: "10pt"}}>{ 
                                                (() => {
                                                    const date = dateFormat(record.date)
                                                    const now = new Date();

                                                    const [ month, day, hour, min, sec ] = [
                                                        now.getMonth() - date.getMonth(),
                                                        now.getDate() - date.getDate(),
                                                        now.getHours() - date.getHours(),
                                                        now.getMinutes() - date.getMinutes(),
                                                        now.getSeconds() - date.getSeconds()
                                                    ];

                                                    if(month == 0) {
                                                        if(day == 0) {
                                                            if(hour == 0) {
                                                                if(min == 0) {
                                                                    return <>{sec}초 전</>
                                                                }
                                                                return <>{min}분 전</> 
                                                            }
                                                            return <>{hour}시간 전</>
                                                        }
                                                        return <>{day}일 전</>
                                                    }
                                                    return <>{month <= 3 ? month + "달 전" : record.date}</>
                                                })() 
                                            }</span>
                                        </div>
                                    </div>
                                    <div style={{
                                        height: "100%",
                                    }}>
                                        <Bubble value={"x" + record.count}></Bubble>
                                        <span style={{
                                            fontSize: "11pt"
                                        }}>
                                            개가 {
                                                record.pushType == 1 ? new Intl.NumberFormat("en-US").format(record.price) + "메소에 판매" : "만료"
                                            }되었습니다.
                                        </span>
                                    </div>
                                </ListItemContent>
                            </ListItem>
                        )
                    })
                }
            </ListView>
        </div>
    )
}

export default ListAuctionView;