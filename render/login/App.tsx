import { LoginTypeProvider } from './contexts/LoginTypeContext';
import LoginBox from './components/LoginBox';

const App = () => {
    return (
        <LoginTypeProvider>
            <LoginBox></LoginBox> 
        </LoginTypeProvider>
    );
}

export default App;