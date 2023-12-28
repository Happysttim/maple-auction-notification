import React, { useContext, useRef } from "react";
import ItemImage from "./ItemImage";
import ListItemContent from "./ListItemContent";
import Bubble from "./Bubble";
import ListItem from "./ListItem";
import { RecordListContext } from "../../contexts/RecordListContext";
import maple, { dateFormat } from "../../utils/maple";

const ListViewBody = () => {

    const context = useContext(RecordListContext);

    return (
        <div style={{overflowY: "auto", height: "650px"}}>
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

                                                const diffTime = Math.abs((now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds()) - (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()));
                                                const diffSec = diffTime % 60;
                                                const diffMin = Math.floor(diffTime / 60);
                                                const diffHour = Math.floor(diffMin / 60); 

                                                const [ month, day ] = [
                                                    now.getMonth() - date.getMonth(),
                                                    now.getDate() - date.getDate(),
                                                ];

                                                if(month == 0) {
                                                    if(day == 0) {
                                                        if(diffHour == 0) {
                                                            if(diffMin == 0) {
                                                                return <>{diffSec}초 전</>            
                                                            }
                                                            return <>{diffMin}분 전</>
                                                        }
                                                        return <>{diffHour}시간 전</>
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
                                    {
                                        (() => {
                                            if(record.new) {
                                                return (
                                                    <div style={{
                                                        display: "inline-block",
                                                        width: "10px",
                                                        height: "10px",
                                                        borderRadius: "6em",
                                                        backgroundColor: "red",
                                                        float: "right",
                                                        margin: "4px"
                                                    }}>
                                                    </div>
                                                );
                                            }

                                            return <></>
                                        })()
                                    }
                                </div>
                            </ListItemContent>
                        </ListItem>
                    )
                })
            }
        </div>
    );
}

export default ListViewBody;