import React, { useCallback, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Input } from '../../../shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import { Select } from '../../../shared/ui/Select/Select';
import { Collection } from '../../../entities/Collection';
import { CollectionCategories } from '../model/types/collection';

interface Props {
    userId: number;
    onAddCollection: (value: Omit<Collection, 'id'>) => void;
    onCloseModal: () => void;
}

const options = [
    { value: CollectionCategories.COINS, content: CollectionCategories.COINS },
    { value: CollectionCategories.BOOKS, content: CollectionCategories.BOOKS },
    { value: CollectionCategories.MARKS, content: CollectionCategories.MARKS },
];

export const AddCollectionForm = ({ userId, onAddCollection, onCloseModal }: Props) => {
    const { t } = useTranslation();
    const [name, setName] = useState<string>('');
    const [imgUrl, setImgUrl] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>(CollectionCategories.COINS);

    const [stringFields, setStringFields] = useState<string[]>([]);
    const [textareaFields, setTextareaFields] = useState<string[]>([]);
    const [checkboxFields, setCheckboxFields] = useState<string[]>([]);
    const [dateFields, setDateFields] = useState<string[]>([]);
    const [numberFields, setNumberFields] = useState<string[]>([]);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: Omit<Collection, 'id'> = {
            userId,
            name: name,
            description,
            category,
            imgUrl,
            stringFields: stringFields.filter(Boolean),
            textareaFields: textareaFields.filter(Boolean),
            checkboxFields: checkboxFields.filter(Boolean),
            dateFields: dateFields.filter(Boolean),
            numberFields: numberFields.filter(Boolean),
        };
        onAddCollection(data);
        onCloseModal();
    };

    return (
        <Form onSubmit={handleSubmit}>
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
                <Select value={category} onChange={setCategory} label={t('Collection category')} options={options}  />
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

            <div onClick={addCheckboxField}>Add extra checkbox fields for your item</div>
            {checkboxFields.map((field, index) => (
                <Input
                    key={index} type="text" value={field} placeholder={t('Enter field name')}
                    setValue={(value) => handleCheckboxFields(value, index)}
                />
            ))}

            <div onClick={addDateField}>Add extra date fields for your item</div>
            {dateFields.map((field, index) => (
                <Input
                    key={index} type="text" value={field} placeholder={t('Enter field name')}
                    setValue={(value) => handleDateFields(value, index)}
                />
            ))}

            <div onClick={addNumberField}>Add extra number fields for your item</div>
            {numberFields.map((field, index) => (
                <Input
                    key={index} type="text" value={field} placeholder={t('Enter field name')}
                    setValue={(value) => handleNumberFields(value, index)}
                />
            ))}

            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>
    );
};
