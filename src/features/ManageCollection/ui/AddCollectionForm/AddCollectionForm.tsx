import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Collection, CollectionCategories } from '../../../../entities/Collection';
import { useParams } from 'react-router-dom';
import { FormCollection } from '../FormCollection/FormCollection';

interface Props {
    onAddCollection: (value: Omit<Collection, 'id'>) => void;
    onCloseModal: () => void;
}

export const AddCollectionForm = ({ onAddCollection, onCloseModal }: Props) => {
    const { t } = useTranslation();
    const { id } = useParams();

    const [name, setName] = useState<string>('');
    const [imgUrl, setImgUrl] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<CollectionCategories>(CollectionCategories.COINS);

    const [stringFields, setStringFields] = useState<string[]>([]);
    const [textareaFields, setTextareaFields] = useState<string[]>([]);
    const [checkboxFields, setCheckboxFields] = useState<string[]>([]);
    const [dateFields, setDateFields] = useState<string[]>([]);
    const [numberFields, setNumberFields] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            return
        }

        e.preventDefault();
        const data: Omit<Collection, 'id'> = {
            userId: Number(id),
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
        <FormCollection name={name} setName={setName} imgUrl={imgUrl} setImgUrl={setImgUrl}
                        description={description} setDescription={setDescription}
                        category={category} setCategory={setCategory} stringFields={stringFields}
                        setStringFields={setStringFields} textareaFields={textareaFields}
                        setTextareaFields={setTextareaFields} checkboxFields={checkboxFields}
                        setCheckboxFields={setCheckboxFields} dateFields={dateFields} setDateFields={setDateFields}
                        numberFields={numberFields} setNumberFields={setNumberFields} action={'Create'}
                        handleSubmit={handleSubmit} />
    );
};
