import React, { useContext } from "react";
import { RecordListProvider } from "../contexts/RecordListContext";
import { RouteViewContext } from "../contexts/RouteViewContext";

const ScreenBoxStyle = {
    backgroundColor: "white",
    flexGrow: 2,
    zIndex: 1,
}

const ScreenBox = (props: any) => {
    const context = useContext(RouteViewContext);

    return (
        <div style={ScreenBoxStyle}>
            <RecordListProvider>
            {
                context.routeView
            }
            </RecordListProvider>
        </div>
    )
}

export default ScreenBox;