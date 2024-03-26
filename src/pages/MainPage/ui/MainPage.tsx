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
import { selectBiggestCollections, selectError, selectIsLoading, selectLastAddedItems } from '../model/selectors/mainPageSelectors';
import { CollectionTable } from '../../../entities/Collection';
import { ItemCardList } from '../../../entities/Item';
import { ErrorAlert } from '../../../shared/ui/ErrorAlert/ErrorAlert';
import { mainPageActions } from '../model/slice/MainPageSlice';
import { AuthByGoogle } from '../../../features/authByGoogle';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

const MainPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const items = useSelector(selectLastAddedItems);
    const collections = useSelector(selectBiggestCollections);
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    const onSearch = useCallback((tag: string) => {
        navigate(RoutePath.search);
        dispatch(filterByTags(tag));
    }, []);

    useEffect(() => {
        dispatch(fetchBiggestCollections());
    }, []);

    const handleCloseError = useCallback(() => {
        dispatch(mainPageActions.setError(undefined));
    }, [dispatch]);

    return (
        <div>
            <h3 className={'mb-3'}>{t('Last added items')}</h3>
            <ItemCardList items={items} isLoading={isLoading} />
            <h3>{t('The biggest collections')}</h3>
            <CollectionTable collections={collections} isLoading={isLoading} />
            <h3 className={'mb-3 mt-5'}>{t('Tag collection')}</h3>
            <TagsList tags={suggestionsTags} handleClick={onSearch} />

            {error && <ErrorAlert error={error} onClose={handleCloseError} />}
        </div>
    );
};

export default MainPage;
