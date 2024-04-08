import React, { useContext } from 'react';
import ItemImage from './ItemImage';
import ListItemContent from './ListItemContent';
import Bubble from './Bubble';
import ListItem from './ListItem';
import { RecordListContext } from '../../contexts/RecordListContext';
import maple, { dateFormat } from '../../utils/maple';
import dateCal from '../../utils/date-calculator';

const ListViewBody = () => {

    const context = useContext(RecordListContext);

    return (
        <div style={{overflowY: 'auto', height: '650px'}}>
            {
                context.filtered && context.filtered.map(record => {
                    return (
                        <ListItem record={record} key={record.nSN}>
                            <ItemImage itemCode={record.itemId} itemName={record.itemName}></ItemImage>
                            <ListItemContent>
                                <div style={{
                                    height: '100%',
                                }}>
                                    <Bubble value={record.pushType == 1 ? '판매' : '만료'} width='30px' backgroundColor={record.pushType == 1 ? '#FF9898' : '#D9D9D9'} fontColor={record.pushType == 1 ? 'white' : 'black'}></Bubble>
                                    <Bubble value={maple.worldToName(record.worldId)}></Bubble>
                                    <div style={{
                                        display: 'inline-block',
                                        float: 'right',
                                        margin: '4px'
                                    }}>
                                        <span style={{color: '#CBCBCB', fontFamily: 'NotoSansKR-Regular', fontSize: '10pt'}}>{ 
                                            (() => {
                                                const date = dateFormat(record.date);
                                                const now = new Date();

                                                const [ dYear, dMonth, dDay, dHour, dMin, dSeconds ] = [
                                                    dateCal.diffYear(now, date),
                                                    dateCal.diffMonth(now, date),
                                                    dateCal.diffDay(now, date),
                                                    dateCal.diffHours(now, date),
                                                    dateCal.diffMinutes(now, date),
                                                    dateCal.diffSeconds(now, date)
                                                ];

                                                if(dSeconds < 60) {
                                                    return <>{dSeconds + '초 전'}</>;
                                                }

                                                if(dMin < 60) {
                                                    return <>{dMin + '분 전'}</>;
                                                }

                                                if(dHour < 24) {
                                                    return <>{dHour + '시간 전'}</>;
                                                }

                                                if(dDay <= 31) {
                                                    return <>{dDay + '일 전'}</>;
                                                }

                                                if(dMonth < 12) {
                                                    return <>{dMonth + '달 전'}</>;
                                                }
                                                return <>{dYear + '년 전'}</>;
                                            })() 
                                        }</span>
                                    </div>
                                </div>
                                <div style={{
                                    height: '100%',
                                }}>
                                    <Bubble value={'x' + record.count}></Bubble>
                                    <span style={{
                                        fontSize: '11pt'
                                    }}>
                                        개가 {
                                            record.pushType == 1 ? record.price.toLocaleString() + '메소에 판매' : '만료'
                                        }되었습니다.
                                    </span>
                                    {
                                        (() => {
                                            if(record.new) {
                                                return (
                                                    <div style={{
                                                        display: 'inline-block',
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '6em',
                                                        backgroundColor: 'red',
                                                        float: 'right',
                                                        margin: '4px'
                                                    }}>
                                                    </div>
                                                );
                                            }

                                            return <></>;
                                        })()
                                    }
                                </div>
                            </ListItemContent>
                        </ListItem>
                    );
                })
            }
        </div>
    );
};

export default ListViewBody;