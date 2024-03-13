import React, { useEffect, useState } from 'react';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchData } from '../model/services/fetchSearchData';
import { Input } from '../../../shared/ui/Input/Input';
import { ItemsTable } from '../../../entities/Item';
import { selectSearchedCollections, selectSearchedItems } from '../model/selectors/searchPageSelectors';
import { CollectionTable } from '../../../entities/Collection';
import { searchPageActions } from '../model/slice/searchPageSlice';
import { useTranslation } from 'react-i18next';

const SearchPage = () => {
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const [value, setValue] = useState('');
    const items = useSelector(selectSearchedItems);
    const collections = useSelector(selectSearchedCollections);

    useEffect(() => {
        // dispatch(searchPageActions.cleanItems());
        // return () => {
        //     dispatch(searchPageActions.cleanItems());
        // };
    }, []);

    useEffect(()=>{
        console.log(items);
        console.log(collections);
    }, [items, collections])

    const onSearch = () => {
        if (value) {
            dispatch(fetchSearchData(value));
        }
    };

    return (
        <div>
            <Input value={value} setValue={setValue} />
            <div onClick={onSearch}>Search</div>

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