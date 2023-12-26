import React, { useRef } from "react";

type ListViewProps = {
    children: React.ReactNode,
}

const ListView = (props: ListViewProps) => {
    const listRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={listRef} style={{overflowY: "auto", height: "650px"}}>
            { props.children }
        </div>
    );
}

export default ListView;