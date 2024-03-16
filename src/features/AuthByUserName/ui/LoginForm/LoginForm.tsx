import React, { useCallback, useState } from 'react';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button } from 'react-bootstrap';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../../model/services/loginUser';
import cls from './LoginForm.module.scss';
import { selectError } from '../../model/selectors/authSelectors';
import { ErrorAlert } from '../../../../shared/ui/ErrorAlert/ErrorAlert';
import { authActions } from '../../model/slice/authSlice';

export const LoginForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const error = useSelector(selectError);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    const handleCloseError = useCallback(() => {
        dispatch(authActions.setError(undefined));
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit} className={cls.form}>
                <Input value={username} label={t('Name')} setValue={setUsername} className={'mb-2'} />
                <Input type={'password'} value={password} label={t('Password')} setValue={setPassword} />
                <Button variant="primary" type={'submit'} className={'mt-4 align-self-end w-50'}>{t('Log in')}</Button>
            </form>
            {error && <ErrorAlert error={error} onClose={handleCloseError} />}
        </>
    );
};
