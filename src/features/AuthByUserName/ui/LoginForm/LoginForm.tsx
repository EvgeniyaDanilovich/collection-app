import React, { useState } from 'react';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button } from 'react-bootstrap';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../../model/services/loginUser';
import cls from './LoginForm.module.scss'

export const LoginForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    return (
        <form onSubmit={handleSubmit} className={cls.form}>
            <Input value={username} label={t('Name')} setValue={setUsername} className={'mb-2'} />
            <Input type={'password'} value={password} label={t('Password')} setValue={setPassword} />
            <Button variant="primary" type={'submit'} className={'mt-4 align-self-end w-50'}>{t('Log in')}</Button>
        </form>
    );
};
