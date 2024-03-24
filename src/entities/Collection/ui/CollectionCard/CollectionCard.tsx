import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollection, selectError, selectIsLoading } from '../../model/selectors/collectionSelectors';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { fetchCollectionById } from '../../model/services/fetchCollectionById';
import { useParams } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { selectIsAdmin, selectIsAuth } from '../../../../features/AuthByUserName';
import { localStorageKeys } from '../../../../shared/const/localStorage';
import { collectionActions } from '../../model/slice/collectionSlice';
import cls from './CollectionCard.module.scss';
import ReactMarkdown from 'react-markdown';
import { ReactComponent as PlusIcon } from '../../../../shared/assets/icons/plus.svg';
import { ErrorAlert } from '../../../../shared/ui/ErrorAlert/ErrorAlert';
import { CollectionCardSkeleton } from '../CollectionCardSkeleton/CollectionCardSkeleton';

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
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);
    const userId = localStorage.getItem(localStorageKeys.USER_ID);

    useEffect(() => {
        if (id) {
            dispatch(fetchCollectionById(id));
        }
    }, []);

    const handleCloseError = useCallback(() => {
        dispatch(collectionActions.setError(undefined));
    }, [dispatch]);

    if (isLoading) {
        return <CollectionCardSkeleton />;
    }

    return (
        <div>
            {collection?.imgUrl && <img className={cls.image} src={collection?.imgUrl} alt={'collection'} />}

            <div className={'d-flex align-items-center justify-content-between'}>
                <h4>{collection?.name}</h4>
                <Badge bg="info">{collection?.category}</Badge>
            </div>
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

            {error && <ErrorAlert error={error} onClose={handleCloseError} />}
        </div>
    );
};
