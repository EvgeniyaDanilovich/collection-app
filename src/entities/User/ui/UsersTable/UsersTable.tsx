import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Checkbox } from '../../../../shared/ui/Checkbox/Checkbox';
import { User } from '../../model/types/user';
import { UsersList } from '../UsersList/UsersList';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { adminPageActions } from '../../../../pages/AdminPage';
import { useTranslation } from 'react-i18next';
import { TableSkeleton } from '../../../../shared/ui/TableSkeleton/TableSkeleton';

interface Props {
    users: User[];
    isLoading: boolean;
}

export const UsersTable = ({ users, isLoading }: Props) => {
    const [mainCheckbox, setMainCheckbox] = useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(adminPageActions.setAllCheckbox(mainCheckbox));
    }, [mainCheckbox]);

    if (isLoading) {
        const titles = [t('Username'), t('Email'), t('Status'), t('Admin')];
        return <TableSkeleton titles={titles} />;
    }

    return (
        <div className={'Table'}>
            <Table hover responsive>
                <thead>
                <tr>
                    <th><Checkbox checked={mainCheckbox} setChecked={setMainCheckbox} /></th>
                    <th>{t('Username')}</th>
                    <th>{t('Email')}</th>
                    <th>{t('Status')}</th>
                        <th>{t('Admin')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <UsersList users={users} />
                    </tbody>
                </Table>
        </div>
    );
};
