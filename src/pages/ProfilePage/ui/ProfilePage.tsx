import React, { useCallback } from 'react';
import { UserCard } from '../../../entities/User';
import { useTranslation } from 'react-i18next';
import { AddCollectionForm } from '../../../features/AddCollection';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { addCollection } from '../model/services/addCollection';
import { Collection } from '../../../entities/Collection';

const ProfilePage = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();

    const onAddCollection = useCallback((collection: Omit<Collection, 'id'>) => {
        dispatch(addCollection(collection));
    }, []);

    return (
        <div>
            <UserCard />
            <div>{t('My collections')}</div>
            <AddCollectionForm userId={Number(id)} onAddCollection={onAddCollection} />
        </div>
    );
};

export default ProfilePage;
