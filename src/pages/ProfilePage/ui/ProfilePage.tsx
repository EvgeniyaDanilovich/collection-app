import React from 'react';
import { UserCard } from '../../../entities/User';
import { useTranslation } from 'react-i18next';
import { AddCollectionForm } from '../../../features/AddCollection';

const ProfilePage = () => {
    const { t } = useTranslation();

    return (
        <div>
            <UserCard />
            <div>{t('My collections')}</div>
            <AddCollectionForm />
        </div>
    );
};

export default ProfilePage;