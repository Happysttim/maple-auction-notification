import React, { createContext, useReducer, ReactNode, Dispatch, useContext } from "react";

export type SelectedItem = "VIEW_AUCTION_LIST" | "VIEW_OPTION";

const SelectedItemReducer = (state: SelectedItem, action: SelectedItem): SelectedItem => {
    switch(action) {
        case "VIEW_AUCTION_LIST":
            return "VIEW_AUCTION_LIST";
        case "VIEW_OPTION":
            return "VIEW_OPTION";
    }
}

export const SelectedItemContext = createContext<SelectedItem>("VIEW_AUCTION_LIST");
export const SelectedItemDispatch = createContext<Dispatch<SelectedItem> | null>(null);

export const SelectedItemProvider = ({ children }: { children: React.ReactNode }) => {
    const [ selected, dispatch ] = useReducer(SelectedItemReducer, 'VIEW_AUCTION_LIST');

    return (
        <SelectedItemContext.Provider value={selected}>
            <SelectedItemDispatch.Provider value={dispatch}>
                {children}
            </SelectedItemDispatch.Provider>
        </SelectedItemContext.Provider>
    );
}