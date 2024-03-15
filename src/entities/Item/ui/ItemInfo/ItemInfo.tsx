import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemById } from '../../models/services/fetchItemById';
import { selectItem } from '../../models/selectors/itemSelectors';
import { TagsList } from '../../../Tag/ui/TagsList';
import { useTranslation } from 'react-i18next';

export const ItemInfo = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();
    const item = useSelector(selectItem);

    useEffect(() => {
        if (id) {
            dispatch(fetchItemById(id));
        }
    }, []);



    return (
        <>
            {item && (
                <div className={'w-50'}>
                    <h4>{item.name}</h4>
                    <div>{item.stringFields.map(field => (
                            <p key={field.name}>{field.name}: {field.value}</p>
                    ))}</div>
                    <div>{item.textareaFields.map(field => (
                            <p key={field.name}>{field.name}: {field.value}</p>
                    ))}</div>

                    <div>{item.checkboxFields.map(field => (
                            <p key={field.name}>{field.name}: {field.value ? t('Yes') : t('No')}</p>
                    ))}</div>

                    <div>{item.dateFields.map(field => (
                            <p key={field.name}>{field.name}: {field.value}</p>
                    ))}</div>

                    <div className={'mb-2'}>{item.numberFields.map(field => (
                            <p key={field.name}>{field.name}: {field.value}</p>
                    ))}</div>

                    {item.tags && <TagsList tags={item.tags} hover={false} />}
                </div>
            )}
        </>
    );
};
