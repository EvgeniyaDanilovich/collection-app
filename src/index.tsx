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
import { ThemeProvider } from './app/providers/ThemeProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <GoogleOAuthProvider clientId="311949652373-f818cd1vvsh60im45h1novi31vt3oovd.apps.googleusercontent.com">
        <BrowserRouter>
            <Provider store={store}>
                <ErrorBoundary>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ErrorBoundary>
            </Provider>
        </BrowserRouter>
    </GoogleOAuthProvider>
);

reportWebVitals();
