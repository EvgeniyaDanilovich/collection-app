import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CollectionCard } from '../../../entities/Collection';
import { ModalComponent } from '../../../shared/ui/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { AddItemForm } from '../../../features/AddItem';
import { Button } from 'react-bootstrap';

const CollectionPage = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [modal, setModal] = useState<boolean>(false);

    return (
        <div>
            <CollectionCard />
            {/* <AddItemForm /> */}
            <Button onClick={() => setModal(true)}>{t('Create new item')}</Button>
            <ModalComponent title={t('Create new item')} status={modal} onClose={() => setModal(false)}>
                <AddItemForm />
            </ModalComponent>
        </div>
    );
};

export default CollectionPage;