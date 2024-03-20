import { useContext, useState } from 'react';
import { RecordListContext, RecordListDispatch } from '../../contexts/RecordListContext';
import MultiSelect from './MultiSelect';
import MultiSelectOption from './MultiSelectOption';

import maple from '../../utils/maple';

const Style = {
    BoxStyle: {
        margin: '20px',
        width: '160px',
        display: 'flex' as const,
        borderBottom: '1px solid rgba(0,0,0,0.3)',
        paddingBottom: '5px',
    },

    LabelStyle: {
        width: 'inherit',
        height: 'inherit',
        display: 'inline-block' as const,
        textAlign: 'center' as const,
        fontWeight: '400',
        letterSpacing: '-1pt',
    },

    ArrowStyle: {
        display: 'inline-block' as const,
        width: '10px',
        height: '10px',
        borderLeft: '1px solid rgba(0,0,0,0.3)',
        borderBottom: '1px solid rgba(0,0,0,0.3)',
        transform: 'rotate(-45deg)',
        margin: 'auto 0',
        marginRight: '5px',
    }
};

const SelectBox = () => {

    const [ isSelect, setSelectState ] = useState<boolean>(false);
    const recordContext = useContext(RecordListContext);
    const dispatch = useContext(RecordListDispatch);

    if(!dispatch) {
        throw new Error('Cannot find RecordListDispatch');
    }

    const selectToggle = () => {
        setSelectState(isSelect ? false : true);
    };

    return (
        <>
            <div style={Style.BoxStyle} onClick={() => selectToggle()}>
                <span style={Style.LabelStyle}>
                {
                    (() => {
                        const count = recordContext.filter.worldId.length;
                        if(count == 0) {
                            return '모든 서버';
                        } else if(count == 1) {
                            return maple.worldToName(recordContext.filter.worldId[0]);
                        }

                        return '일부';
                    })()
                }
                </span>
                <div style={Style.ArrowStyle}></div>
            </div>
            <MultiSelect display={isSelect}>
                <MultiSelectOption id={1} value={maple.worldToName(1)}></MultiSelectOption>
                <MultiSelectOption id={2} value={maple.worldToName(2)}></MultiSelectOption>
                <MultiSelectOption id={3} value={maple.worldToName(3)}></MultiSelectOption>
                <MultiSelectOption id={4} value={maple.worldToName(4)}></MultiSelectOption>
                <MultiSelectOption id={5} value={maple.worldToName(5)}></MultiSelectOption>
                <MultiSelectOption id={6} value={maple.worldToName(6)}></MultiSelectOption>
                <MultiSelectOption id={7} value={maple.worldToName(7)}></MultiSelectOption>
                <MultiSelectOption id={8} value={maple.worldToName(8)}></MultiSelectOption>
                <MultiSelectOption id={9} value={maple.worldToName(9)}></MultiSelectOption>
                <MultiSelectOption id={10} value={maple.worldToName(10)}></MultiSelectOption>
                <MultiSelectOption id={11} value={maple.worldToName(11)}></MultiSelectOption>
                <MultiSelectOption id={12} value={maple.worldToName(12)}></MultiSelectOption>
            </MultiSelect>
        </>
    );
};

export default SelectBox;