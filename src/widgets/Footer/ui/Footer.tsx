import React from 'react';
import cls from './Footer.module.scss'
import { Container } from 'react-bootstrap';
import Logo from '../../../shared/assets/images/logo.png'

export const Footer = () => {
    return (
        <footer>
            <Container  className={cls.footer}>
                <img src={Logo} alt={'Logo'} />
                <p>Created by <a href={'https://github.com/EvgeniyaDanilovich'}>Evgeniya Danilovich</a></p>
            </Container>
        </footer>
    );
};
