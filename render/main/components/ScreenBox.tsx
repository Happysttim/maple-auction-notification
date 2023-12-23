import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SelectedItemContext } from "../contexts/SelectedItemContext";

import ListAuctionView from "./ListAuctionView";

const ScreenBoxStyle = {
    backgroundColor: "white",
    flexGrow: 2,
    zIndex: 1,
    overflowY: "auto" as const,
}

const ScreenBox = (props: any) => {
    const selected = useContext(SelectedItemContext);
    // const [ view, setView ] = useState<React.ReactNode>(ListAuctionView);

    // useEffect(
    //     () => {
    //         switch(selected) {
    //             case "VIEW_AUCTION_LIST":
    //                 setView(ListAuctionView);
    //             break;
    //         }
    //     }, [ selected ]
    // );

    return (
        <div style={ScreenBoxStyle}>
            <ListAuctionView></ListAuctionView>
        </div>
    )
}

export default ScreenBox;