import React, { ReactNode, useMemo, useState } from 'react';
import { Theme, ThemeContext } from '../lib/ThemeContext';
import { localStorageKeys } from '../../../../shared/const/localStorage';

const defaultTheme = localStorage.getItem(localStorageKeys.THEME) as Theme || Theme.LIGHT;

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
