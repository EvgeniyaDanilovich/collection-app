import React, { memo } from 'react';
import { Table } from 'react-bootstrap';
import { Item } from '../../models/type/item';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import cls from './ItemsTable.module.scss';

interface Props {
    items: Item[];
    onDeleteItem: (id: number) => void;
    onEdit: (id: number) => void;
}

export const ItemsTable = memo(({ items, onDeleteItem, onEdit }: Props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const redirectToItem = (itemId: number) => {
        navigate(`${RoutePath.item}${itemId}`);
    };

    const handleDelete = (e: React.MouseEvent<HTMLTableDataCellElement>, itemId: number) => {
        e.stopPropagation();
        onDeleteItem(itemId);
    };

    const handleEdit = (e: React.MouseEvent<HTMLTableDataCellElement>, itemId: number) => {
        e.stopPropagation();
        onEdit(itemId);
    };

    return (
        <>
            <Table hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Tags</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {items.length ? items.map(item => (
                        <tr key={item.id} onClick={() => redirectToItem(item.id)}>
                            <td>{item.name}</td>
                            <td>{item.tags}</td>
                            <td onClick={(e) => handleEdit(e, item.id)}>edit</td>
                            <td onClick={(e) => handleDelete(e, item.id)}>delete</td>
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
