import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import App from './components/app/App';

const root = document.getElementById('root');
const rootElement = ReactDOM.createRoot(root);
rootElement.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
