import { ChangeEvent, memo } from 'react';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';

interface Props {
    value: string;
    label?: string;
    setValue: (value: string) => void;
    type?: string;
    placeholder?: string;
}

export const Input = memo((props: Props) => {
    const { t } = useTranslation();
    const { value, label, setValue, type = 'text', placeholder = t('Enter text') } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                placeholder={placeholder}
                onChange={onChangeHandler} value={value} type={type}
            />
        </>
    );
});

// <label className="form-label">{label}<br/>
//     <input className={'form-control'}
//            onChange={onChangeHandler} type="text" placeholder="Type here" value={value} />
// </label>