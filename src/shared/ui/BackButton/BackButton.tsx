import React from 'react';
import { Icon, IconType } from '../Icon/Icon';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import { useTranslation } from 'react-i18next';
import cls from './BackButton.module.scss'

export const BackButton = () => {
    const { t } = useTranslation();

    const navigateBack = () => {
        window.history.back();
    }
    
    return (
        <div className={cls.backBtn} onClick={navigateBack}>
            <Icon Svg={ArrowIcon} type={IconType.FILL} /> {t('Back')}
        </div>
    );
};
