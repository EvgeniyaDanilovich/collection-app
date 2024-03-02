import React, { useEffect } from 'react';
import { Badge, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../model/selectors/userSelectors';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { fetchUserById } from '../../model/services/fetchUserById';
import { useParams } from 'react-router-dom';

export const UserCard = () => {
    const user = useSelector(selectUser);
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(id));
        }
    }, []);

    return (
        <Card style={{ width: '250px' }}>
            <Card.Body>
                <Card.Title>Profile info</Card.Title>
                {user?.admin && <Badge bg="secondary">Admin</Badge>}
                {user && (
                    <>
                        <Card.Text>
                            Name: {user.username}
                        </Card.Text>
                        <Card.Text>
                            Email: {user.email}
                        </Card.Text>
                        <Card.Text>
                            Status: {user.status}
                        </Card.Text>
                    </>
                )}

            </Card.Body>
        </Card>
    );
};
