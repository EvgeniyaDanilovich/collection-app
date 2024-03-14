import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollections } from '../model/selectors/collectionsPageSelectors';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { fetchCollections } from '../model/services/fetchCollections';
import { CollectionTable } from '../../../entities/Collection';

const CollectionsPage = () => {
    const collections = useSelector(selectCollections);
    const dispatch: AppDispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchCollections());
    }, [])

    return (
        <div>
            Collections
            <CollectionTable collections={collections} />
        </div>
    );
};

export default CollectionsPage;