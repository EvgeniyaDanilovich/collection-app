import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { Input } from '../../../../shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { signupUser } from '../../model/services/signupUser';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import cls from './SignupForm.module.scss';
import { ErrorAlert } from '../../../../shared/ui/ErrorAlert/ErrorAlert';
import { selectError } from '../../model/selectors/authSelectors';
import { authActions } from '../../model/slice/authSlice';

export const SignupForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const error = useSelector(selectError);

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

    const handleCloseError = useCallback(() => {
        dispatch(authActions.setError(undefined));
    }, [dispatch]);

    return (
        <>
            <form onSubmit={handleSubmit} className={cls.form}>
                <Input value={username} label={t('Name')} setValue={setUsername} />
                <Input value={email} label={t('Email')} setValue={setEmail} />
                <Input type={'password'} value={password} label={t('Password')} setValue={setPassword} />
                <Button variant="primary" type={'submit'} className={'mt-3 align-self-end w-50'}>{t('Sign up')}</Button>
            </form>
            {error && <ErrorAlert error={error} onClose={handleCloseError} />}
        </>
    );
};
