import React, { memo, useCallback } from 'react';
import { User } from '../../model/types/user';
import { Checkbox } from '../../../../shared/ui/Checkbox/Checkbox';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { adminPageActions } from '../../../../pages/AdminPage';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import cls from './UsersList.module.scss';

interface Props {
    users: User[];
}

export const UsersList = memo(({ users }: Props) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleCheckbox = useCallback((checked: boolean, userId: number) => {
        dispatch(adminPageActions.setChecked({ userId, checked: checked }));
    }, []);

    const redirectToProfile = (userId: number) => {
        navigate(`${RoutePath.profile}${userId}`);
    };

    return (
        <>
            {users.map((user) => {
                const checked = !!user.checked;
                const isColored = user.status === 'Blocked';

                return (
                    <tr className={`${isColored && 'bg-slate-200'} flex items-center gap-x-[5px] mb-[10px]`} key={user.id}>
                        <td>
                            <Checkbox checked={checked} setChecked={(value) => handleCheckbox(value, user.id)} />
                        </td>
                        <td onClick={() => redirectToProfile(user.id)} className={cls.user}>{user.username}</td>
                        <td className={cls.td}>{user.email}</td>
                        <td>{user.status}</td>
                        {user.admin ? <td>Admin</td> : <td></td>}
                    </tr>);
            })}
        </>
    );
});
