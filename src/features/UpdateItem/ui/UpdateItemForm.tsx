import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Input } from '../../../shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollection } from '../../../entities/Collection';
import { Checkbox } from '../../../shared/ui/Checkbox/Checkbox';
import { Textarea } from '../../../shared/ui/Textarea/Textarea';
import { fetchItemById, InputBooleanField, InputField, Item } from '../../../entities/Item';
import { useParams } from 'react-router-dom';
import { localStorageKeys } from '../../../shared/const/localStorage';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { selectItem } from '../../../entities/Item/models/selectors/itemSelectors';

interface Props {
    onAddItem?: (data: Omit<Item, 'id'>) => void;
    onUpdateItem?: (data: Item) => void;
    onCloseModal: () => void;
    itemId: number | null;
}

export const UpdateItemForm = ({ onAddItem, onCloseModal, itemId, onUpdateItem }: Props) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const userId = localStorage.getItem(localStorageKeys.USER_ID);
    const item = useSelector(selectItem);
    const [name, setName] = useState<string>('');
    const [tags, setTags] = useState<string>('');

    const [stringFields, setStringFields] = useState<InputField[]>([]);
    const [textareaFields, setTextareaFields] = useState<InputField[]>([]);
    const [checkboxFields, setCheckboxFields] = useState<InputBooleanField[]>([]);
    const [dateFields, setDateFields] = useState<InputField[]>([]);
    const [numberFields, setNumberFields] = useState<InputField[]>([]);

    useEffect(() => {
        if (itemId) {
            dispatch(fetchItemById(String(itemId)));
        }
    }, []);

    useEffect(() => {
        if (item) {
            setName(item.name);
            setTags(item.tags);

            item.stringFields?.map((field, index) => {
                const newFields = [...stringFields];
                newFields[index] = { name: field.name, value: field.value };
                setStringFields(newFields);
            });

            item.textareaFields?.map((field, index) => {
                const newFields = [...textareaFields];
                newFields[index] = { name: field.name, value: field.value };
                setTextareaFields(newFields);
            });

            item.checkboxFields?.map((field, index) => {
                const newFields = [...checkboxFields];
                newFields[index] = { name: field.name, value: field.value };
                setCheckboxFields(newFields);
            });

            item.dateFields?.map((field, index) => {
                const newFields = [...dateFields];
                newFields[index] = { name: field.name, value: field.value };
                setDateFields(newFields);
            });

            item.numberFields?.map((field, index) => {
                const newFields = [...dateFields];
                newFields[index] = { name: field.name, value: field.value };
                setNumberFields(newFields);
            });
        }
    }, [item]);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id && userId && itemId && onUpdateItem) {
            const data: Item = {
                id: itemId,
                name,
                tags,
                collectionId: Number(id),
                userId: Number(userId),
                stringFields,
                textareaFields,
                checkboxFields,
                dateFields,
                numberFields
            };
            onUpdateItem(data);
        }
        onCloseModal();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Input value={name} label={t('Item name')} setValue={setName} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Input value={tags} label={t('Tags')} setValue={setTags} />
            </Form.Group>

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
                    <Checkbox checked={field.value}
                              setChecked={(value) => handleCheckboxFields(value, index)} label={field.name} />
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
                Update
            </Button>
        </Form>
    );
};
