import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollections, selectError } from '../model/selectors/collectionsPageSelectors';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { fetchCollections } from '../model/services/fetchCollections';
import { CollectionTable } from '../../../entities/Collection';
import { useTranslation } from 'react-i18next';
import { ErrorAlert } from '../../../shared/ui/ErrorAlert/ErrorAlert';
import { collectionsPageActions } from '../model/slice/collectionsPageSlice';

const CollectionsPage = () => {
    const collections = useSelector(selectCollections);
    const error = useSelector(selectError);
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(()=> {
        dispatch(fetchCollections());
    }, [])

    const handleCloseError = useCallback(() => {
        dispatch(collectionsPageActions.setError(undefined));
    }, [dispatch]);

    return (
        <div>
            <h2>{t('Collections')}</h2>
            <CollectionTable collections={collections} />

            {error && <ErrorAlert error={error} onClose={handleCloseError} />}
        </div>
    );
};

export default CollectionsPage;