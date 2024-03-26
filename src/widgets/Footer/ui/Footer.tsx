import React from 'react';
import cls from './Footer.module.scss'
import { Container } from 'react-bootstrap';
import Logo from '../../../shared/assets/images/logo.png'
import { useTranslation } from 'react-i18next';

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer>
            <Container  className={cls.footer}>
                <img src={Logo} alt={'Logo'} />
                <p>{t('Created by')} <a href={'https://github.com/EvgeniyaDanilovich'}>{t('Evgeniya Danilovich')}</a></p>
            </Container>
        </footer>
    );
};
