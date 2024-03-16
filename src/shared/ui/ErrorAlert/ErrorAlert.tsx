import React, { memo } from 'react';
import { Alert, CloseButton } from 'react-bootstrap';
import cls from './ErrorAlert.module.scss';

interface Props {
    error: string;
    onClose: () => void;
}

export const ErrorAlert = memo(({ error, onClose }: Props) => {
    return (
        <Alert className={cls.alert} variant={'danger'}>
            {error}
            <CloseButton onClick={onClose} />
        </Alert>
    );
});
