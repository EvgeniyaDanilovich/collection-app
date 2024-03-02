import React, { ChangeEvent, memo, useMemo } from 'react';
import { Form } from 'react-bootstrap';

export interface SelectOption {
    value: string,
    content: string,
}

interface SelectProps {
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
}

export const Select = memo((props: SelectProps) => {
    const { options, label, value, onChange } = props;

    const optionsList = useMemo(() => {
        return options?.map((opt) => {
            return <option value={opt.value} key={opt.value}>{opt.content}</option>;
        });
    }, [options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Select value={value} onChange={onChangeHandler}>
                {optionsList}
            </Form.Select>
        </div>
    );
});