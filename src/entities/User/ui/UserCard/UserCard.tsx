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
        <Card className={'mb-5 w-50'}>
            <Card.Body>
                <div className={'d-flex align-items-center justify-content-between mb-3'}>
                    <Card.Title>Profile info</Card.Title>
                    {user?.admin && <Badge bg="secondary">Admin</Badge>}
                </div>
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
