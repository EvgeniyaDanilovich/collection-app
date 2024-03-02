import React, { useCallback, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Input } from '../../../shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import { Select } from '../../../shared/ui/Select/Select';

const options = [
    { value: 'Coins', content: 'Coins' },
    { value: 'Books', content: 'Books' },
    // { value: Country.Belarus, content: Country.Belarus },
    // { value: Country.Kazakhstan, content: Country.Kazakhstan },
    // { value: Country.Ukraine, content: Country.Ukraine },
];

export const AddCollectionForm = () => {
    const { t } = useTranslation();
    const [name, setName] = useState<string>('');
    const [imgUrl, setImgUrl] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const [stringFields, setStringFields] = useState<string[]>([]);
    const [textareaFields, setTextareaFields] = useState<string[]>([]);

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

    return (
        <Form>
            <Form.Group className="mb-3">
                <Input value={name} label={t('Collection name')} setValue={setName} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Textarea value={description} setValue={setDescription} label={t('Description')} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Input value={imgUrl} label={t('Image link')} setValue={setImgUrl} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Select value={category} onChange={setCategory} label={t('Collection category')} options={options} />
            </Form.Group>

            <div onClick={addStringField}>Add extra string fields for your item</div>

            {stringFields.map((field, index) => (
                <Input
                    key={index} type="text" value={field} placeholder={t('Enter field name')}
                    setValue={(value) => handleStringFields(value, index)}
                />
            ))}

            <div onClick={addTextareaField}>Add extra textarea fields for your item</div>
            {textareaFields.map((field, index) => (
                <Input
                    key={index} type="text" value={field} placeholder={t('Enter field name')}
                    setValue={(value) => handleTextareaFields(value, index)}
                />
            ))}

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};
