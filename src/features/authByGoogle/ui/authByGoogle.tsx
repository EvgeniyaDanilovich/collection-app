import React, { useEffect, useState } from 'react';

declare global {
    interface Window {
        google: any;
    }
}

export const AuthByGoogle = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleCredentialResponse = (response: any) => {
        console.log(5);
        console.log(response);
    }

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        // script.onload = initGoogleSignIn;

        script.onload = () => {
            window.google.accounts.id.initialize({
                client_id: '311949652373-f818cd1vvsh60im45h1novi31vt3oovd.apps.googleusercontent.com',
                callback: handleCredentialResponse
            });
        };
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <div id="g_id_onload"
                 data-client_id="311949652373-f818cd1vvsh60im45h1novi31vt3oovd.apps.googleusercontent.com"
                 data-context="signin"
                 data-ux_mode="popup"
                 // data-callback="handleCredentialResponse"
                 data-auto_prompt="false">
            </div>

            <div className="g_id_signin"
                 data-type="standard"
                 data-shape="rectangular"
                 data-theme="outline"
                 data-text="signin_with"
                 data-size="large"
                 data-logo_alignment="left">
            </div>
        </div>
    );
};

// const handleLoginSuccess = (response: any) => {
//     console.log('Аутентификация успешна. Получен токен:', response.accessToken);
//     setIsLoggedIn(true);
// };
//
// const handleLoginFailure = (error: any) => {
//     console.error('Ошибка аутентификации:', error);
//     setIsLoggedIn(false);
// };
// const client = google.accounts.oauth2.initCodeClient({
//     client_id: '311949652373-f818cd1vvsh60im45h1novi31vt3oovd.apps.googleusercontent.com',
//     scope: 'https://www.googleapis.com/auth/calendar.readonly',
//     ux_mode: 'popup',
//     // callback: (response) => {
//     // },
// });

// const initGoogleSignIn = () => {
//     window.gapi.load('auth2', () => {
//         const auth2 = window.gapi.auth2.init({
//             client_id: '311949652373-f818cd1vvsh60im45h1novi31vt3oovd.apps.googleusercontent.com',
//             scope: 'email profile openid',
//         });
//
//         auth2.attachClickHandler('google-signin-button', {}, handleLoginSuccess, handleLoginFailure);
//     });
// };

{/* {!isLoggedIn ? ( */}
{/*     <button id="google-signin-button" onClick={client.requestCode()}>Войти через Google</button> */}
{/* ) : ( */}
{/*     <div> */}
{/*         <p>Вы успешно вошли через Google!</p> */}
{/*     </div> */}
{/* )} */}