import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemById } from '../../models/services/fetchItemById';
import { selectItem } from '../../models/selectors/itemSelectors';

export const ItemInfo = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const item = useSelector(selectItem);

    useEffect(() => {
        if (id) {
            dispatch(fetchItemById(id));
        }
    }, []);

    return (
        <div>
            {item && (
                <div>
                    <div>Name: {item.name}</div>
                    <div>Tags: {item.tags}</div>
                    <div>{item.stringFields.map(field => (
                        <>
                            <p>{field.name}:</p>
                            <p>{field.value}</p>
                        </>
                    ))}</div>
                    <div>{item.textareaFields.map(field => (
                        <>
                            <p>{field.name}:</p>
                            <p>{field.value}</p>
                        </>
                    ))}</div>

                    <div>{item.checkboxFields.map(field => (
                        <>
                            <p>{field.name}:</p>
                            <p>{field.value}</p>
                        </>
                    ))}</div>

                    <div>{item.dateFields.map(field => (
                        <>
                            <p>{field.name}:</p>
                            <p>{field.value}</p>
                        </>
                    ))}</div>

                    <div>{item.numberFields.map(field => (
                        <>
                            <p>{field.name}:</p>
                            <p>{field.value}</p>
                        </>
                    ))}</div>

                </div>
            )}

        </div>
    );
};
