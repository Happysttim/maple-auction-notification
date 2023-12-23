import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import { AuctionRecord } from "../utils/maple";
import { RecordListContext, RecordListDispatch } from "../contexts/RecordListContext";
import ListItem from "./ListItem";
import ItemImage from "./ItemImage";
import ListItemContent from "./ListItemContent";
import Bubble from "./Bubble";
import ListViewHeader from "./ListViewHeader";

import maple from "../utils/maple";

type FetchState = "FIRST" | "CALL" | "DONE" | "END";

const ListAuctionView = () => {

    const [ fetchState, setFetchState ] = useState<FetchState>("FIRST");
    const context = useContext(RecordListContext);
    const dispatch = useContext(RecordListDispatch);

    if(!dispatch) {
        throw new Error("Cannot find RecordListDispatch");
    }

    const fetch = async (lastSN: number) => {
        if(fetchState != "END") {
            const auctionRecords = await window.ipcRenderer.invoke("AUCTION_HISTORY", lastSN) as AuctionRecord[];

            await setFetchState((!auctionRecords || auctionRecords.length < 20) ? "END" : "DONE");
            await dispatch({
                type: lastSN == 0 ? "SET" : "CONCAT",
                victim: auctionRecords 
            });
        }
    }

    useEffect(() => {
        if(fetchState == "FIRST") {
            fetch(0);
        } else if(fetchState == "CALL") {
            fetch(context.list[context.list.length].nSN);
        }
    }, [ fetchState ]);

    return (
        <>
        <ListViewHeader></ListViewHeader>
        {
            context.list.map(record => {
                return (
                    <ListItem key={record.nSN}>
                        <ItemImage itemCode={record.itemId}></ItemImage>
                        <ListItemContent>
                            <div style={{
                                height: "100%",
                            }}>
                                <Bubble value={record.pushType == 1 ? "판매" : "만료"} width="45px" backgroundColor={record.pushType == 1 ? "#FF9898" : "#D9D9D9"} fontColor={record.pushType == 1 ? "white" : "black"}></Bubble>
                                <Bubble value={maple.worldToName(record.worldId)} width="50px"></Bubble>
                                <div style={{
                                    display: "inline-block",
                                    float: "right"
                                }}>
                                    <Bubble value={record.date} width="140px"></Bubble>
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
                                    } 되었습니다.
                                </span>
                            </div>
                        </ListItemContent>
                    </ListItem>
                )
            })
        }
        </>
    )
}

export default ListAuctionView;