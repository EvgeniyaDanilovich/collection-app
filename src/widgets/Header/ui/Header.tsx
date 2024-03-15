import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, selectIsAdmin, selectIsAuth } from '../../../features/AuthByUserName';
import { Container } from 'react-bootstrap';
import { localStorageKeys } from '../../../shared/const/localStorage';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import { ThemeSwitcher } from '../../../features/ThemeSwitcher';
import { LangSwitcher } from '../../../features/LangSwitcher';
import { Input } from '../../../shared/ui/Input/Input';
import { fetchSearchData } from '../../../pages/SearchPage';
import { ReactComponent as LogOutIcon } from '../../../shared/assets/icons/log_out.svg';
import { ReactComponent as SearchIcon } from '../../../shared/assets/icons/search.svg';
import cls from './Header.module.scss';
import { Icon, IconColor, IconType } from '../../../shared/ui/Icon/Icon';

export const Header = () => {
    const { t } = useTranslation();
    const isAuth = useSelector(selectIsAuth);
    const isAdmin = useSelector(selectIsAdmin);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem(localStorageKeys.USER_ID);
    const [value, setValue] = useState('');

    const logoutUser = () => {
        dispatch(authActions.setIsAuth(false));
        localStorage.removeItem(`${localStorageKeys.USER_ID}`);
        localStorage.removeItem(`${localStorageKeys.ADMIN}`);
        navigate(`${RoutePath.login}`);
    };

    const onSearch = () => {
        if (value) {
            if (window.location.pathname !== RoutePath.search) {
                navigate(`${RoutePath.search}`);
            }
            dispatch(fetchSearchData(value));
        }
    };

    return (
        <header className={'pb-3 pt-3 mb-4'}>
            <Container>
                <div className={'d-flex align-items-center gap-4 mb-3'}>
                    <NavLink to={`${RoutePath.main}`} className={cls.link}>{t('Main page')}</NavLink>
                    <NavLink to={`${RoutePath.collections}`} className={cls.link}>{t('Collections')}</NavLink>
                    {isAdmin && <NavLink to={`${RoutePath.admin}`} className={cls.link}>{t('Admin page')}</NavLink>}
                    {isAuth ?
                        (<>
                            {userId && <NavLink to={`${RoutePath.profile}${userId}`} className={cls.link}>{t('My profile')}</NavLink>}
                            <div onClick={logoutUser} className={'ms-auto'}><Icon Svg={LogOutIcon} type={IconType.STROKE} /></div>
                        </>)
                        : (<>
                                <NavLink className={`ms-auto ${cls.linkSecond}`} to={`${RoutePath.login}`}>{t('Log in')}</NavLink>
                                <NavLink className={cls.linkSecond} to={`${RoutePath.signup}`}>{t('Sign up')}</NavLink>
                            </>
                        )
                    }
                </div>

                <div className={'d-flex align-items-center justify-content-between'}>
                    <div className={cls.searchInput}>
                        <Input value={value} setValue={setValue} />
                        <div onClick={onSearch} className={cls.searchIcon}>
                            <Icon Svg={SearchIcon} color={IconColor.SECONDARY} type={IconType.STROKE} />
                        </div>
                    </div>
                    <div className={'d-flex gap-4'}>
                        <ThemeSwitcher />
                        <LangSwitcher />
                    </div>
                </div>
            </Container>
        </header>
    );
};
