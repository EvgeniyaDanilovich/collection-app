import React, { memo } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
    checked: boolean,
    setChecked: () => void
}

export const Checkbox = memo(({ checked, setChecked }: Props) => {
    const onCheckedHandler = () => {
        setChecked();
    };

    return (
        <Form.Check type={'checkbox'} checked={checked} onChange={onCheckedHandler} />
    );
});
