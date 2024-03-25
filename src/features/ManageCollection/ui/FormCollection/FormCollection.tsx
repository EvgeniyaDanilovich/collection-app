import React, { useCallback, useState } from 'react';
import { Input } from '../../../../shared/ui/Input/Input';
import { Textarea } from '../../../../shared/ui/Textarea/Textarea';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CollectionCategories } from '../../../../entities/Collection';
import { SelectCategory } from '../SelectCategory/SelectCategory';

interface Props {
    name: string,
    setName: (value: string) => void;
    imgUrl: string;
    setImgUrl: (value: string) => void;
    description: string,
    setDescription: (value: string) => void;
    category: CollectionCategories;
    setCategory: (value: CollectionCategories) => void;
    stringFields: string[];
    setStringFields: (value: string[]) => void;
    textareaFields: string[];
    setTextareaFields: (value: string[]) => void;
    checkboxFields: string[];
    setCheckboxFields: (value: string[]) => void;
    dateFields: string[];
    setDateFields: (value: string[]) => void;
    numberFields: string[];
    setNumberFields: (value: string[]) => void;
    action: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FormCollection = (props: Props) => {
    const {
        handleSubmit, name, setName, imgUrl, setImgUrl, description, action,
        setDescription, category, setCategory, setNumberFields, numberFields, setCheckboxFields, setStringFields,
        dateFields, setTextareaFields, stringFields, textareaFields, setDateFields, checkboxFields
    } = props;

    const { t } = useTranslation();
    const [validated, setValidated] = useState(false);

    const addStringField = () => {
        const newFields = [...stringFields, ''];
        setStringFields(newFields);
    };

    const handleStringFields = useCallback((value: string, index: number) => {
        const newFields = [...stringFields];
        newFields[index] = value;
        setStringFields(newFields);
    }, [stringFields, setStringFields]);

    const addTextareaField = () => {
        const newFields = [...textareaFields, ''];
        setTextareaFields(newFields);
    };

    const handleTextareaFields = useCallback((value: string, index: number) => {
        const newFields = [...textareaFields];
        newFields[index] = value;
        setTextareaFields(newFields);
    }, [textareaFields, setTextareaFields]);

    const addCheckboxField = () => {
        const newFields = [...checkboxFields, ''];
        setCheckboxFields(newFields);
    };

    const handleCheckboxFields = useCallback((value: string, index: number) => {
        const newFields = [...checkboxFields];
        newFields[index] = value;
        setCheckboxFields(newFields);
    }, [checkboxFields, setCheckboxFields]);

    const addDateField = () => {
        const newFields = [...dateFields, ''];
        setDateFields(newFields);
    };

    const handleDateFields = useCallback((value: string, index: number) => {
        const newFields = [...dateFields];
        newFields[index] = value;
        setDateFields(newFields);
    }, [dateFields, setDateFields]);

    const addNumberField = () => {
        const newFields = [...numberFields, ''];
        setNumberFields(newFields);
    };

    const handleNumberFields = useCallback((value: string, index: number) => {
        const newFields = [...numberFields];
        newFields[index] = value;
        setNumberFields(newFields);
    }, [numberFields, setNumberFields]);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        setValidated(true);
        handleSubmit(e);
    }, [handleSubmit, setValidated]);

    return (
        <Form noValidate validated={validated} onSubmit={(e)=> onSubmit(e)}>
            <Form.Group className="mb-3">
                <Input value={name} label={t('Collection name')} setValue={setName} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Textarea value={description} setValue={setDescription} label={t('Description')} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Input value={imgUrl} label={t('Image link')} setValue={setImgUrl} />
            </Form.Group>

            <SelectCategory category={category} setCategory={setCategory} />

            <p>Add extra fields for your item:</p>

            <div className={'d-flex flex-wrap gap-2 mb-3 mt-1'}>
                <Button variant="light" onClick={addStringField}>{t('String')}</Button>
                <Button variant="light" onClick={addTextareaField}>{t('Textarea')}</Button>
                <Button variant="light" onClick={addCheckboxField}>{t('Checkbox')}</Button>
                <Button variant="light" onClick={addDateField}>{t('Date')}</Button>
                <Button variant="light" onClick={addNumberField}>{t('Number')}</Button>
            </div>

            {stringFields.map((field, index) => (
                <div className={'mb-3'} key={field + index}>
                    <Input type="text" value={field} placeholder={t('Enter field name')}
                        setValue={(value) => handleStringFields(value, index)} label={t('String')}
                    />
                </div>
            ))}

            {textareaFields.map((field, index) => (
                <div className={'mb-3'} key={field + index}>
                    <Input
                        type="text" value={field} placeholder={t('Enter field name')}
                        setValue={(value) => handleTextareaFields(value, index)} label={t('Textarea')}
                    />
                </div>
            ))}

            {checkboxFields.map((field, index) => (
                <div className={'mb-3'} key={field + index}>
                    <Input type="text" value={field} placeholder={t('Enter field name')}
                        setValue={(value) => handleCheckboxFields(value, index)} label={t('Checkbox')}
                    />
                </div>
            ))}

            {dateFields.map((field, index) => (
                <div className={'mb-3'} key={field + index}>
                    <Input type="text" value={field} placeholder={t('Enter field name')}
                        setValue={(value) => handleDateFields(value, index)} label={t('Date')}
                    />
                </div>
            ))}

            {numberFields.map((field, index) => (
                <div className={'mb-3'}  key={field + index}>
                    <Input type="text" value={field} placeholder={t('Enter field name')}
                        setValue={(value) => handleNumberFields(value, index)} label={t('Number')}
                    />
                </div>
            ))}

            <Button variant="primary" type="submit" className={'bt-3'}>
                {action}
            </Button>
        </Form>
    );
};
