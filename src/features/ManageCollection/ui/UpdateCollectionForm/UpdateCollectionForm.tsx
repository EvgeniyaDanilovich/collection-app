import React, { useEffect, useState } from 'react';
import { Collection, CollectionCategories, fetchCollectionById, selectCollection } from '../../../../entities/Collection';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { FormCollection } from '../FormCollection/FormCollection';
import { useTranslation } from 'react-i18next';

interface Props {
    collectionId: number | null;
    onUpdateCollection: (value: Collection) => void;
    onCloseModal: () => void;
}

export const UpdateCollectionForm = ({ collectionId, onUpdateCollection, onCloseModal }: Props) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const collection = useSelector(selectCollection);

    const [name, setName] = useState<string>('');
    const [imgUrl, setImgUrl] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<CollectionCategories>(CollectionCategories.COINS);

    const [stringFields, setStringFields] = useState<string[]>([]);
    const [textareaFields, setTextareaFields] = useState<string[]>([]);
    const [checkboxFields, setCheckboxFields] = useState<string[]>([]);
    const [dateFields, setDateFields] = useState<string[]>([]);
    const [numberFields, setNumberFields] = useState<string[]>([]);

    useEffect(() => {
        if (collectionId) {
            dispatch(fetchCollectionById(String(collectionId)));
        }
    }, []);

    useEffect(() => {
        if (collection) {
            setName(collection.name);
            setImgUrl(collection.imgUrl || '');
            setDescription(collection.description);
            setCategory(collection.category);

            setStringFields(collection.stringFields || []);
            setTextareaFields(collection.textareaFields || []);
            setCheckboxFields(collection.checkboxFields || []);
            setDateFields(collection.dateFields || []);
            setNumberFields(collection.numberFields || []);
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
        if (collectionId) {
            const data: Collection = {
                id: collectionId,
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
            onUpdateCollection(data);
            onCloseModal();
        }
    };

    return (
        <FormCollection name={name} setName={setName} imgUrl={imgUrl} setImgUrl={setImgUrl}
                        description={description} setDescription={setDescription}
                        category={category} setCategory={setCategory} stringFields={stringFields}
                        setStringFields={setStringFields} textareaFields={textareaFields}
                        setTextareaFields={setTextareaFields} checkboxFields={checkboxFields}
                        setCheckboxFields={setCheckboxFields} dateFields={dateFields} setDateFields={setDateFields}
                        numberFields={numberFields} setNumberFields={setNumberFields} action={t('Update')}
                        handleSubmit={handleSubmit} />
    );
};
