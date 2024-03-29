import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemById, InputBooleanField, InputField, PartialItem, selectItem } from '../../../../entities/Item';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { ItemForm } from '../ItemForm/ItemForm';
import { useTranslation } from 'react-i18next';

interface Props {
    onUpdateItem: (data: PartialItem) => void;
    onCloseModal: () => void;
    itemId: number | null;
}

export const UpdateItemForm = ({ onCloseModal, itemId, onUpdateItem }: Props) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const item = useSelector(selectItem);
    const [name, setName] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagsInput, setTagsInput] = useState<string>('');

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            return
        }

        e.preventDefault();
        if (id && itemId && onUpdateItem) {
            const data: PartialItem = {
                id: itemId,
                name,
                tags,
                collectionId: Number(id),
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
        <ItemForm
            name={name} setName={setName} tags={tags} setTags={setTags} stringFields={stringFields}
            setStringFields={setStringFields} textareaFields={textareaFields} tagsInput={tagsInput} setTagsInput={setTagsInput}
            setTextareaFields={setTextareaFields} checkboxFields={checkboxFields}
            setCheckboxFields={setCheckboxFields} dateFields={dateFields} setDateFields={setDateFields}
            numberFields={numberFields} setNumberFields={setNumberFields} action={t('Update')}
            handleSubmit={handleSubmit}
        />
    );
};
