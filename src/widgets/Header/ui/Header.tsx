import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, selectIsAuth } from '../../../features/AuthByUserName';
import { Button } from 'react-bootstrap';
import { localStorageKeys } from '../../../shared/const/localStorage';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { selectIsAdmin } from '../../../features/AuthByUserName/model/selectors/authSelectors';

export const Header = () => {
    const { t } = useTranslation();
    const isAuth = useSelector(selectIsAuth);
    const isAdmin = useSelector(selectIsAdmin);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(authActions.setIsAuth(false));
        localStorage.removeItem(`${localStorageKeys.USER_ID}`);
        navigate('/login');
    };

    return (
        <header>
            {isAuth ?
                <Button onClick={logoutUser}>{t('Log out')}</Button>
                : (<>
                        <NavLink to={'/login'}>{t('Log in')}</NavLink>
                        <NavLink to={'/signup'}>{t('Sign up')}</NavLink>
                    </>
                )
            }

            <NavLink to={'/'}>{t('Main page')}</NavLink>
            {isAdmin && <NavLink to={'/admin'}>{t('Admin page')}</NavLink>}
        </header>
    );
};
