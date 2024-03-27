import React, { useCallback, useState } from 'react';
import { Input } from '../../../../shared/ui/Input/Input';
import { Button, Form, Spinner } from 'react-bootstrap';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../../model/services/loginUser';
import cls from '../Form.module.scss';
import { selectError, selectIsLoading } from '../../model/selectors/authSelectors';
import { ErrorAlert } from '../../../../shared/ui/ErrorAlert/ErrorAlert';
import { authActions } from '../../model/slice/authSlice';
import { AuthByGoogle } from '../../../authByGoogle';

export const LoginForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [validated, setValidated] = useState(false);
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setValidated(true);
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    const handleCloseError = useCallback(() => {
        dispatch(authActions.setError(undefined));
    }, []);

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className={cls.form}>
                <Form.Group className="mb-2">
                    <Input value={username} label={t('Name')} setValue={setUsername} required />
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
                    (<Button variant="primary" type={'submit'} className={'mt-3'}>
                        {t('Log in')}
                    </Button>)
                }
            </Form>
            <div className={cls.googleAuth}>
                <AuthByGoogle />
            </div>
            {error && <ErrorAlert error={error} onClose={handleCloseError} />}
        </>
    );
};
