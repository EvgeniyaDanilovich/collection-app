import React, { memo } from 'react';
import { Card } from 'react-bootstrap';
import { Item } from '../../models/type/item';

interface Props {
    items: Item[];
}

export const ItemList = memo(({ items }: Props) => {
    return (
        <>
            {items && items.map(item => {
                return (
                    <Card key={item.id}>
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                        </Card.Body>
                    </Card>
                );
            })}
        </>
    );
});
