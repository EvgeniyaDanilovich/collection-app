import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { localStorageKeys } from '../../../shared/const/localStorage';

export const LangSwitcher = memo(() => {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        const newLang = i18n.language === 'ru' ? 'en' : 'ru';
        i18n.changeLanguage(newLang);
        localStorage.setItem(localStorageKeys.LANG, newLang);
    };

    return (
        <div
            onClick={toggleLang}
        >
           Switch lang
        </div>
    );
});