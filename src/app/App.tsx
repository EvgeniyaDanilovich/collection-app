import React, { useEffect } from 'react';
import { Header } from '../widgets/Header';
import { localStorageKeys } from '../shared/const/localStorage';
import { AppDispatch } from './providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { authActions } from '../features/AuthByUserName';
import { AppRouter } from './providers/router';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import { useTheme } from './providers/ThemeProvider';

function App() {
    const dispatch: AppDispatch = useDispatch();
    const { i18n } = useTranslation();
    const { theme } = useTheme();

    useEffect(() => {
        const isAuth = localStorage.getItem(`${localStorageKeys.USER_ID}`);
        const isAdmin = localStorage.getItem(`${localStorageKeys.ADMIN}`);

        isAuth && dispatch(authActions.setIsAuth(true));
        isAdmin && dispatch(authActions.setIsAdmin(isAdmin !== 'false'));
    }, []);

    useEffect(() => {
        document.body.className = theme || 'app_light_theme';
    }, [theme]);

    return (
        <div className={'app'}>
            <Header />
            <Container>
                <AppRouter />
            </Container>
        </div>
    );
}

export default App;
