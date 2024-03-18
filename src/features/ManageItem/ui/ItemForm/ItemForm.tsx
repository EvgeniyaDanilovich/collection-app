import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Input } from '../../../../shared/ui/Input/Input';
import { Textarea } from '../../../../shared/ui/Textarea/Textarea';
import { Checkbox } from '../../../../shared/ui/Checkbox/Checkbox';
import { useTranslation } from 'react-i18next';
import { InputBooleanField, InputField } from '../../../../entities/Item';
import { TagInput } from '../TagInput/TagInput';

interface Props {
    name: string;
    setName: (value: string) => void;
    tagsInput: string;
    setTagsInput: (value: string) => void;
    tags: string[];
    setTags: (value: string[]) => void;
    stringFields: InputField[];
    setStringFields: (value: InputField[]) => void;
    textareaFields: InputField[];
    setTextareaFields: (value: InputField[]) => void;
    checkboxFields: InputBooleanField[];
    setCheckboxFields: (value: InputBooleanField[]) => void;
    dateFields: InputField[];
    setDateFields: (value: InputField[]) => void;
    numberFields: InputField[];
    setNumberFields: (value: InputField[]) => void;
    action: string;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ItemForm = (props: Props) => {
    const {
        handleSubmit, name, setName, action, tagsInput, setTagsInput, setTags, tags,
        setNumberFields, numberFields, setCheckboxFields, setStringFields,
        dateFields, setTextareaFields, stringFields, textareaFields, setDateFields, checkboxFields
    } = props;

    const { t } = useTranslation();
    const [validated, setValidated] = useState(false);

    const handleStringFields = useCallback((value: string, index: number) => {
        const newFields = [...stringFields];
        newFields[index].value = value;
        setStringFields(newFields);
    }, [stringFields, setStringFields]);

    const handleTextareaFields = useCallback((value: string, index: number) => {
        const newFields = [...textareaFields];
        newFields[index].value = value;
        setTextareaFields(newFields);
    }, [textareaFields, setTextareaFields]);

    const handleCheckboxFields = useCallback((value: boolean, index: number) => {
        const newFields = [...checkboxFields];
        newFields[index].value = value;
        setCheckboxFields(newFields);
    }, [checkboxFields, setCheckboxFields]);

    const handleDateFields = useCallback((value: string, index: number) => {
        const newFields = [...dateFields];
        newFields[index].value = value;
        setDateFields(newFields);
    }, [dateFields, setDateFields]);

    const handleNumberFields = useCallback((value: string, index: number) => {
        const newFields = [...numberFields];
        newFields[index].value = value;
        setNumberFields(newFields);
    }, [numberFields, setNumberFields]);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        setValidated(true);
        handleSubmit(e);
    }, [handleSubmit, setValidated]);

    return (
        <Form noValidate validated={validated} onSubmit={(e) => onSubmit(e)}>
            <Form.Group className="mb-3" controlId="validationCustom01">
                <Input value={name} label={t('Item name')} setValue={setName} required />
            </Form.Group>

            <TagInput tagsInput={tagsInput} setTagsInput={setTagsInput} setTags={setTags} tags={tags} />

            {stringFields && stringFields.map((field, index) => (
                <Form.Group className="mb-3" key={field.name}>
                    <Input value={field.value} label={field.name}
                           setValue={(value) => handleStringFields(value, index)}
                    />
                </Form.Group>)
            )}

            {textareaFields && textareaFields.map((field, index) => (
                <Form.Group className="mb-3" key={field.name}>
                    <Textarea value={field.value} label={field.name}
                              setValue={(value) => handleTextareaFields(value, index)}
                    />
                </Form.Group>)
            )}

            {checkboxFields && checkboxFields.map((field, index) => (
                <Form.Group className="mb-3" key={field.name}>
                    <Checkbox checked={field.value} label={field.name}
                              setChecked={(value) => handleCheckboxFields(value, index)}  />
                </Form.Group>)
            )}

            {dateFields && dateFields.map((field, index) => (
                <Form.Group className="mb-3" key={field.name}>
                    <Input value={field.value} label={field.name} type={'date'}
                           setValue={(value) => handleDateFields(value, index)}
                    />
                </Form.Group>)
            )}

            {numberFields && numberFields.map((field, index) => (
                <Form.Group className="mb-3" key={field.name}>
                    <Input value={field.value} label={field.name} type={'number'} placeholder={t('Enter number')}
                           setValue={(value) => handleNumberFields(value, index)}
                    />
                </Form.Group>)
            )}

            <Button variant="primary" type="submit">
                {action}
            </Button>
        </Form>
    );
};
