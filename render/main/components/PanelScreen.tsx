import React from "react";
import PanelBox from "./PanelBox";
import PanelItemBox from "./PanelItemBox";
import ScreenBox from "./ScreenBox";
import ListAuctionView from "./ListAuctionView";

const PanelScreenStyle = {
    display: "flex" as const,
    width: "100%",
    height: "100%",
    flexDirection: "row" as const,
}

const PanelScreen = (props: any) => {
    return (
        <div style={PanelScreenStyle}>
            <PanelBox>
                <PanelItemBox item="LIST_VIEW" routeView={<ListAuctionView></ListAuctionView>} name="경매장 기록"></PanelItemBox>
                <PanelItemBox item="OPTION" routeView={<div>ㅎㅇ</div>} name="옵션"></PanelItemBox>
            </PanelBox>
            <ScreenBox>
            </ScreenBox>
        </div>
    )
}

export default PanelScreen;