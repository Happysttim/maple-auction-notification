import React from 'react';

const CardStyle = {
    width: "770px",
    height: "60px",
    backgroundColor: "white",
    filter: "drop-shadow(rgba(0,0,0,25) 0px 4px 4px)",
    display: "flex" as const,
    padding: "10px",
    borderRadius: "20px",
    margin: "15px auto"
}

type CardProps = {
    children: React.ReactNode,
    key: number
}

const CardEquals = (prevCard: CardProps, nextCard: CardProps): boolean => {
    console.log(prevCard.key, nextCard.key);
    return prevCard.key == nextCard.key;
}

const Card = ({ children }: CardProps) => {
    return (
        <div style={CardStyle}>
            { children }
        </div>
    );
}

export default Card; //React.memo(Card, CardEquals);