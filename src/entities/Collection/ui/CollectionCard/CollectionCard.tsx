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
import { ReactComponent as PlusIcon } from '../../../../shared/assets/icons/plus.svg';

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
            <h4>{collection?.name}</h4>
            <div className={'mb-4'}>
                {collection?.description &&
                    <ReactMarkdown>{collection?.description}</ReactMarkdown>
                }
            </div>
            {isAdmin || (isAuth && Number(userId) === collection?.userId) ? (
                <Button onClick={openModal} className={'d-flex align-items-center gap-1 mb-5'}>
                    <PlusIcon /> {t('New item')}
                </Button>
            ) : null}
        </div>
    );
};
