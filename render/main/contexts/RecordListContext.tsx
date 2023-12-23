import React, { createContext, Dispatch, useReducer } from "react";
import { AuctionRecord } from "../utils/maple";

type ActionState = "CONCAT" | "SET" | "ADD" | "CHECK";

export type RecordListAction = {
    type: ActionState,
    victim: AuctionRecord[]
};

export type RecordListState = {
    list: AuctionRecord[],
    new: AuctionRecord[],
    state: ActionState
}

export const RecordListContext = createContext<RecordListState>({
    list: [],
    new: [],
    state: "CHECK"
});

export const RecordListDispatch = createContext<Dispatch<RecordListAction> | null>(null);

const RecordListReducer = (state: RecordListState, action: RecordListAction): RecordListState => {
    switch(action.type) {
        case "CONCAT":
            return {
                list: state.list.concat(action.victim),
                new: action.victim,
                state: "CONCAT"
            }
        case "SET":
            return {
                list: action.victim,
                new: action.victim,
                state: "SET",
            };
        case "ADD":
            return {
                list: action.victim.concat(state.list),
                new: action.victim,
                state: "ADD"
            };
        case "CHECK":
            return {
                list: state.list,
                new: [],
                state: "CHECK"
            }
        default:
            return {
                list: [],
                new: [],
                state: "CHECK",
            }
    }
}

export const RecordListProvider = ({ children }: { children: React.ReactNode }) => {
    const [ context, dispatch ] = useReducer(RecordListReducer, {
        list: [],
        new: [],
        state: "CHECK"
    });

    return (
        <RecordListContext.Provider value={ context }>
            <RecordListDispatch.Provider value={ dispatch }>
                { children }
            </RecordListDispatch.Provider>
        </RecordListContext.Provider>
    )
}