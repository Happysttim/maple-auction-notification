import PanelScreen from "./components/PanelScreen";
import { RouteViewProvider } from "./contexts/RouteViewContext";

const App = () => {
    return (
        <RouteViewProvider>
            <PanelScreen>
            </PanelScreen>
        </RouteViewProvider>
    );
}

export default App;