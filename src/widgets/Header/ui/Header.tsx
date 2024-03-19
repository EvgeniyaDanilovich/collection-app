import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, selectIsAdmin, selectIsAuth } from '../../../features/AuthByUserName';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
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
        dispatch(authActions.setIsAdmin(false));
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
        <header className={'pb-3 pt-3 mb-0 mb-md-4'}>
            <Navbar expand="md">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Offcanvas
                        id={'offcanvasNavbar-expand-md'}
                        aria-labelledby={'offcanvasNavbarLabel-expand-md'}
                        placement="end"
                    >
                        <Offcanvas.Header className={cls.header} closeButton></Offcanvas.Header>
                        <Offcanvas.Body className={cls.body} >
                                <Nav className={'align-items-center column-gap-4 row-gap-3 mb-3'}>
                                    <NavLink to={`${RoutePath.main}`} className={cls.link}>{t('Main page')}</NavLink>
                                    <NavLink to={`${RoutePath.collections}`} className={cls.link}>{t('Collections')}</NavLink>
                                    {isAdmin && <NavLink to={`${RoutePath.admin}`} className={cls.link}>{t('Admin page')}</NavLink>}

                                    {isAuth ?
                                        (<>
                                            {userId && <NavLink to={`${RoutePath.profile}${userId}`} className={cls.link}>{t('My profile')}</NavLink>}
                                            <div onClick={logoutUser} className={`${cls.logout} ${cls.text}`}>
                                                {t('Log out')}
                                                <Icon Svg={LogOutIcon} type={IconType.STROKE} />
                                            </div>
                                        </>)
                                        : (<>
                                                <NavLink className={`ms-auto ${cls.linkSecond}`} to={`${RoutePath.login}`}>{t('Log in')}</NavLink>
                                                <NavLink className={cls.linkSecond} to={`${RoutePath.signup}`}>{t('Sign up')}</NavLink>
                                            </>
                                        )
                                    }
                                </Nav>

                            <div className={'d-flex align-items-center justify-content-between flex-wrap'}>
                                <div className={cls.searchInput}>
                                    <Input value={value} setValue={setValue} />
                                    <div onClick={onSearch} className={cls.searchIcon}>
                                        <Icon Svg={SearchIcon} color={IconColor.SECONDARY} type={IconType.STROKE} />
                                    </div>
                                </div>
                                <div className={'d-flex gap-4 align-items-center md-m-auto'}>
                                    <ThemeSwitcher />
                                    <LangSwitcher />
                                </div>
                            </div>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    );
};
