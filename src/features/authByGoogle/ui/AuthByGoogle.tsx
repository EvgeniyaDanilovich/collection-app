import React, { useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../AuthByUserName/model/services/signupUser';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../AuthByUserName/model/services/loginUser';

export enum AuthActionType {
    LOGIN = 'login',
    SIGNUP = 'signup'
}

interface Props {
    authActionType: AuthActionType;
}

export const AuthByGoogle = ({ authActionType }: Props) => {
    const [user, setUser] = useState<any>(null);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        googleLogout();
    };

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        console.log(user);
    }, [user]);

    const redirectToMainPage = () => {
        navigate(RoutePath.main);
    };

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
                    console.log(data);
                    if (authActionType === AuthActionType.SIGNUP) {
                        const submitData = {
                            data: {
                                username: data.name,
                                email: data.email,
                                password: 'none',
                            },
                            redirectToLogin: redirectToMainPage
                        };
                        // dispatch(signupUser(submitData));
                        // dispatch(loginUser({username: data.name, password: 'none'}));

                        const firstAction = dispatch(signupUser(submitData));
                        firstAction.then((result) => {
                            dispatch(loginUser({ username: data.name, password: 'none' }));
                        })
                    } else if (authActionType === AuthActionType.LOGIN) {
                        dispatch(loginUser({username: data.name, password: 'none'}));
                    }
                })
                .catch(error => {
                    console.error('Ошибка при получении профиля пользователя:', error);
                });
        }
    }, [user]);

    return (
        <>
            <button onClick={() => login()}>Sign in with Google 🚀</button>
            <button onClick={logOut}>Log out</button>
        </>
    );
};
