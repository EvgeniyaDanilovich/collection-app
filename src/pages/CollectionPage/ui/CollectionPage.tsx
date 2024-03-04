import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CollectionCard } from '../../../entities/Collection';
import { ModalComponent } from '../../../shared/ui/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { createItem } from '../model/services/createItem';
import { Item, ItemsTable } from '../../../entities/Item';
import { fetchItems } from '../model/services/fetchItems';
import { selectItems } from '../model/selectors/collectionPageSelectors';
import { deleteItem } from '../model/services/deleteItem';
import { updateItem } from '../model/services/updateItem';
import { AddItemForm, UpdateItemForm } from '../../../features/ManageItem';

const CollectionPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const items = useSelector(selectItems);
    const { id } = useParams();
    const { t } = useTranslation();
    const [modal, setModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [currentItemId, setCurrentItemId] = useState<number | null>(null)

    useEffect(() => {
        if (id) {
            dispatch(fetchItems(id));
        }
    }, []);

    const handleCreateItem = useCallback((data: Omit<Item, 'id'>) => {
        dispatch(createItem(data));
    }, [dispatch]);

    const handleUpdateItem = useCallback((data: Item) => {
        dispatch(updateItem(data));
    }, [dispatch]);

    const handleDeleteItem = useCallback((itemId: number) => {
        dispatch(deleteItem(itemId));
    }, [dispatch]);

    const handleEdit = useCallback((itemId: number) => {
        setUpdateModal(true);
        setCurrentItemId(itemId);
    }, []);

    return (
        <div>
            <CollectionCard />
            <div>All items in collection</div>
            <Button onClick={() => setModal(true)}>{t('Create new item')}</Button>
            <ItemsTable items={items} onDeleteItem={handleDeleteItem} onEdit={handleEdit} />

            <ModalComponent title={t('Create new item')} status={modal} onClose={() => setModal(false)}>
                <AddItemForm onAddItem={handleCreateItem} onCloseModal={() => setModal(false)} />
            </ModalComponent>

            <ModalComponent title={t('Update item')} status={updateModal} onClose={() => setUpdateModal(false)}>
                <UpdateItemForm itemId={currentItemId} onUpdateItem={handleUpdateItem} onCloseModal={() => setUpdateModal(false)} />
            </ModalComponent>
        </div>
    );
};

export default CollectionPage;