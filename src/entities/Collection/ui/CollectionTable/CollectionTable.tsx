import React, { memo } from 'react';
import { Collection } from '../../model/types/collection';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import cls from './CollectionTable.module.scss';

interface Props {
    collections: Collection[];
    onDeleteCollection: (id: number) => void;
    onEdit: (id: number) => void;
}

export const CollectionTable = memo(({ collections, onDeleteCollection, onEdit }: Props) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const redirectToCollection = (collectionId: number) => {
        navigate(`${RoutePath.collection}${collectionId}`);
    };

    const handleDelete = (e: React.MouseEvent<HTMLTableDataCellElement>, collectionId: number) => {
        e.stopPropagation();
        onDeleteCollection(collectionId);
    };

    const handleEdit = (e: React.MouseEvent<HTMLTableDataCellElement>, collectionId: number) => {
        e.stopPropagation();
        onEdit(collectionId);
    };

    return (
        <Table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Category</th>
                {/* <th>Description</th> */}
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {collections.length ? collections.map(collection => (
                    <tr key={collection.id} onClick={() => redirectToCollection(collection.id)}>
                        <td>{collection.name}</td>
                        <td>{collection.category}</td>
                        {/* <td>{collection.description}</td> */}
                        <td onClick={(e) => handleEdit(e, collection.id)}>edit</td>
                        <td onClick={(e) => handleDelete(e, collection.id)}>delete</td>
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
