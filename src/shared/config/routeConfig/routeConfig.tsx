import { RouteProps } from 'react-router-dom';
import { MainPage } from '../../../pages/MainPage';
import { LoginPage } from '../../../pages/LoginPage';
import { SignupPage } from '../../../pages/SignupPage';
import { ProfilePage } from '../../../pages/ProfilePage';
import { CollectionPage } from '../../../pages/CollectionPage';
import { NotFoundPage } from '../../../pages/NotFoundPage';
import { ItemPage } from '../../../pages/ItemPage';
import { AdminPage } from '../../../pages/AdminPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    SIGNUP = 'signup',
    ADMIN = 'admin',
    PROFILE = 'profile',
    COLLECTION = 'collection',
    ITEM = 'item',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.SIGNUP]: '/signup',
    [AppRoutes.ADMIN]: '/admin',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    // [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.COLLECTION]: '/collection/', // + :id
    [AppRoutes.ITEM]: '/articles/', // + :id
    // последний
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    [AppRoutes.SIGNUP]: {
        path: RoutePath.signup,
        element: <SignupPage />,
    },
    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: <AdminPage />,
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
    },
    [AppRoutes.COLLECTION]: {
        path: `${RoutePath.collection}:id`,
        element: <CollectionPage />,
    },
    [AppRoutes.ITEM]: {
        path: `${RoutePath.item}:id`,
        element: <ItemPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
