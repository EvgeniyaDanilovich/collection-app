import React, { useCallback, useEffect } from 'react';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { ItemsTable } from '../../../entities/Item';
import { selectError, selectIsLoading, selectSearchedCollections, selectSearchedItems } from '../model/selectors/searchPageSelectors';
import { CollectionTable } from '../../../entities/Collection';
import { useTranslation } from 'react-i18next';
import { searchPageActions } from '../model/slice/searchPageSlice';
import { ErrorAlert } from '../../../shared/ui/ErrorAlert/ErrorAlert';

const SearchPage = () => {
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const items = useSelector(selectSearchedItems);
    const collections = useSelector(selectSearchedCollections);
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        return () => {
            dispatch(searchPageActions.cleanItems());
            dispatch(searchPageActions.cleanCollections());
        };
    }, []);

    const handleCloseError = useCallback(() => {
        dispatch(searchPageActions.setError(undefined));
    }, [dispatch]);

    return (
        <div>
            {!!items.length &&
                <>
                    <p className={'text-uppercase'}>{t('Items')}</p>
                    <ItemsTable items={items} isLoading={isLoading} />
                </>
            }
            {!!collections.length &&
                <>
                    <p className={'text-uppercase'}>{t('Collections')}</p>
                    <CollectionTable collections={collections} isLoading={isLoading} />
                </>
            }
            {!items.length && !collections.length && (
                <div>{t('Nothing was found for your request')}</div>
            )}

            {error && <ErrorAlert error={error} onClose={handleCloseError} />}
        </div>
    );
};

export default SearchPage;
