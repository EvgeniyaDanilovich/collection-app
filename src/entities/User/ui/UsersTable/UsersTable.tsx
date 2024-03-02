import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Checkbox } from '../../../../shared/ui/Checkbox/Checkbox';
import { User } from '../../model/types/user';
import { UsersList } from '../UsersList/UsersList';
import { AppDispatch } from '../../../../app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { adminPageActions } from '../../../../pages/AdminPage';

interface Props {
    users: User[];
}

export const UsersTable = ({ users }: Props) => {
    const [mainCheckbox, setMainCheckbox] = useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();

    const handleMainCheckbox = useCallback(() => {
        setMainCheckbox(prev => !prev);
    }, []);

    useEffect(() => {
        dispatch(adminPageActions.setAllCheckbox(mainCheckbox));
    }, [mainCheckbox]);

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                {/* <th><Checkbox checked={mainCheckbox} setChecked={handleMainCheckbox} /></th> */}
                <th><Checkbox checked={mainCheckbox} setChecked={setMainCheckbox} /></th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Admin</th>
            </tr>
            </thead>
            <tbody>
                 <UsersList users={users}/>
            </tbody>
        </Table>
    );
};
