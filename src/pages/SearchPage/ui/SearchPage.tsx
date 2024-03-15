import React, { useEffect, useState } from 'react';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchData } from '../model/services/fetchSearchData';
import { Input } from '../../../shared/ui/Input/Input';
import { ItemsTable } from '../../../entities/Item';
import { selectSearchedCollections, selectSearchedItems } from '../model/selectors/searchPageSelectors';
import { CollectionTable } from '../../../entities/Collection';
import { useTranslation } from 'react-i18next';
import { searchPageActions } from '../model/slice/searchPageSlice';

const SearchPage = () => {
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const items = useSelector(selectSearchedItems);
    const collections = useSelector(selectSearchedCollections);

    useEffect(() => {
        return () => {
            dispatch(searchPageActions.cleanItems());
            dispatch(searchPageActions.cleanCollections());
        };
    }, []);

    return (
        <div>
            {!!items.length &&
                <>
                    <div>ITEMS</div>
                    <ItemsTable items={items} />
                </>
            }
            {!!collections.length &&
                <>
                    <div>COLLECTIONS</div>
                    <CollectionTable collections={collections} />
                </>
            }
            {!items.length && !collections.length && (
                <div>{t('Nothing was found for your request')}</div>
            )}
        </div>
    );
};

export default SearchPage;