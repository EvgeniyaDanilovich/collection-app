import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCollection } from '../../../../entities/Collection';
import { InputBooleanField, InputField, Item } from '../../../../entities/Item';
import { useParams } from 'react-router-dom';
import { localStorageKeys } from '../../../../shared/const/localStorage';
import { ItemForm } from '../ItemForm/ItemForm';

interface Props {
    onAddItem: (data: Omit<Item, 'id'>) => void;
    onCloseModal: () => void;
}

export const AddItemForm = ({ onAddItem, onCloseModal }: Props) => {
    const { id } = useParams();
    const userId = localStorage.getItem(localStorageKeys.USER_ID);
    const collection = useSelector(selectCollection);
    const [name, setName] = useState<string>('');
    const [tags, setTags] = useState<string>('');

    const [stringFields, setStringFields] = useState<InputField[]>([]);
    const [textareaFields, setTextareaFields] = useState<InputField[]>([]);
    const [checkboxFields, setCheckboxFields] = useState<InputBooleanField[]>([]);
    const [dateFields, setDateFields] = useState<InputField[]>([]);
    const [numberFields, setNumberFields] = useState<InputField[]>([]);

    useEffect(() => {
        if (collection) {
            collection.stringFields?.map((field, index) => {
                const newFields = [...stringFields];
                newFields[index] = { name: field, value: '' };
                setStringFields(newFields);
            });

            collection.textareaFields?.map((field, index) => {
                const newFields = [...textareaFields];
                newFields[index] = { name: field, value: '' };
                setTextareaFields(newFields);
            });

            collection.checkboxFields?.map((field, index) => {
                const newFields = [...checkboxFields];
                newFields[index] = { name: field, value: false };
                setCheckboxFields(newFields);
            });

            collection.dateFields?.map((field, index) => {
                const newFields = [...dateFields];
                newFields[index] = { name: field, value: '' };
                setDateFields(newFields);
            });

            collection.numberFields?.map((field, index) => {
                const newFields = [...dateFields];
                newFields[index] = { name: field, value: '' };
                setNumberFields(newFields);
            });
        }
    }, [collection]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id && userId && onAddItem) {
            const data: Omit<Item, 'id'> = {
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
            onAddItem(data);
        }
        onCloseModal();
    };

    return (
       <ItemForm
           name={name} setName={setName} tags={tags} setTags={setTags} stringFields={stringFields}
           setStringFields={setStringFields} textareaFields={textareaFields}
           setTextareaFields={setTextareaFields} checkboxFields={checkboxFields}
           setCheckboxFields={setCheckboxFields} dateFields={dateFields} setDateFields={setDateFields}
           numberFields={numberFields} setNumberFields={setNumberFields} action={'Create'}
           handleSubmit={handleSubmit}
       />
    );
};
