import React, { useReducer, useEffect, useRef, useState, MouseEvent } from 'react';
import { AuctionRecord } from '../utils/maple';
import Card from './Card';
import ItemImage from './ItemImage';
import CardContents from './CardContents';
import NoRecycle from './NoRecycle';

type Fetch = {
    state: "FIRST" | "CALL" | "DONE" | "END",
    data?: AuctionRecord[],
    lastSN?: number,
    recycleState?: "NO" | "LOADING" | "DONE"
}

const dragState = {
    isDrag: false,
    y: 0,
    startClick: 0
}

const reducer = (previous: Fetch, action: Fetch): Fetch => {
    switch(action.state) {
        case "FIRST":
            return {
                state: "FIRST",
                data: [],
                lastSN: 0,
                recycleState: "NO"
            }
        case "CALL":
            return {
                state: "CALL",
                data: [],
                lastSN: 0,
                recycleState: previous.state == "FIRST" ? "NO" : "LOADING"
            };
        case "DONE":
            return {
                state: "DONE",
                data: action.data,
                lastSN: action.data![action.data!.length - 1].nSN,
                recycleState: "DONE"
            }
        case "END":
            return {
                state: "END",
                recycleState: "NO"
            }
    }
}

const CardList = () => {
    const [ fetch, dispatch ] = useReducer(reducer, {
        state: "FIRST",
    });

    const cardListRef = useRef<HTMLDivElement | null>(null);
    const [ listY, setY ] = useState(0); 
    const [ cards, setCards ] = useState<React.ReactNode[]>([]);

    const CardListStyle = {
        overflowY: "auto" as const,
        position: "relative" as const,
        userDrag: "none" as const,
        top: listY
    }

    const loadFetch = async (lastSN: number): Promise<AuctionRecord[]> => {
        dispatch({
            state: "CALL"
        });
        const auctionRecords = await window.ipcRenderer.invoke('AUCTION_HISTORY', lastSN) as AuctionRecord[];

        if(auctionRecords.length == 0) {
            dispatch({
                state: "END"
            });
        } else {
            dispatch({
                state: "DONE",
                data: auctionRecords
            })
        }

        return auctionRecords;
    }

    const addCards = (records: AuctionRecord[]) => {
        setCards(cards.concat(
            records.length > 0 ?
            records.map(record => {
                return (
                    <Card key={ record.nSN }>
                        <ItemImage itemCode={ record.itemId }></ItemImage>
                        <CardContents record={ record }></CardContents>
                    </Card>
                );
            }) :
            <NoRecycle key={0}></NoRecycle>
        ));
    }

    useEffect(() => {
        loadFetch(0).then(records => {
            addCards(records);
        });
    }, []);

    const CardDragStart = (e: MouseEvent) => {
        if(!dragState.isDrag) {
            dragState.isDrag = true;
            dragState.y = e.clientY;
        }
    }

    const CardDragEnd = (e: MouseEvent) => {
        if(dragState.isDrag) {
            dragState.isDrag = false;
            dragState.y = 0;
            dragState.startClick = 0;

            if(fetch.state != "END" && cardListRef.current!.offsetTop - window.innerHeight <= -cardListRef.current!.clientHeight) {
                loadFetch(fetch.lastSN!).then(records => {
                    addCards(records);
                });
            }
        }
    }
    
    const CardDragEnter = (e: MouseEvent) => {
        if(dragState.isDrag) {
            if(dragState.y > e.clientY) {
                setY((listY - (dragState.y - e.clientY) <= -cardListRef.current?.clientHeight!) ? listY : (listY - (dragState.y - e.clientY)));
            } else {
                setY((listY + (e.clientY - dragState.y) > 0) ? listY : (listY + (e.clientY - dragState.y)));
            }

            dragState.y = e.clientY;
        }
    }

    return (
        <div style={CardListStyle} ref={cardListRef} onMouseDown={CardDragStart} onMouseUp={CardDragEnd} onMouseMove={CardDragEnter}>
        {
            cards
        }
        </div>
    );
}

export default CardList;