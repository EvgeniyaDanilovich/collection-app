import React, { useEffect, useState } from 'react';

declare global {
    interface Window {
        gapi: any;
    }
}

export const AuthByGoogle = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = (response: any) => {
        console.log('Аутентификация успешна. Получен токен:', response.accessToken);
        setIsLoggedIn(true);
    };

    const handleLoginFailure = (error: any) => {
        console.error('Ошибка аутентификации:', error);
        setIsLoggedIn(false);
    };

    const initGoogleSignIn = () => {
        window.gapi.load('auth2', () => {
            const auth2 = window.gapi.auth2.init({
                client_id: '311949652373-f818cd1vvsh60im45h1novi31vt3oovd.apps.googleusercontent.com',
                scope: 'email profile openid',
            });

            auth2.attachClickHandler('google-signin-button', {}, handleLoginSuccess, handleLoginFailure);
        });
    };

    // Загрузка API Google при монтировании компонента
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.onload = initGoogleSignIn;
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            {!isLoggedIn ? (
                <button id="google-signin-button">Войти через Google</button>
            ) : (
                <div>
                    <p>Вы успешно вошли через Google!</p>
                </div>
            )}
        </div>
    );
};
