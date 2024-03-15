import { useContext } from 'react';
import { Theme, ThemeContext } from './ThemeContext';
import { localStorageKeys } from '../../../../shared/const/localStorage';

export interface UseThemeResult {
    theme: Theme;
    switchTheme: () => void;
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const switchTheme = () => {
        const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;

        setTheme?.(newTheme);
        document.body.className = newTheme;
        localStorage.setItem(localStorageKeys.THEME, newTheme);
    };

    return { theme: theme || Theme.LIGHT, switchTheme };
};
