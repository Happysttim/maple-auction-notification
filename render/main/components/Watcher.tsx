import React, { useContext, useLayoutEffect, useState } from "react";
import { RecordListDispatch } from "../contexts/RecordListContext";
import { AuctionRecord } from "../utils/maple";

window.ipcRenderer.send('START_WATCHER');

const Watcher = () => {
    const dispatch = useContext(RecordListDispatch);
    const [ watched, setState ] = useState<boolean>(false);

    if(!dispatch) {
        throw new Error("Cannot find RecordListDispatch");
    }

    const fetch = async () => {
        const auctionRecords = await window.ipcRenderer.invoke("AUCTION_HISTORY", 0) as AuctionRecord[];
        console.log(`FETCH!`);
        await dispatch({
            type: "ADD",
            records: auctionRecords 
        });

        await setState(false);
    }

    useLayoutEffect(() => {
        if(watched) {
            fetch();
        }
    }, [ watched ]);

    window.ipcRenderer.on('WATCHED', () => {
        setState(true);
    });

    return (<></>)
}

export default Watcher;