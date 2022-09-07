import './App.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();

    const logIn = () => {
        navigate("/Profile")
    }

    return (
        <>
            <div className="App container">
                <Button onClick={() => logIn()}>Log in</Button>
            </div>
        </>
    );
}

export default App;
