import React from 'react';
import { Button } from 'react-bootstrap';
import { User } from '../../../entities/User';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { localStorageKeys } from '../../../shared/const/localStorage';
import { authActions } from '../../../features/AuthByUserName';

interface Props {
    users: User[];
    onUpdateUser: (userId: number, newData: { status?: string, admin?: boolean }) => void;
    onDelete: (userId: number) => void;
}

export const AdminBar = ({ users, onUpdateUser, onDelete }: Props) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const currentUserId = Number(localStorage.getItem(localStorageKeys.USER_ID));

    const logoutUser = () => {
        dispatch(authActions.setIsAuth(false));
        localStorage.removeItem(`${localStorageKeys.USER_ID}`);
        navigate('/login');
    };

    const onDeleteUser = () => {
        users.map(user => {
            if (user.checked) {
                onDelete(user.id);

                if (user.id === currentUserId) {
                    logoutUser();
                }
            }
        });
    };

    const handleStatus = (status: string) => {
        users.map(user => {
            if (user.checked) {
                onUpdateUser(user.id, { status });

                if (status === 'Blocked' && user.id === currentUserId) {
                    logoutUser();
                }
            }
        });
    };

    const handleAdmin = (admin: boolean) => {
        users.map(user => {
            if (user.checked) {
                if (admin) {
                    onUpdateUser(user.id, { admin: true });
                } else {
                    onUpdateUser(user.id, { admin: false });
                }
            }
        });

    };

    return (
        <div>
            <Button onClick={() => handleStatus('Blocked')}>Block</Button>
            <Button onClick={() => handleStatus('Active')}>Unblock</Button>
            <Button onClick={onDeleteUser}>Delete</Button>
            <Button onClick={() => handleAdmin(true)}>Appoint as admin</Button>
            <Button onClick={() => handleAdmin(false)}>Delete from admin</Button>
        </div>
    );
};
