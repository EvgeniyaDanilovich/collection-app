import React from 'react';
import { LoginForm, selectIsAuth } from '../../../features/AuthByUserName';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';

const LoginPage = () => {
    const isAuth = useSelector(selectIsAuth);

    if (isAuth) {
        return <Navigate to={RoutePath.main} />
    }

    return (
        <>
            <LoginForm />
        </>
    );
};

export default LoginPage;