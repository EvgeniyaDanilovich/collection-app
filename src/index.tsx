import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/index.scss';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/providers/StoreProvider/config/store';
import { Provider } from 'react-redux';
import './shared/config/i18n/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ErrorBoundary } from './app/providers/ErrorBoundary';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </Provider>
    </BrowserRouter>
    // </React.StrictMode>
);

reportWebVitals();
