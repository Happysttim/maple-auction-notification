import React, { useContext } from 'react';
import { RecordListProvider } from '../contexts/RecordListContext';
import { RouteViewContext } from '../contexts/RouteViewContext';
import Watcher from './Watcher';

const ScreenBoxStyle = {
    backgroundColor: 'white',
    flexGrow: 2,
    zIndex: 1,
};

const ScreenBox = (_: any) => {
    const context = useContext(RouteViewContext);

    return (
        <RecordListProvider>
            <Watcher/>
            <div style={ScreenBoxStyle}>
            {
                context.routeView
            }
            </div>
        </RecordListProvider>
    );
};

export default ScreenBox;