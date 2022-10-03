import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StarWarsContextProvider } from './context/StarWarsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //<React.StrictMode>
    <StarWarsContextProvider>
        <App />
    </StarWarsContextProvider>
    //</React.StrictMode>
);
