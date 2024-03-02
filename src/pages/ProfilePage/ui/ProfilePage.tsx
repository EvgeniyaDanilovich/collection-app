import React, { useCallback, useEffect, useState } from 'react';
import { UserCard } from '../../../entities/User';
import { useTranslation } from 'react-i18next';
import { AddCollectionForm } from '../../../features/AddCollection';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { addCollection } from '../model/services/addCollection';
import { Collection, CollectionList } from '../../../entities/Collection';
import { fetchCollectionsByUserId } from '../model/services/fetchCollectionsByUserId';
import { selectCollections } from '../model/selectors/profileSelectors';
import { ModalComponent } from '../../../shared/ui/Modal/Modal';
import { Button } from 'react-bootstrap';

const ProfilePage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const collections = useSelector(selectCollections);
    const [modal, setModal] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchCollectionsByUserId(id));
        }
    }, []);

    const onAddCollection = useCallback((collection: Omit<Collection, 'id'>) => {
        dispatch(addCollection(collection));
    }, []);

    return (
        <div>
            <UserCard />
            <div>{t('My collections')}</div>
            <Button onClick={() => setModal(true)}>{t('Create new collection')}</Button>
            <CollectionList collections={collections} />
            <ModalComponent title={t('Create new collection')} status={modal} onClose={() => setModal(false)}>
                <AddCollectionForm userId={Number(id)} onAddCollection={onAddCollection} />
            </ModalComponent>
        </div>
    );
};

export default ProfilePage;
