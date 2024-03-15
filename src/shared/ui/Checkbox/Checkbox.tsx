import React, { memo } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
    checked: boolean,
    setChecked: (value: boolean) => void,
    label?: string;
}

export const Checkbox = memo(({ checked, setChecked, label }: Props) => {
    const onCheckedHandler = () => {
        setChecked(!checked);
    };

    return (
        <div className={'d-flex gap-2'}>
            <Form.Check type={'checkbox'} checked={checked} onChange={onCheckedHandler} />
            {label && <Form.Label>{label}</Form.Label>}
        </div>
    );
});
