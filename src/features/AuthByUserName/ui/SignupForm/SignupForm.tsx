import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { Input } from '../../../../shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Button, Form, Spinner } from 'react-bootstrap';
import { signupUser } from '../../model/services/signupUser';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import cls from '../Form.module.scss';
import { ErrorAlert } from '../../../../shared/ui/ErrorAlert/ErrorAlert';
import { selectError, selectIsLoading } from '../../model/selectors/authSelectors';
import { authActions } from '../../model/slice/authSlice';
import { AuthByGoogle } from '../../../authByGoogle';

export const SignupForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validated, setValidated] = useState(false);
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    const redirectToLogin = () => {
        navigate(RoutePath.login);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setValidated(true);
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        e.preventDefault();
        const data = {
            username, email, password
        };
        dispatch(signupUser({ data, redirectToLogin }));
    };

    const handleCloseError = useCallback(() => {
        dispatch(authActions.setError(undefined));
    }, [dispatch]);

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className={cls.form}>
                <Form.Group className="mb-2">
                    <Input value={username} label={t('Name')} setValue={setUsername} required />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Input value={email} label={t('Email')} setValue={setEmail} type={'email'} required />
                    {email && <Form.Control.Feedback type="invalid">Incorrect format</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-2">
                    <Input type={'password'} value={password} label={t('Password')} setValue={setPassword} required />
                </Form.Group>

                {isLoading ? (
                        <Button variant="primary" disabled className={'mt-3'}>
                            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                            Loading...
                        </Button>
                    ) :
                    <Button variant="primary" type={'submit'} className={'mt-3'}>{t('Sign up')}</Button>
                }
            </Form>

            <div className={cls.googleAuth}>
                <AuthByGoogle />
            </div>
            {error && <ErrorAlert error={error} onClose={handleCloseError} />}
        </>
    );
};
