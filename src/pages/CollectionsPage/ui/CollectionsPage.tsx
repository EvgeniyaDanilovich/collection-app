import React, { useCallback, useEffect } from 'react';
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

    const handleDelete = useCallback((id: number)=> {

    }, [])

    const handleEdit = useCallback((id: number)=> {

    }, [])

    return (
        <div>
            Collections
            <CollectionTable collections={collections} onDeleteCollection={handleDelete} onEdit={handleEdit} />
        </div>
    );
};

export default CollectionsPage;