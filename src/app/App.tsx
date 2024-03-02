import React, { Suspense, useEffect } from 'react';
import './styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import { SignupPage } from '../pages/SignupPage';
import { Header } from '../widgets/Header';
import { LoginPage } from '../pages/LoginPage';
import { AdminPage } from '../pages/AdminPage';
import { ProfilePage } from '../pages/ProfilePage';
import { CollectionPage } from '../pages/CollectionPage';
import { localStorageKeys } from '../shared/const/localStorage';
import { AppDispatch } from './providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { authActions } from '../features/AuthByUserName';

function App() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const isAuth = localStorage.getItem(`${localStorageKeys.USER_ID}`);
        const isAdmin = localStorage.getItem(`${localStorageKeys.ADMIN}`);

        isAuth && dispatch(authActions.setIsAuth(true));
        isAdmin && dispatch(authActions.setIsAdmin(Boolean(isAdmin)));
    }, []);

    return (
        <div>
            <Header />
            <Suspense fallback="">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/profile/:id" element={<ProfilePage />} />
                    <Route path="/collection/:id" element={<CollectionPage />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
