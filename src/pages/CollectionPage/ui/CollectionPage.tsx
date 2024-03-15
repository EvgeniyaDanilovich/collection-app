import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CollectionCard } from '../../../entities/Collection';
import { ModalComponent } from '../../../shared/ui/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { createItem } from '../model/services/createItem';
import { Item, ItemsTable, PartialItem } from '../../../entities/Item';
import { fetchItems } from '../model/services/fetchItems';
import { selectItems, selectTags } from '../model/selectors/collectionPageSelectors';
import { deleteItem } from '../model/services/deleteItem';
import { updateItem } from '../model/services/updateItem';
import { AddItemForm, UpdateItemForm } from '../../../features/ManageItem';
import { ItemSortBar } from '../../../widgets/ItemSortBar';
import { collectionPageActions } from '../model/slice/collectionPageSlice';
import { ReactComponent as ArrowIcon } from '../../../shared/assets/icons/arrow.svg';
import cls from './CollectionPage.module.scss';
import { Icon, IconType } from '../../../shared/ui/Icon/Icon';
import { BackButton } from '../../../shared/ui/BackButton/BackButton';

const CollectionPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const items = useSelector(selectItems);
    const tags = useSelector(selectTags);
    const { id } = useParams();
    const { t } = useTranslation();
    const [modal, setModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [currentItemId, setCurrentItemId] = useState<number | null>(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchItems({ id }));
        }
        return () => {
            dispatch(collectionPageActions.cleanTags())
        }
    }, []);

    const handleSort = useCallback((sort: string, order: string, tag: string) => {
        if (id) {
            dispatch(fetchItems({ id, sort, order, tag }));
        }
    }, [id]);

    const handleCreateItem = useCallback((data: Omit<Item, 'id' | 'like' | 'createdDate'>) => {
        dispatch(createItem(data));
    }, [dispatch]);

    const handleUpdateItem = useCallback((data: PartialItem) => {
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
            {/* <div className={cls.backBtn} onClick={navigateBack}> */}
            {/*     <Icon Svg={ArrowIcon} type={IconType.FILL} /> {t('Back')} */}
            {/* </div> */}

            <BackButton />
            <CollectionCard openModal={()=> setModal(true)} />

            <ItemSortBar onSort={handleSort} tags={tags} />
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
