import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TagsList } from '../../../entities/Tag/ui/TagsList';
import { suggestionsTags } from '../../../shared/const/tags';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { filterByTags } from '../../SearchPage';
import { fetchBiggestCollections } from '../model/services/fetchBiggestCollections';
import { selectBiggestCollections, selectLastAddedItems } from '../model/selectors/mainPageSelectors';
import { CollectionTable } from '../../../entities/Collection';
import { ItemCardList } from '../../../entities/Item';
import { LangSwitcher } from '../../../features/LangSwitcher';

const MainPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const items = useSelector(selectLastAddedItems);
    const collections = useSelector(selectBiggestCollections);

    const onSearch = useCallback((tag: string) => {
        navigate(RoutePath.search);
        dispatch(filterByTags(tag));
    }, []);

    useEffect(() => {
        dispatch(fetchBiggestCollections());
    }, []);

    return (
        <div>
            <h3 className={'mb-3'}>Last added items</h3>
            <ItemCardList items={items} />
            <h3>The biggest collections</h3>
            <CollectionTable collections={collections} />
            <h3 className={'mb-3'}>Tag collection</h3>
            <TagsList tags={suggestionsTags} handleClick={onSearch} />
        </div>
    );
};

export default MainPage;
