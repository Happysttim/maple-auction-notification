import React, { createContext, Dispatch, useEffect, useReducer, useState } from "react";
import { AuctionRecord, dateFormat } from "../utils/maple";

type FetchState = "START" | "CALL" | "END" | "NEW";

export type AuctionState = "CONCAT" | "ADD" | "CHECK" | "ERROR" | "FILTER";

export type Filter = {
    pushType: number,
    worldId: number[],
    date: {
        startDate?: Date,
        endDate?: Date,
    },
}

export type RecordListAction = {
    type: AuctionState,
    records?: AuctionRecord[],
    filter?: Partial<Filter>
};

export type RecordListState = {
    list: AuctionRecord[],
    filtered: AuctionRecord[],
    latest: number,
    state: AuctionState,
    filter: Filter,
}

export const RecordListContext = createContext<RecordListState>({
    list: [],
    filtered: [],
    latest: 0,
    state: "CHECK",
    filter: {
        pushType: 0,
        worldId: [],
        date: {
            startDate: undefined,
            endDate: undefined,
        }
    }
});

export const RecordListDispatch = createContext<Dispatch<RecordListAction> | null>(null);

const RecordListReducer = (state: RecordListState, action: RecordListAction): RecordListState => {
    const filter: Filter = state.filter;

    if(action.filter) {
        if(!isNaN(action.filter.pushType!)) {
            filter.pushType = action.filter.pushType!;
        }

        if(action.filter.worldId) {
            filter.worldId = action.filter.worldId;
        }

        if(action.filter.date) {
            filter.date = action.filter.date;
        }
    }

    const target = (((): AuctionRecord[] => {
        if(action.type == "FILTER") {
            return state.list;
        } else if(action.type == "ADD") {
            return [
                action.records![0]
            ];
        } else {
            return action.records!;
        }
    })() ?? []).filter(
        record => {
            if(filter.pushType != 0) {
                if(filter.pushType != record.pushType) {
                    return false;
                }
            }
            
            if(filter.worldId.length > 0) {
                if(!filter.worldId.includes(record.worldId)) {
                    return false;
                }
            }
            
            if(filter.date.startDate && filter.date.endDate) {
                const date = dateFormat(record.date);
                if(filter.date.startDate > date || filter.date.endDate < date) {
                    return false;
                }
            }
            
            return true;
        }
    );

    switch(action.type) {
        case "CONCAT":
            return {
                list: state.list.concat(action.records ?? []),
                filtered: state.filtered.concat(target),
                latest: action.records![action.records!.length - 1].nSN, 
                state: "CONCAT",
                filter: filter
            }
        case "ADD":
            return {
                list: action.records!.concat(state.list),
                filtered: target.concat(state.filtered),
                latest: state.latest,
                state: "ADD",
                filter: filter
            }
        case "CHECK":
        case "FILTER":
            return {
                list: state.list ?? [],
                filtered: action.type == "FILTER" ? target : state.filtered,
                latest: state.latest,
                state: action.type,
                filter: filter
            }
        case "ERROR":
            return {
                list: [],
                filtered: [],
                latest: 0,
                state: "ERROR",
                filter: filter
            }
    }
}

export const RecordListProvider = ({ children }: { children: React.ReactNode }) => {
    const [ fetchState, setFetchState ] = useState<FetchState>("START");
    const [ context, dispatch ] = useReducer(RecordListReducer, {
        list: [],
        filtered: [],
        latest: 0,
        state: "CHECK",
        filter: {
            pushType: 0,
            worldId: [],
            date: {
                startDate: undefined,
                endDate: undefined,
            }
        }
    });

    const load = async (lastSN: number) => {
        const auctionRecords = await window.ipcRenderer.invoke("AUCTION_HISTORY", lastSN) as AuctionRecord[];
        await new Promise((resolve) => setTimeout(() => { resolve(1) }, 1000));
        await setFetchState((!auctionRecords || auctionRecords.length < 20) ? "END" : "CALL");
        await dispatch({
            type: "CONCAT",
            records: auctionRecords 
        });
    }

    useEffect(() => {
        if(context.state == "CHECK" && fetchState != "END") {
            load(context.latest);
        }
    }, [ context.state ]);

    return (
        <RecordListContext.Provider value={ context }>
            <RecordListDispatch.Provider value={ dispatch }>
                { children }
            </RecordListDispatch.Provider>
        </RecordListContext.Provider>
    )
}