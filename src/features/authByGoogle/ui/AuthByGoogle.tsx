import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../AuthByUserName/model/services/signupUser';
import { loginUser } from '../../AuthByUserName/model/services/loginUser';
import { authActions } from '../../AuthByUserName';
import cls from './AuthByGoogle.module.scss';
import { ReactComponent as GoogleIcon } from '../../../shared/assets/icons/google.svg';

export const AuthByGoogle = () => {
    const [user, setUser] = useState<any>(null);
    const dispatch: AppDispatch = useDispatch();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка сети');
                    }
                    return response.json();
                })
                .then(data => {
                    const isExist = dispatch(loginUser({ username: data.name, password: 'none' }));

                    isExist.then((result) => {
                        if (result.payload === 'User not found') {
                            const submitData = {
                                data: {
                                    username: data.name,
                                    email: data.email,
                                    password: 'none',
                                }
                            };
                            dispatch(authActions.setError(''));
                            const firstAction = dispatch(signupUser(submitData));
                            firstAction.then(() => {
                                dispatch(loginUser({ username: data.name, password: 'none' }));
                            });
                        }
                    }).catch((e: any) => {
                        console.log(e);
                    });
                })
                .catch(error => {
                    console.error('Ошибка при получении профиля пользователя:', error);
                });
        }
    }, [user]);

    return (
        <button onClick={() => login()} className={cls.googleBtn}>
            Sign in with Google <GoogleIcon />
        </button>
    );
};
