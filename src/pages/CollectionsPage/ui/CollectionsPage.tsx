import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollections } from '../model/selectors/collectionsPageSelectors';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { fetchCollections } from '../model/services/fetchCollections';
import { CollectionTable } from '../../../entities/Collection';
import { useTranslation } from 'react-i18next';

const CollectionsPage = () => {
    const collections = useSelector(selectCollections);
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(()=> {
        dispatch(fetchCollections());
    }, [])

    return (
        <div>
            <h2>{t('Collections')}</h2>
            <CollectionTable collections={collections} />
        </div>
    );
};

export default CollectionsPage;