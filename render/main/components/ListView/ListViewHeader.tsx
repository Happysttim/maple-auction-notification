import FilterBox from "./FilterBox";
import SelectBox from "./SelectBox";
import PushTypeBox from "./PushTypeBox";
import DateBox from "./DateBox";
import MesoBox from "./MesoBox";

const ListViewHeader = () => {
    return (
        <div style={{ borderBottom: "1px solid rgba(0,0,0,0.3)" }}>
            <FilterBox>
                <SelectBox/>
                <PushTypeBox/>
                <DateBox/>
            </FilterBox>
            <MesoBox/>
        </div>     
    );
}

export default ListViewHeader;