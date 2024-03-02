import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const LangSwitcher = memo(() => {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <div
            onClick={toggleLang}
        >
           Switch lang
        </div>
    );
});