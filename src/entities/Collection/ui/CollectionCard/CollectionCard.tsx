import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollection } from '../../model/selectors/collectionSelectors';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { fetchCollectionById } from '../../model/services/fetchCollectionById';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { selectIsAdmin, selectIsAuth } from '../../../../features/AuthByUserName';
import { localStorageKeys } from '../../../../shared/const/localStorage';

interface Props {
    openModal: () => void;
}

export const CollectionCard = ({ openModal }: Props) => {
    const collection = useSelector(selectCollection);
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();
    const { id } = useParams();
    const isAdmin = useSelector(selectIsAdmin);
    const isAuth = useSelector(selectIsAuth);
    const userId = localStorage.getItem(localStorageKeys.USER_ID);

    useEffect(() => {
        if (id) {
            dispatch(fetchCollectionById(id));
        }
    }, []);

    return (
        <div>
            <div>{collection?.name}</div>
            <div>
                {collection?.description &&
                    <ReactMarkdown>{collection?.description}</ReactMarkdown>
                }
            </div>
            {isAdmin || isAuth && Number(userId) === collection?.userId && (
                <Button onClick={openModal}>{t('Create new item')}</Button>
            )}
        </div>
    );
};
