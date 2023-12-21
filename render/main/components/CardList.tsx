import React, { useReducer, useEffect, useRef, useState, DragEvent } from 'react';
import { AuctionRecord } from '../utils/maple';
import Card from './Card';
import ItemImage from './ItemImage';
import CardContents from './CardContents';

type Fetch = {
    state: "FIRST" | "CALL" | "DONE" | "ERROR",
    data?: AuctionRecord[],
    lastSN?: number,
    isError?: boolean
}

const dragState = {
    isDrag: false,
    y: 0
}

const reducer = (state: Fetch, action: Fetch): Fetch => {
    switch(action.state) {
        case "FIRST":
            return {
                state: "FIRST",
                data: [],
                lastSN: 0,
                isError: false
            }
        case "CALL":
            return {
                state: "CALL",
                data: [],
                lastSN: 0,
                isError: false
            };
        case "DONE":
            return {
                state: "DONE",
                data: action.data,
                lastSN: action.data![action.data!.length - 1].nSN,
                isError: false
            }
        case "ERROR":
            return {
                state: "ERROR",
                isError: true
            }
    }
}

const CardList = () => {
    const [ fetch, dispatch ] = useReducer(reducer, {
        state: "FIRST"
    });

    const cardListRef = useRef<HTMLDivElement | null>(null);
    const [ listY, setY ] = useState(0); 

    const CardListStyle = {
        overflowY: "auto" as const,
        position: "relative" as const,
        top: listY
    }

    const loadFetch = async (lastSN: number) => {
        dispatch({
            state: "CALL"
        });

        const auctionRecord = await window.ipcRenderer.invoke('AUCTION_HISTORY', lastSN) as AuctionRecord[];

        dispatch({
            state: "DONE",
            data: auctionRecord
        })
    }

    useEffect(() => {
        loadFetch(0)
    }, []);

    const CardDragStart = (e: DragEvent) => {
        if(!dragState.isDrag) {
            dragState.isDrag = true;
            dragState.y = e.clientY;
        }
    }

    const CardDragEnd = (e: DragEvent) => {
        if(dragState.isDrag) {
            dragState.isDrag = false;
            dragState.y = 0;
        }
    }
    
    const CardDragEnter = (e: DragEvent) => {
        if(dragState.isDrag) {
            if(dragState.y > e.clientY) {
                setY((listY - (dragState.y - e.clientY) <= -cardListRef.current?.clientHeight!) ? listY : (listY - (dragState.y - e.clientY)));
            } else {
                
            }

            dragState.y = e.clientY;
        }
    }

    if(fetch.state == "CALL") {
        return (
            <div>로딩 중입니다.</div>
        )
    } else if(fetch.state == "DONE") {
        return (
            <div draggable style={CardListStyle} ref={cardListRef} onDragStart={CardDragStart} onDragEnd={CardDragEnd} onDragEnter={CardDragEnter}>
            {
                fetch.data?.map(record => {
                    return (
                        <Card>
                            <ItemImage itemCode={ record.itemId }></ItemImage>
                            <CardContents record={ record }></CardContents>
                        </Card>
                    );
                })
            }
            </div>
        );
    } else {
        return (
            <div>{fetch.state}</div>
        );
    }
}

export default CardList;