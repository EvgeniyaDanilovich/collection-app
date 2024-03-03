import React, { useCallback, useEffect, useState } from 'react';
import { UserCard } from '../../../entities/User';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { addCollection } from '../model/services/addCollection';
import { Collection, CollectionTable } from '../../../entities/Collection';
import { fetchCollectionsByUserId } from '../model/services/fetchCollectionsByUserId';
import { selectCollections } from '../model/selectors/profileSelectors';
import { ModalComponent } from '../../../shared/ui/Modal/Modal';
import { Button } from 'react-bootstrap';
import { deleteCollection } from '../model/services/deleteCollection';
import { AddCollectionForm, UpdateCollectionForm } from '../../../features/ManageCollection';
import { updateCollection } from '../model/services/updateCollection';

const ProfilePage = () => {
    const { t } = useTranslation();
    const { id } = useParams();

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

    return (
        <div>
            <UserCard />
            <div>{t('My collections')}</div>
            <Button onClick={() => setModal(true)}>{t('Create new collection')}</Button>

            <CollectionTable collections={collections} onDeleteCollection={onDeleteCollection}
                             onEdit={handleEdit} />

            <ModalComponent title={t('Create new collection')} status={modal} onClose={() => setModal(false)}>
                <AddCollectionForm onAddCollection={onAddCollection} onCloseModal={() => setModal(false)} />
            </ModalComponent>

            <ModalComponent title={t('Create new collection')} status={updateModal} onClose={() => setUpdateModal(false)}>
                <UpdateCollectionForm collectionId={currentCollectionId} onUpdateCollection={handleUpdateCollection}
                                      onCloseModal={() => setUpdateModal(false)} />
            </ModalComponent>
        </div>
    );
};

export default ProfilePage;
