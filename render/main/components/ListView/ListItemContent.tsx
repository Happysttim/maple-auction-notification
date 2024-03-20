import React from 'react';

type ListItemContentProps = {
    children: React.ReactNode,
}

const ListItemContentStyle = {
    display: 'flex' as const,
    flexGrow: '2',
    flexDirection: 'column' as const,
    justifyContent: 'space-between' as const
};

const ListItemContent = (props: ListItemContentProps) => {
    return (
        <div style={ListItemContentStyle}>
            { props.children }
        </div>
    );
};

export default ListItemContent;