import React from 'react';
import { LoginForm, selectIsAuth } from '../../../features/AuthByUserName';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
    const isAuth = useSelector(selectIsAuth);

    if (isAuth) {
        return <Navigate to={'/'} />
    }

    return (
        <>
            <LoginForm />
        </>
    );
};

export default LoginPage;