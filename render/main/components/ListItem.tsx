import react from 'react';
import world from '../utils/maple';

export type Item = {
    nSN: number, 
    worldId: number, 
    date: string, 
    characterName: string, 
    itemId: number, 
    itemName: string, 
    count: number, 
    price: number,
    pushType: number
}


const ListItem = (props: Item) => {
    return (
        <>
        </>
    )
}

export default ListItem;