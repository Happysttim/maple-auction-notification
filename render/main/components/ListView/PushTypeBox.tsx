import { useRef, useContext, useEffect } from 'react';
import { RecordListContext, RecordListDispatch } from '../../contexts/RecordListContext';

const Style = {
    BoxStyle: {
        display: 'flex',
        margin: 'auto 0',
    },

    LabelStyle: {
        letterSpacing: '-1pt',
        marginRight: '10px',
    }
};

const PushTypeBox = () => {

    const sellRef = useRef<HTMLInputElement>(null);
    const expireRef = useRef<HTMLInputElement>(null);
    const recordContext = useContext(RecordListContext);
    const dispatch = useContext(RecordListDispatch);

    if(!dispatch) {
        throw new Error('Cannot find RecordListDispatch');
    }

    useEffect(() => {
        if(recordContext.filter.pushType == 0) {
            sellRef.current!.checked = expireRef.current!.checked = true;
        } else {
            sellRef.current!.checked = recordContext.filter.pushType == 1;
            expireRef.current!.checked = recordContext.filter.pushType == 2;
        }
    }, []);

    const changePushType = () => {
        const type = ((): number => {
            if(sellRef.current!.checked && expireRef.current!.checked) {
                return 0;
            } else if(!sellRef.current!.checked && !expireRef.current!.checked) {
                return 3;
            } else {
                return sellRef.current!.checked ? 1 : 2;
            }
        })();

        dispatch({
            type: 'FILTER',
            filter: {
                pushType: type
            }
        });
    };

    return (
        <div style={Style.BoxStyle}>
            <label style={Style.LabelStyle}>
                <span>판매</span>
                <input type='checkbox' value='1' ref={sellRef} onChange={changePushType}/>
            </label>
            <label style={Style.LabelStyle}>
                <span>만료</span>
                <input type='checkbox' value='2' ref={expireRef} onChange={changePushType}/>
            </label>
        </div>
    );
};

export default PushTypeBox;