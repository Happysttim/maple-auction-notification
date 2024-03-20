import React from 'react';

const BoxStyle = {
    borderBottom: '1px solid rgba(0,0,0,0.3)',
    margin: '10px 0px',
    display: 'flex' as const,
};

const FilterBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={BoxStyle}>
            { children }
        </div>
    );
};

export default FilterBox;