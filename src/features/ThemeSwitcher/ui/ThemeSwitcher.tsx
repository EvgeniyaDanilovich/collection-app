import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../app/providers/ThemeProvider';
import { Icon, IconType } from '../../../shared/ui/Icon/Icon';
import { ReactComponent as ThemeIcon } from '../../../shared/assets/icons/theme.svg';
import cls from './ThemeSwitcher.module.scss'


export const ThemeSwitcher = () => {
    const { t } = useTranslation();
    const { theme, switchTheme } = useTheme();

    return (
        <div onClick={switchTheme} className={cls.ThemeSwitcher}>
            <Icon Svg={ThemeIcon} type={IconType.FILL} />
            <span className={'ms-2'}>{t('Switch theme')}</span>
        </div>
    );
};
