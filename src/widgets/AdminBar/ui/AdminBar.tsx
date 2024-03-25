import React from 'react';
import { Button } from 'react-bootstrap';
import { User } from '../../../entities/User';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { localStorageKeys } from '../../../shared/const/localStorage';
import { authActions } from '../../../features/AuthByUserName';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import { ReactComponent as DeleteIcon } from '../../../shared/assets/icons/delete.svg';
import { ReactComponent as BlockIcon } from '../../../shared/assets/icons/block.svg';
import { ReactComponent as UnblockIcon } from '../../../shared/assets/icons/unblock.svg';
import { Icon, IconHover, IconType } from '../../../shared/ui/Icon/Icon';
import cls from './AdminBar.module.scss'
import { useTranslation } from 'react-i18next';

interface Props {
    users: User[];
    onUpdateUser: (userId: number, newData: { status?: string, admin?: boolean }) => void;
    onDelete: (userId: number) => void;
}

export const AdminBar = ({ users, onUpdateUser, onDelete }: Props) => {
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const currentUserId = Number(localStorage.getItem(localStorageKeys.USER_ID));

    const logoutUser = () => {
        dispatch(authActions.setIsAuth(false));
        dispatch(authActions.setIsAdmin(false));
        localStorage.removeItem(`${localStorageKeys.USER_ID}`);
        localStorage.removeItem(`${localStorageKeys.ADMIN}`);
        navigate(`${RoutePath.login}`);
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
        <div className={'d-flex gap-3 align-items-center'}>
            <div onClick={() => handleStatus('Blocked')} className={cls.btnArea}>
                <Icon Svg={BlockIcon} type={IconType.STROKE} />
            </div>
            <div onClick={() => handleStatus('Active')} className={cls.btnArea}>
                <Icon Svg={UnblockIcon} type={IconType.STROKE} />
            </div>
            <div onClick={onDeleteUser} className={cls.delete}>
                <Icon Svg={DeleteIcon} type={IconType.STROKE} hover={IconHover.RED} />
            </div>
            <Button onClick={() => handleAdmin(true)}>{t('Appoint as admin')}</Button>
            <Button onClick={() => handleAdmin(false)}>{t('Delete from admin')}</Button>
        </div>
    );
};
