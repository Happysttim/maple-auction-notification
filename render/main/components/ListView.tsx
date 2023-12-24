import React, { useState, useContext, useEffect, useRef } from "react";
import { RecordListContext, RecordListDispatch } from "../contexts/RecordListContext";
import { AuctionRecord } from "../utils/maple";

type FetchState = "FIRST" | "CALL" | "DONE" | "END";

type ListViewProps = {
    children: React.ReactNode,
}

const ListView = (props: ListViewProps) => {
    const [ fetchState, setFetchState ] = useState<FetchState>("FIRST");
    const [ count, setCount ] = useState(0);
    const [ context, dispatch ] = [ useContext(RecordListContext), useContext(RecordListDispatch)];
    const listRef = useRef<HTMLDivElement | null>(null);

    if(!dispatch) {
        throw new Error("Cannot find RecordListDispatch");
    }

    const fetch = async (lastSN: number) => {
        if(fetchState != "END") {
            const auctionRecords = await window.ipcRenderer.invoke("AUCTION_HISTORY", lastSN) as AuctionRecord[];
            await new Promise((resolve) => setTimeout(() => { resolve(1) }, 1000));
            console.log(`FETCHED! ${lastSN}`);
            await setFetchState((!auctionRecords || auctionRecords.length < 20) ? "END" : "DONE");
            await dispatch({
                type: "CONCAT",
                victim: auctionRecords 
            });
        }
    }

    useEffect(() => {
        if(fetchState == "FIRST") {
            fetch(0);
        } else if(fetchState == "CALL") {
            fetch(context.origin[context.origin.length - 1].nSN);
        }
    }, [ fetchState ]);

    useEffect(() => {
        if(context.state == "CONCAT") {
            setCount(context.latestLength);
        } 
        
        if(context.state == "CHECK" && fetchState != "END") {
            if(count == context.list.length) {
                fetch(context.origin[context.origin.length - 1].nSN);
            }
        }
    }, [ context.state ]);

    const listScroll = () => {
        const scrollTop = listRef.current!.scrollTop;
        const scrollHeight = listRef.current!.scrollHeight;
        const clientHeight = listRef.current!.clientHeight;
        
        if(scrollTop + clientHeight >= scrollHeight) {
            if(fetchState == "DONE") {
                setFetchState("CALL");
            }
        }
    }

    return (
        <div ref={listRef} onScroll={listScroll} style={{overflowY: "auto", height: "100%"}}>
            { props.children }
        </div>
    );
}

export default ListView;