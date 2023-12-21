import React from 'react';
import maple from '../utils/maple';

type ItemImageProps = {
    itemCode: number
}

const ItemImageStyle = {
    width: "60px",
    height: "60px",
    marginRight: "10px"
}

const getItemIcon = (id: number): string => {
    // return `http://avatar.maplestory.nexon.co.kr/ItemIcon/${maple.toItemIcon(id)}`;
    return `https://xn--hz2b1j494a9mhnwh.com/images/${id}.png`
}

const ItemImage = (props: ItemImageProps) => {
    return (
        <>
            <img src={getItemIcon(props.itemCode)} style={ItemImageStyle} />
        </>
    )
}

export default ItemImage;