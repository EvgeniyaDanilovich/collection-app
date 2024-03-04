import { ChangeEvent, memo } from 'react';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';

interface Props {
    value: string;
    label?: string;
    setValue: (value: string) => void;
    placeholder?: string;
}

export const Textarea = memo((props: Props) => {
    const { t } = useTranslation();
    const { value, label, setValue, placeholder = t('Enter text') } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                placeholder={placeholder}
                onChange={onChangeHandler} value={value} as="textarea" rows={3}
            />
        </>
    );
});
