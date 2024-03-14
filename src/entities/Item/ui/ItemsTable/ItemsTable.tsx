import React, { memo } from 'react';
import { Table } from 'react-bootstrap';
import { Item } from '../../models/type/item';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import cls from './ItemsTable.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAdmin, selectIsAuth } from '../../../../features/AuthByUserName';
import { localStorageKeys } from '../../../../shared/const/localStorage';

interface Props {
    items: Item[];
    onDeleteItem?: (id: number) => void;
    onEdit?: (id: number) => void;
}

export const ItemsTable = memo(({ items, onDeleteItem, onEdit }: Props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isAdmin = useSelector(selectIsAdmin);
    const isAuth = useSelector(selectIsAuth);
    const userId = localStorage.getItem(localStorageKeys.USER_ID);

    const redirectToItem = (itemId: number) => {
        navigate(`${RoutePath.item}${itemId}`);
    };

    const handleDelete = (e: React.MouseEvent<HTMLTableDataCellElement>, itemId: number) => {
        e.stopPropagation();
        if (onDeleteItem) {
            onDeleteItem(itemId);
        }
    };

    const handleEdit = (e: React.MouseEvent<HTMLTableDataCellElement>, itemId: number) => {
        e.stopPropagation();
        if (onEdit) {
            onEdit(itemId);
        }
    };

    return (
        <>
            <Table hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Tags</th>
                    <th>Likes</th>
                    <th>Created</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {items.length ? items.map(item => (
                        <tr key={item.id} onClick={() => redirectToItem(item.id)}>
                            <td>{item.name}</td>
                            <td>{item.tags}</td>
                            <td>{item.like.count}</td>
                            <td>{item.createdDate}</td>
                            {(isAdmin || (isAuth && Number(userId) === item.userId)) && onDeleteItem && onEdit ? (
                                    <>
                                        <td onClick={(e) => handleEdit(e, item.id)}>edit</td>
                                        <td onClick={(e) => handleDelete(e, item.id)}>delete</td>
                                    </>)
                                : (
                                    <>
                                        <td></td>
                                        <td></td>
                                    </>)
                            }
                        </tr>
                    ))
                    : (<tr>
                        <td className={cls.fullWidthCell} colSpan={4}>
                            {t('No items found')}
                        </td>
                    </tr>)
                }
                </tbody>
            </Table>
        </>
    );
});
