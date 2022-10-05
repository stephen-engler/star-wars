import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import App from './App';
import { Provider, rootStore } from './models/Root';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider value={rootStore}>
        <App />
        <ToastContainer />
    </Provider>
);
