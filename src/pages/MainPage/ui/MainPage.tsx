import React from 'react';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '../../../widgets/LangSwitcher';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <div>
            {t('Main page')}
            <LangSwitcher />
        </div>
    );
};

export default MainPage;