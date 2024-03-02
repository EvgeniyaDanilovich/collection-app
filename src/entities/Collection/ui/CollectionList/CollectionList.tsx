import React, { memo } from 'react';
import { Collection } from '../../model/types/collection';
import { Badge, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Props {
    collections: Collection[];
}

export const CollectionList = memo(({ collections }: Props) => {
    const navigate = useNavigate();

    const redirectToCollection = (collectionId: number) => {
        navigate(`/collection/${collectionId}`);
    };

    return (
        <>
            {collections && collections.map(collection => {
                return (
                    <Card style={{ width: '500px' }} key={collection.id}
                          onClick={() => redirectToCollection(collection.id)}>
                        <Card.Body>
                            <Card.Title>{collection.name}</Card.Title>
                            <Badge>{collection.category}</Badge>
                            <Card.Text>{collection.description}</Card.Text>
                        </Card.Body>
                    </Card>
                );
            })}
        </>
    );
});
