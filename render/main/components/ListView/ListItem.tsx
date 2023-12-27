import React from "react";
import { AuctionRecord } from "../../utils/maple";

type ListItemProps = {
    children: React.ReactNode, 
    record: AuctionRecord, 
    key: number
}

const ListItemStyle = {
    width: "inherit",
    padding: "15px",
    backgroundColor: "white",
    display: "flex",
    borderBottom: "0.5px solid rgba(152,152,152,0.3)",
}

const ListItem = (props: ListItemProps) => {
    return (
        <div style={ListItemStyle}>
            { props.children }
        </div>
    );
}

export default ListItem;