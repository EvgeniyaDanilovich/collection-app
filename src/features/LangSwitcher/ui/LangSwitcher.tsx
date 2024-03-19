import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LangIcon } from '../../../shared/assets/icons/lang.svg';
import { Icon, IconType } from '../../../shared/ui/Icon/Icon';
import cls from './LangSwitcher.module.scss';


export const LangSwitcher = memo(() => {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <div onClick={toggleLang} className={cls.LangSwitcher}>
            <Icon Svg={LangIcon} type={IconType.FILL} />
            <span className={'ms-1'}>{t('Lang')}</span>
        </div>
    );
});