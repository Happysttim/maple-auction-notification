import PanelScreen from "./components/PanelScreen";
import { RecordListProvider } from "./contexts/RecordListContext";

import { SelectedItemProvider } from "./contexts/SelectedItemContext";

const App = () => {
    return (
        <SelectedItemProvider>
            <RecordListProvider>
                <PanelScreen>
                </PanelScreen>
            </RecordListProvider>
        </SelectedItemProvider>
    );
}

export default App;