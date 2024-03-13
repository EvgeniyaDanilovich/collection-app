import React, { useEffect } from 'react';
import './styles/App.scss';
import { Header } from '../widgets/Header';
import { localStorageKeys } from '../shared/const/localStorage';
import { AppDispatch } from './providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { authActions } from '../features/AuthByUserName';
import { AppRouter } from './providers/router';
import { useTranslation } from 'react-i18next';

function App() {
    const dispatch: AppDispatch = useDispatch();
    const { i18n } = useTranslation();

    useEffect(() => {
        const isAuth = localStorage.getItem(`${localStorageKeys.USER_ID}`);
        const isAdmin = localStorage.getItem(`${localStorageKeys.ADMIN}`);
        const lang = localStorage.getItem(`${localStorageKeys.LANG}`);

        isAuth && dispatch(authActions.setIsAuth(true));
        isAdmin && dispatch(authActions.setIsAdmin(isAdmin !== 'false'));

        if (lang) {
            i18n.changeLanguage(lang);
        }
    }, []);

    return (
        <div>
            <Header />
            {/* <Suspense fallback={<Loader />}> */}
                {/* <Routes> */}
                {/*     <Route path="/" element={<MainPage />} /> */}
                {/*     <Route path="/login" element={<LoginPage />} /> */}
                {/*     <Route path="/signup" element={<SignupPage />} /> */}
                {/*     <Route path="/admin" element={<AdminPage />} /> */}
                {/*     <Route path="/profile/:id" element={<ProfilePage />} /> */}
                {/*     <Route path="/collection/:id" element={<CollectionPage />} /> */}
                {/*     <Route path="/item/:id" element={<ItemPage />} /> */}
                {/*     <Route path="*" element={<NotFoundPage />} /> */}
                {/* </Routes> */}
                <AppRouter />
            {/* </Suspense> */}
        </div>
    );
}

export default App;
