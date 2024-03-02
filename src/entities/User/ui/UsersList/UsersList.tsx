import React, { memo, useCallback } from 'react';
import { User } from '../../model/types/user';
import { Checkbox } from '../../../../shared/ui/Checkbox/Checkbox';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { adminPageActions } from '../../../../pages/AdminPage';
import { useNavigate } from 'react-router-dom';

interface Props {
    users: User[];
}

export const UsersList = memo(({ users }: Props) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckbox = useCallback((checked: boolean, userId: number) => {
        dispatch(adminPageActions.setChecked({ userId, checked: !checked }));
    }, []);

    const redirectToProfile = (userId: number) => {
        navigate(`/profile/${userId}`);
    };

    return (
        <>
            {users.map((user) => {
                const checked = !!user.checked;
                const isColored = user.status === 'Blocked';

                return (
                    <tr className={`${isColored && 'bg-slate-200'} flex items-center gap-x-[5px] mb-[10px]`} key={user.id}>
                        <td>
                            <Checkbox checked={checked} setChecked={() => handleCheckbox(checked, user.id)} />
                        </td>
                        <td onClick={() => redirectToProfile(user.id)}>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.status}</td>
                        {user.admin ? <td>Admin</td> : <td></td>}
                    </tr>);
            })}
        </>
    );
});
