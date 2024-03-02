import { ChangeEvent, memo } from 'react';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';

interface Props {
    value: string;
    label?: string;
    setValue: (value: string) => void;
}

export const Textarea = memo(({ value, label, setValue }: Props) => {
    const { t } = useTranslation();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                placeholder={t('Enter text')}
                onChange={onChangeHandler} value={value} as="textarea" rows={3}
            />

        </>
    );
});

// <label className="form-label">{label}<br/>
//     <input className={'form-control'}
//            onChange={onChangeHandler} type="text" placeholder="Type here" value={value} />
// </label>