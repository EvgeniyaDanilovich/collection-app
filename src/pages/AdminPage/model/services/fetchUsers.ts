import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { User } from '../../../../entities/User';

export const fetchUsers = createAsyncThunk<User[], void, ThunkConfig<string>>(
    'auth/fetchUsers',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(   `${baseUrl}users`);

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            } else {
                const newData = await response.json();
                return newData;
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
