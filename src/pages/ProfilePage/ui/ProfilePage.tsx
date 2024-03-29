import React, { useCallback, useEffect, useState } from 'react';
import { UserCard } from '../../../entities/User';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { addCollection } from '../model/services/addCollection';
import { Collection, CollectionTable } from '../../../entities/Collection';
import { fetchCollectionsByUserId } from '../model/services/fetchCollectionsByUserId';
import { selectCollections, selectError, selectIsLoading } from '../model/selectors/profileSelectors';
import { ModalComponent } from '../../../shared/ui/Modal/Modal';
import { Button } from 'react-bootstrap';
import { deleteCollection } from '../model/services/deleteCollection';
import { AddCollectionForm, UpdateCollectionForm } from '../../../features/ManageCollection';
import { updateCollection } from '../model/services/updateCollection';
import { selectIsAdmin, selectIsAuth } from '../../../features/AuthByUserName';
import { localStorageKeys } from '../../../shared/const/localStorage';
import { ReactComponent as PlusIcon } from '../../../shared/assets/icons/plus.svg';
import { profilePageActions } from '../model/slice/profilePageSlice';
import { ErrorAlert } from '../../../shared/ui/ErrorAlert/ErrorAlert';
import { ExportToCSV } from '../../../features/ExportToCSV';

const ProfilePage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const isAdmin = useSelector(selectIsAdmin);
    const isAuth = useSelector(selectIsAuth);
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);
    const userId = localStorage.getItem(localStorageKeys.USER_ID);

    const dispatch: AppDispatch = useDispatch();
    const collections = useSelector(selectCollections);
    const [modal, setModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [currentCollectionId, setCurrentCollectionId] = useState<number | null>(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchCollectionsByUserId(id));
        }
    }, []);

    const onAddCollection = (collection: Omit<Collection, 'id'>) => {
        dispatch(addCollection(collection));
    };

    const onDeleteCollection = useCallback((collectionId: number) => {
        dispatch(deleteCollection(collectionId));
    }, [dispatch]);

    const handleEdit = useCallback((collectionId: number) => {
        setUpdateModal(true);
        setCurrentCollectionId(collectionId);
    }, [setUpdateModal,]);

    const handleUpdateCollection = (collection: Collection) => {
        dispatch(updateCollection(collection));
    };

    const handleCloseError = useCallback(() => {
        dispatch(profilePageActions.setError(undefined));
    }, [dispatch]);

    return (
        <div>
            <UserCard />
            <div className={'d-flex justify-content-between flex-wrap gap-2'}>
                <h3>{t('My collections')}</h3>
                {isAdmin || (isAuth && userId === id) ? (
                    <Button onClick={() => setModal(true)} className={'d-flex align-items-center gap-1'}>
                        <PlusIcon /> {t('New collection')}
                    </Button>
                ) : null}
            </div>

            <ExportToCSV collections={collections} />

            <CollectionTable collections={collections} onDeleteCollection={onDeleteCollection}
                             onEdit={handleEdit} isLoading={isLoading} />

            <ModalComponent title={t('Create new collection')} status={modal} onClose={() => setModal(false)}>
                <AddCollectionForm onAddCollection={onAddCollection} onCloseModal={() => setModal(false)} />
            </ModalComponent>

            <ModalComponent title={t('Create new collection')} status={updateModal} onClose={() => setUpdateModal(false)}>
                <UpdateCollectionForm collectionId={currentCollectionId} onUpdateCollection={handleUpdateCollection}
                                      onCloseModal={() => setUpdateModal(false)} />
            </ModalComponent>

            {error && <ErrorAlert error={error} onClose={handleCloseError} />}
        </div>
    );
};

export default ProfilePage;
