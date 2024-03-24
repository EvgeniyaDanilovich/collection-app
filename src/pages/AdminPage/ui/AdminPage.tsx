import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading, selectUsers } from '../model/selectors/adminSelectors';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { fetchUsers } from '../model/services/fetchUsers';
import { UsersTable } from '../../../entities/User';
import { AdminBar } from '../../../widgets/AdminBar';
import { deleteUser } from '../model/services/deleteUser';
import { updateUser } from '../model/services/updateUser';
import { selectIsAdmin } from '../../../features/AuthByUserName';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import { ErrorAlert } from '../../../shared/ui/ErrorAlert/ErrorAlert';
import { adminPageActions } from '../model/slice/adminPageSlice';

const AdminPage = () => {
    const users = useSelector(selectUsers);
    const dispatch: AppDispatch = useDispatch();
    const isAdmin = useSelector(selectIsAdmin);
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const onUpdateUser = useCallback((userId: number, newData: { status?: string, admin?: boolean }) => {
        dispatch(updateUser({ userId, newData }));
    }, [dispatch]);

    const onDeleteUser = useCallback((userId: number) => {
        dispatch(deleteUser(userId));
    }, [dispatch]);

    const handleCloseError = useCallback(() => {
        dispatch(adminPageActions.setError(undefined));
    }, [dispatch]);

    if (!isAdmin) {
        return <Navigate to={RoutePath.main} />
    }

    return (
        <div>
            <AdminBar users={users} onUpdateUser={onUpdateUser} onDelete={onDeleteUser} />
            <UsersTable users={users} isLoading={isLoading} />
            {error && <ErrorAlert error={error} onClose={handleCloseError} />}
        </div>
    );
};

export default AdminPage;
