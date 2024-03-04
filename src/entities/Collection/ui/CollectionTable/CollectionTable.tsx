import React, { memo } from 'react';
import { Collection } from '../../model/types/collection';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Props {
    collections: Collection[];
    onDeleteCollection: (id: number) => void;
    onEdit: (id: number) => void;
}

export const CollectionTable = memo(({ collections, onDeleteCollection, onEdit }: Props) => {
    const navigate = useNavigate();

    const redirectToCollection = (collectionId: number) => {
        navigate(`/collection/${collectionId}`);
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
        <Table hover>
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
            {collections && collections.map(collection => (
                <tr key={collection.id} onClick={() => redirectToCollection(collection.id)}>
                    <td>{collection.name}</td>
                    <td>{collection.category}</td>
                    {/* <td>{collection.description}</td> */}
                    <td onClick={(e)=> handleEdit(e, collection.id)}>edit</td>
                    <td onClick={(e) => handleDelete(e, collection.id)}>delete</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
});
