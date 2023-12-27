import ListViewHeader from "./ListViewHeader";
import ListViewBody from "./ListViewBody";
import Watcher from "./Watcher";

const ListAuctionView = () => {
    return (
        <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
            <Watcher/>
            <ListViewHeader/>
            <ListViewBody/>
        </div>
    )
}

export default ListAuctionView;