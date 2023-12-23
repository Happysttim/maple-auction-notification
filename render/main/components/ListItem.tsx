import React from "react";

type ListItemProps = {
    children: React.ReactNode,
    key: number
}

const ListItemStyle = {
    width: "inherit",
    padding: "10px",
    backgroundColor: "white",
    display: "flex",
    borderBottom: "1px solid rgba(0,0,0,0.6)",
}

const ListItem = (props: ListItemProps) => {
    return (
        <div style={ListItemStyle}>
            { props.children }
        </div>
    );
}

export default ListItem;