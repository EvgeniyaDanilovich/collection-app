import React, { useCallback, useEffect } from 'react';
import { Badge, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading, selectUser } from '../../model/selectors/userSelectors';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { fetchUserById } from '../../model/services/fetchUserById';
import { useParams } from 'react-router-dom';
import { ErrorAlert } from '../../../../shared/ui/ErrorAlert/ErrorAlert';
import { userActions } from '../../model/slice/userSlice';
import { useTranslation } from 'react-i18next';
import { UserCardSkeleton } from '../UserCardSkeleton/UserCardSkeleton';

export const UserCard = () => {
    const user = useSelector(selectUser);
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(id));
        }
    }, []);

    const handleCloseError = useCallback(() => {
        dispatch(userActions.setError(undefined));
    }, [dispatch]);

    if (isLoading) {
        return <UserCardSkeleton />;
    }

    return (
        <>
            <Card className={'mb-5 w-100'}>
                <Card.Body>
                    <div className={'d-flex align-items-center justify-content-between mb-3'}>
                        <Card.Title>{t('Profile info')}</Card.Title>
                        {user?.admin && <Badge bg="secondary">{t('Admin')}</Badge>}
                    </div>
                    {user && (
                        <>
                            <Card.Text>
                                {t('Username')}: {user.username}
                            </Card.Text>
                            <Card.Text>
                                {t('Email')}: {user.email}
                            </Card.Text>
                            <Card.Text>
                                {t('Status')}: {user.status}
                            </Card.Text>
                        </>
                    )}
                </Card.Body>
            </Card>
            {error && <ErrorAlert error={error} onClose={handleCloseError} />}
        </>
    );
};
