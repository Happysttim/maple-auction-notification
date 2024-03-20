import ListViewHeader from './ListViewHeader';
import ListViewBody from './ListViewBody';

const ListAuctionView = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <ListViewHeader/>
            <ListViewBody/>
        </div>
    );
};

export default ListAuctionView;