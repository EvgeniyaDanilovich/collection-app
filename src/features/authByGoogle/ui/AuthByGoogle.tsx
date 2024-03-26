import React, { useEffect, useState } from 'react';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';

export const AuthByGoogle = () => {
    const [ userToken, setUserToken ] = useState('');
    const [ user, setUser ] = useState<any>(null);

    const responseMessage = (response: any) => {
        console.log(response);
        setUserToken(response.credential)
    };
    const errorMessage = () => {
        console.log('error');
    };

    const logOut = () => {
        googleLogout();
    };

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(()=>{
        console.log(user);
    }, [user])

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
                    // setProfile(data);
                })
                .catch(error => {
                    console.error('Ошибка при получении профиля пользователя:', error);
                });
        }
    }, [user]);

    return (
        <>
            {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
            <button onClick={() => login()}>Sign in with Google 🚀 </button>
            <button onClick={logOut}>Log out</button>
        </>
    );
};
