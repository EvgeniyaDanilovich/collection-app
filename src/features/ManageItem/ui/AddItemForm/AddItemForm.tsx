import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCollection } from '../../../../entities/Collection';
import { InputBooleanField, InputField, Item } from '../../../../entities/Item';
import { useParams } from 'react-router-dom';
import { ItemForm } from '../ItemForm/ItemForm';
import { useTranslation } from 'react-i18next';

interface Props {
    onAddItem: (data: Partial<Item>) => void;
    onCloseModal: () => void;
}

export const AddItemForm = ({ onAddItem, onCloseModal }: Props) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const collection = useSelector(selectCollection);
    const [name, setName] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagsInput, setTagsInput] = useState<string>('');

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
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            return
        }

        e.preventDefault();
        if (id && onAddItem) {
            const data: Partial<Item> = {
                name,
                tags,
                collectionId: Number(id),
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
           name={name} setName={setName} tagsInput={tagsInput} setTagsInput={setTagsInput} setTags={setTags} tags={tags}
           stringFields={stringFields} setStringFields={setStringFields} textareaFields={textareaFields}
           setTextareaFields={setTextareaFields} checkboxFields={checkboxFields}
           setCheckboxFields={setCheckboxFields} dateFields={dateFields} setDateFields={setDateFields}
           numberFields={numberFields} setNumberFields={setNumberFields} action={t('Create')}
           handleSubmit={handleSubmit}
       />
    );
};
