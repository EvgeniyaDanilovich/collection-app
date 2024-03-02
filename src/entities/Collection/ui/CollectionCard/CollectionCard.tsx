import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollection } from '../../model/selectors/collectionSelectors';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { fetchCollectionById } from '../../model/services/fetchCollectionById';
import { useParams } from 'react-router-dom';

interface Props {
    collectionId: string;
}

export const CollectionCard = () => {
    const collection = useSelector(selectCollection);
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchCollectionById(id));
        }
    }, []);

    return (
        <div>
            <div>{collection?.name}</div>
        </div>
    );
};
