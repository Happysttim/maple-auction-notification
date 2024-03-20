import { useContext, useEffect, useState } from 'react';
import { RecordListContext, RecordListDispatch } from '../../contexts/RecordListContext';

const Style = {
    BoxStyle: {
        letterSpacing: '-0.5pt',
        fontSize: '16pt',
        color: 'black',
        display: 'flex' as const,
        justifyContent: 'space-between' as const,
        margin: '20px',
    },
    ContentStyle: {
        BoxStyle: {
            width: 'auto',
        },

        MesoStyle: {
            fontFamily: 'NanumGothicExtraBold'
        }
    },
};

const MesoBox = () => {

    const recordContext = useContext(RecordListContext);
    const dispatch = useContext(RecordListDispatch);

    if(!dispatch) {
        throw new Error('Cannot find RecordListDispatch');
    }

    const [ meso, setMeso ] = useState(0);
    const [ amount, setAmount ] = useState(0);

    useEffect(() => {
        if(recordContext.state != 'ERROR') {
            let addition = 0, start = 0, end = 0;

            switch(recordContext.state) {
                case 'ADD':
                case 'CONCAT':
                    if(amount != recordContext.state.length) {
                        start = recordContext.state == 'CONCAT' ? amount : 0;
                        end = Math.abs((recordContext.state == 'CONCAT' ? 0 : start) - recordContext.filtered.length);
                    }
                break;
                case 'CHECK':
                case 'FILTER':
                    start = 0;
                    end = recordContext.filtered.length;
                break;
            }

            for(let i = start; i < end; i++) {
                if(recordContext.filtered[i].pushType == 1) {
                    addition += recordContext.filtered[i].price;
                }
            }

            setMeso(meso => (recordContext.state == 'ADD' || recordContext.state == 'CONCAT') ? meso + addition : addition);
            setAmount(recordContext.filtered.length);

            if(recordContext.state != 'CHECK') {
                dispatch({
                    type: 'CHECK',
                });
            }
        }
    }, [ recordContext.filtered ]);

    return (
        <div style={Style.BoxStyle}>
            <div style={Style.ContentStyle.BoxStyle}>
                <span>{ meso.toLocaleString() }메소</span>
            </div>
            <div style={Style.ContentStyle.BoxStyle}>
                <span>{ amount }건</span>
            </div>
        </div>
    );
};

export default MesoBox;