import React, { useState } from 'react';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button } from 'react-bootstrap';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../../model/services/loginUser';
import { selectIsAuth } from '../../model/selectors/authSelectors';
import { useNavigate } from 'react-router-dom';

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
        <form onSubmit={handleSubmit} className={'flex flex-col'}>
            <Input value={username} label={t('Name')} setValue={setUsername} />
            <Input type={'password'} value={password} label={t('Password')} setValue={setPassword} />
            <Button variant="primary" type={'submit'}>{t('Log in')}</Button>
        </form>
    );
};
