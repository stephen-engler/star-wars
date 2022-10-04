import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import App from './App';
import { Provider, rootStore } from './models/Root';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //<React.StrictMode>
    <Provider value={rootStore}>
        <App />
        <ToastContainer />
    </Provider>
    //</React.StrictMode>
);
