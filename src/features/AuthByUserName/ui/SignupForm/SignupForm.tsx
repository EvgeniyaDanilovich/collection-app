import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { Input } from '../../../../shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { signupUser } from '../../model/services/signupUser';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import cls from './SignupForm.module.scss'

export const SignupForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const redirectToLogin = () => {
        navigate(RoutePath.login);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            username, email, password
        }
        dispatch(signupUser({ data, redirectToLogin }));
    };

    return (
        <form onSubmit={handleSubmit} className={cls.form}>
            <Input value={username} label={t('Name')} setValue={setUsername} />
            <Input value={email} label={t('Email')} setValue={setEmail} />
            <Input type={'password'} value={password} label={t('Password')} setValue={setPassword}  />
            <Button variant="primary" type={'submit'} className={'mt-3 align-self-end w-50'}>{t('Sign up')}</Button>
        </form>
    );
};
