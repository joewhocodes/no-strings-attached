import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import store from './store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <ChakraProvider>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </ChakraProvider>
);
