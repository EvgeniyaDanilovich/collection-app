import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { localStorageKeys } from '../../../shared/const/localStorage';
import { ReactComponent as LangIcon } from '../../../shared/assets/icons/lang.svg';
import { Icon, IconType } from '../../../shared/ui/Icon/Icon';
import cls from './LangSwitcher.module.scss';


export const LangSwitcher = memo(() => {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        const newLang = i18n.language === t('ru') ? t('en') : t('ru');
        i18n.changeLanguage(newLang);
        localStorage.setItem(localStorageKeys.LANG, newLang);
    };

    return (
        <div onClick={toggleLang} className={cls.LangSwitcher}>
            <Icon Svg={LangIcon} type={IconType.FILL} />
            <span className={'ms-1'}>{i18n.language === t('en') ? t('ru') : t('en')}</span>
        </div>
    );
});