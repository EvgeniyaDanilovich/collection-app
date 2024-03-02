import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { User } from '../types/user';

export const fetchUserById = createAsyncThunk<User, string, ThunkConfig<string>>(
    'user/fetchUserById',
    async (userId, thunkAPI) => {
        try {
            const response = await fetch(   `${baseUrl}users/${userId}`);

            if (!response.ok) {
                throw new Error();
            } else {
                const newData = await response.json();
                return newData;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);