import React, { memo } from 'react';
import { Card } from 'react-bootstrap';
import { ItemWithDetails } from '../../models/type/item';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import cls from './ItemCardList.module.scss';

interface Props {
    items: ItemWithDetails[];
}

export const ItemCardList = memo(({ items }: Props) => {
    const navigate = useNavigate();

    const redirectToItem = (itemId: number) => {
        navigate(`${RoutePath.item}${itemId}`);
    };

    return (
        <div className={'d-flex mb-5 flex-wrap gap-2'}>
            {items && items.map(item => {
                return (
                    <Card className={cls.card} key={item.id} onClick={() => redirectToItem(item.id)}>
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                                Collection: {item.collection.name}
                            </Card.Text>
                            <Card.Text>
                                Author: {item.user.username}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                );
            })}
        </div>
    );
});
