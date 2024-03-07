import React, { ChangeEvent, memo, useMemo } from 'react';
import { Form } from 'react-bootstrap';

export interface SelectOption<T extends string> {
    value: T,
    content: string,
}

interface SelectProps<T extends string> {
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
}

export const Select = memo(<T extends string>(props: SelectProps<T>) => {
    const { options, label, value, onChange } = props;

    const optionsList = useMemo(() => {
        return options?.map((opt) => {
            return <option value={opt.value} key={opt.value}>{opt.content}</option>;
        });
    }, [options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
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