import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { adminPageActions } from '../slice/adminPageSlice';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const deleteUser = createAsyncThunk<void, number, ThunkConfig<string>>(
    'auth/deleteUser',
    async (userId, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}users/${userId}`,{
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error();
            } else {
                thunkAPI.dispatch(adminPageActions.deleteUser(userId))
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);
