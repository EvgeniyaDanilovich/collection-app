import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollections, selectError, selectIsLoading } from '../model/selectors/collectionsPageSelectors';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { fetchCollections } from '../model/services/fetchCollections';
import { CollectionTable } from '../../../entities/Collection';
import { useTranslation } from 'react-i18next';
import { ErrorAlert } from '../../../shared/ui/ErrorAlert/ErrorAlert';
import { collectionsPageActions } from '../model/slice/collectionsPageSlice';
import { ExportToCSV } from '../../../features/ExportToCSV';

const CollectionsPage = () => {
    const collections = useSelector(selectCollections);
    const error = useSelector(selectError);
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();
    const isLoading = useSelector(selectIsLoading);

    useEffect(()=> {
        dispatch(fetchCollections());
    }, [])

    const handleCloseError = useCallback(() => {
        dispatch(collectionsPageActions.setError(undefined));
    }, [dispatch]);

    return (
        <div>
            <h2>{t('Collections')}</h2>
            <ExportToCSV collections={collections} />
            <CollectionTable collections={collections} isLoading={isLoading} />

            {error && <ErrorAlert error={error} onClose={handleCloseError} />}
        </div>
    );
};

export default CollectionsPage;