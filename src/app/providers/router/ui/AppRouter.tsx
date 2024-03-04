import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from '../../../../shared/ui/Loader/Loader';
import { AppRoutesProps, routeConfig } from '../../../../shared/config/routeConfig/routeConfig';

export const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<Loader />}>
                {route.element}
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={element}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);
