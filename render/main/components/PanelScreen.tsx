import React from 'react';
import PanelBox from './PanelBox';
import PanelItemBox from './PanelItemBox';
import ScreenBox from './ScreenBox';
import ListAuctionView from './ListView/ListAuctionView';
import OptionView from './OptionView/OptionView';

const PanelScreenStyle = {
    display: 'flex' as const,
    width: '100%',
    height: '100%',
    flexDirection: 'row' as const,
};

const PanelScreen = (_: any) => {
    return (
        <div style={PanelScreenStyle}>
            <PanelBox>
                <PanelItemBox item='LIST_VIEW' routeView={<ListAuctionView/>} name='경매장 기록'></PanelItemBox>
                <PanelItemBox item='OPTION' routeView={<OptionView/>} name='옵션'></PanelItemBox>
            </PanelBox>
            <ScreenBox>
            </ScreenBox>
        </div>
    );
};

export default PanelScreen;