import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CollectionCard } from '../../../entities/Collection';
import { ModalComponent } from '../../../shared/ui/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { AddItemForm } from '../../../features/AddItem';
import { Button } from 'react-bootstrap';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { createItem } from '../model/services/createItem';
import { Item, ItemList } from '../../../entities/Item';
import { fetchItems } from '../model/services/fetchItems';
import { selectItems } from '../model/selectors/collectionPageSelectors';

const CollectionPage = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [modal, setModal] = useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();
    const items = useSelector(selectItems);

    const handleCreateItem = useCallback((data: Omit<Item, 'id'>) => {
        dispatch(createItem(data));
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(fetchItems(id));
        }
    }, []);

    return (
        <div>
            <CollectionCard />
            <div>All items in collection</div>
            <Button onClick={() => setModal(true)}>{t('Create new item')}</Button>
            <ItemList items={items} />
            <ModalComponent title={t('Create new item')} status={modal} onClose={() => setModal(false)}>
                <AddItemForm onAddItem={handleCreateItem} onCloseModal={() => setModal(false)} />
            </ModalComponent>
        </div>
    );
};

export default CollectionPage;