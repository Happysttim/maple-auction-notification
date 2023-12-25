import React, { createContext, useReducer, Dispatch } from "react";
import ListAuctionView from "../components/ListAuctionView";

export type RouteViewList = "LIST_VIEW" | "OPTION";

export type RouteViewState = {
    routeView: React.ReactNode,
    name: RouteViewList
}

const SelectedItemReducer = (_: RouteViewState, action: RouteViewState): RouteViewState => {
    return action;
}

export const RouteViewContext = createContext<RouteViewState>({
    name: "LIST_VIEW",
    routeView: <ListAuctionView></ListAuctionView>
});

export const RouteViewDispatch = createContext<Dispatch<RouteViewState> | null>(null);

export const RouteViewProvider = ({ children }: { children: React.ReactNode }) => {
    const [ selected, dispatch ] = useReducer(SelectedItemReducer, {
        name: "LIST_VIEW",
        routeView: <ListAuctionView></ListAuctionView>
    });

    return (
        <RouteViewContext.Provider value={selected}>
            <RouteViewDispatch.Provider value={dispatch}>
                {children}
            </RouteViewDispatch.Provider>
        </RouteViewContext.Provider>
    );
}