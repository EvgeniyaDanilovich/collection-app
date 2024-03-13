import React, { memo } from 'react';
import { Collection } from '../../model/types/collection';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import cls from './CollectionTable.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAdmin, selectIsAuth } from '../../../../features/AuthByUserName';
import { localStorageKeys } from '../../../../shared/const/localStorage';

interface Props {
    collections: Collection[];
    onDeleteCollection?: (id: number) => void;
    onEdit?: (id: number) => void;
}

export const CollectionTable = memo(({ collections, onDeleteCollection, onEdit }: Props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isAdmin = useSelector(selectIsAdmin);
    const isAuth = useSelector(selectIsAuth);
    const userId = localStorage.getItem(localStorageKeys.USER_ID);

    const redirectToCollection = (collectionId: number) => {
        navigate(`${RoutePath.collection}${collectionId}`);
    };

    const handleDelete = (e: React.MouseEvent<HTMLTableDataCellElement>, collectionId: number) => {
        e.stopPropagation();
        if (onDeleteCollection) {
            onDeleteCollection(collectionId);
        }
    };

    const handleEdit = (e: React.MouseEvent<HTMLTableDataCellElement>, collectionId: number) => {
        e.stopPropagation();
        if (onEdit) {
            onEdit(collectionId);
        }
    };

    return (
        <Table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Category</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {collections.length ? collections.map(collection => (
                    <tr key={collection.id} onClick={() => redirectToCollection(collection.id)}>
                        <td>{collection.name}</td>
                        <td>{collection.category}</td>
                        {isAdmin || isAuth && Number(userId) === collection.userId ? (
                                <>
                                    <td onClick={(e) => handleEdit(e, collection.id)}>edit</td>
                                    <td onClick={(e) => handleDelete(e, collection.id)}>delete</td>
                                </>
                            ) :
                            (
                                <>
                                    <td></td>
                                    <td></td>
                                </>
                            )}
                    </tr>
                ))
                : (<tr>
                    <td className={cls.fullWidthCell} colSpan={4}>
                        {t('No collections found')}
                    </td>
                </tr>)}
            </tbody>
        </Table>
    );
});
