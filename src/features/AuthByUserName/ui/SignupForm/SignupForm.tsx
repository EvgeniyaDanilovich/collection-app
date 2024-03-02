import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { Input } from '../../../../shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { signupUser } from '../../model/services/signupUser';

export const SignupForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signupUser({ username, email, password }));
        console.log('sign up');
    };

    return (
        <form onSubmit={handleSubmit} className={'flex flex-col'}>
            <Input value={username} label={t('Name')} setValue={setUsername} />
            <Input value={email} label={t('Email')} setValue={setEmail} />
            <Input type={'password'} value={password} label={t('Password')} setValue={setPassword} />
            <Button variant="primary" type={'submit'}>{t('Sign up')}</Button>
        </form>
    );
};
