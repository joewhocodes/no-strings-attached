import './App.css';
import Instruments from './Instruments';
import AddInstrument from './AddInstrument';

function App() {

    return (
        <div style={{ width: '90%', margin: 'auto auto', textAlign: 'center' }}>
            <h1>Homepage</h1>
            <h2>My Instruments</h2>
            <Instruments/>
            <AddInstrument/>
        </div>
    );
}

export default App;
