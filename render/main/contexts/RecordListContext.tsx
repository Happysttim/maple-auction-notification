import React, { createContext, Dispatch, useReducer } from "react";
import { AuctionRecord } from "../utils/maple";

type AuctionState = "CONCAT" | "CONDITION" | "ADD" | "CHECK" | "ERROR" | "START";
/**
 * pushType == 1 => SELL
 * pushType == 2 => EXPIRE
 * pushType == 0 => ALL <- DEFAULT
 * 
 * serverId == [] => ALL <- DEFAULT
 */
type Condition = {
    pushType: 0 | 1 | 2,
    worldId: number[],
    date?: {
        startDate: Date,
        endDate: Date,
    },
}

export type RecordListAction = {
    type: AuctionState,
    victim?: AuctionRecord[],
    condition?: Condition
};

export type RecordListState = {
    list: AuctionRecord[],
    origin: AuctionRecord[],
    latestLength: number,
    latestSN: number,
    state: AuctionState,
    condition: Condition,
}

export const RecordListContext = createContext<RecordListState>({
    list: [],
    origin: [],
    latestLength: 0,
    latestSN: 0,
    state: "START",
    condition: {
        pushType: 0,
        worldId: []
    }
});

export const RecordListDispatch = createContext<Dispatch<RecordListAction> | null>(null);

const RecordListReducer = (state: RecordListState, action: RecordListAction): RecordListState => {
    const condition = action.condition ?? state.condition;
    let target: AuctionRecord[] = [];

    const dateFormat = (s: string): Date => {
        const date = s.split(" ");
        const time = date[2].split(":");
    
        if(date[1] == "오후") {
            time[0] = (Number.parseInt(time[0]) + 12).toString();
        }
    
        return new Date(`${date[0]} ${time[0]}:${time[1]}`);
    }

    if(condition && (action.type != "CHECK" && action.type != "ERROR")) {
        target = (action.victim ?? state.list).filter(
            record => {
                if(condition.pushType != 0) {
                    if(condition.pushType != record.pushType) {
                        return false;
                    }
                }

                if(condition.worldId.length > 0) {
                    if(condition.worldId.indexOf(record.worldId) == -1) {
                        return false;
                    }
                }

                if(condition.date) {
                    const date = dateFormat(record.date);
                    if(condition.date.startDate > date || condition.date.endDate < date) {
                        return false;
                    }
                }

                return true;
            }
        )
    }

    const latestSN = (() => {
        if(state.list.length > 0) {
            return state.list[0].nSN;
        }

        if(target.length > 0) {
            return target[0].nSN; 
        }

        return 0;
    })();

    switch(action.type) {
        case "CONCAT":
            return {
                list: state.list.concat(target),
                origin: state.origin.concat(action.victim!),
                latestLength: state.list.length,
                latestSN: latestSN,
                state: "CONCAT",
                condition: state.condition
            }
        case "CONDITION":
            return {
                list: target,
                origin: state.origin,
                latestLength: target.length,
                latestSN: (target[0] ?? 0).nSN,
                state: "CONDITION",
                condition: action.condition!,
            };
        case "ADD":
            return {
                list: target.concat(state.list),
                origin: action.victim!.concat(state.origin),
                latestLength: state.list.length + target.length,
                latestSN: latestSN,
                state: "ADD",
                condition: state.condition
            };
        case "CHECK":
            return {
                list: state.list,
                origin: state.origin,
                latestLength: state.list.length,
                latestSN: (state.list[0] ?? state.origin[0]).nSN,
                state: "CHECK",
                condition: state.condition
            }
        case "START":
            return {
                list: [],
                origin: [],
                latestLength: 0,
                latestSN: 0,
                state: "START",
                condition: state.condition
            }
        default:
            return {
                list: [],
                origin: [],
                latestLength: 0,
                latestSN: 0,
                state: "ERROR",
                condition: {
                    pushType: 0,
                    worldId: [],
                }
            }
    }
}

export const RecordListProvider = ({ children }: { children: React.ReactNode }) => {
    const [ context, dispatch ] = useReducer(RecordListReducer, {
        list: [],
        origin: [],
        latestLength: 0,
        latestSN: 0,
        state: "START",
        condition: {
            pushType: 2,
            worldId: [3]
        }
    });

    return (
        <RecordListContext.Provider value={ context }>
            <RecordListDispatch.Provider value={ dispatch }>
                { children }
            </RecordListDispatch.Provider>
        </RecordListContext.Provider>
    )
}