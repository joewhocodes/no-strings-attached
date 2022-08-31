import './App.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <h1>Homepage</h1>
            <Button onClick={() => navigate('create')}>NEXT</Button>
        </div>
    );
}

export default App;
