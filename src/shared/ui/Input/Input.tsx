import React, { ChangeEvent, InputHTMLAttributes, memo } from 'react';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { FormControlProps } from 'react-bootstrap';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
interface Props extends HTMLInputProps {
    value: string;
    label?: string;
    setValue: (value: string) => void;
    type?: string;
    placeholder?: string;
    required?: boolean;
}

export const Input = memo((props: Props) => {
    const { t } = useTranslation();
    const { value, label, setValue, type = 'text', required,
        placeholder = t('Enter text'), ...otherProps } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control
                placeholder={placeholder}
                onChange={onChangeHandler} value={value} type={type}
                required={required}
                {...otherProps as FormControlProps}
            />
            {required && !value && <Form.Control.Feedback type="invalid">{t('Required field')}</Form.Control.Feedback>}
        </>
    );
});
