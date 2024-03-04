import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../model/selectors/adminSelectors';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { fetchUsers } from '../model/services/fetchUsers';
import { UsersTable } from '../../../entities/User';
import { AdminBar } from '../../../widgets/AdminBar';
import { deleteUser } from '../model/services/deleteUser';
import { updateUser } from '../model/services/updateUser';
import { selectIsAdmin } from '../../../features/AuthByUserName';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';

const AdminPage = () => {
    const users = useSelector(selectUsers);
    const dispatch: AppDispatch = useDispatch();
    const isAdmin = useSelector(selectIsAdmin);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const onUpdateUser = useCallback((userId: number, newData: { status?: string, admin?: boolean }) => {
        dispatch(updateUser({ userId, newData }));
    }, [dispatch]);

    const onDeleteUser = useCallback((userId: number) => {
        dispatch(deleteUser(userId));
    }, [dispatch]);

    if (!isAdmin) {
        return <Navigate to={RoutePath.main} />
    }

    return (
        <div>
            <AdminBar users={users} onUpdateUser={onUpdateUser} onDelete={onDeleteUser} />
            <UsersTable users={users} />
        </div>
    );
};

export default AdminPage;