import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Loader.scss';

export const Loader = () => {
    return (
    <div className={'lds-ellipsis'}>
        <div />
        <div />
        <div />
        <div />
    </div>
    );
};
// <Spinner animation="grow" role="status">
//     <span className="visually-hidden">Loading...</span>
// </Spinner>