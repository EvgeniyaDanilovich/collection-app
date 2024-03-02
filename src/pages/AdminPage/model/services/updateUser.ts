import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { User } from '../../../../entities/User';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';

interface Props {
    userId: number;
    newData: {
        admin?: boolean;
        status?: string;
    };
}

export const updateUser = createAsyncThunk<User, Props, ThunkConfig<string>>(
    'auth/updateUser',
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}users/${data.userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                // body: JSON.stringify({ admin: data.admin }),
                body: JSON.stringify(data.newData),
            });

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