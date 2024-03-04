import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';

interface signupUserProps {
    data: {
        username: string,
        email: string,
        password: string,
    }
    redirectToLogin: () => void,
}

export const signupUser = createAsyncThunk<any, signupUserProps, ThunkConfig<string>>(
    'auth/signUp',
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}users`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ ...data.data, status: 'Active', admin: false }),
            });

            if (!response.ok) {
                throw new Error();
            } else {
                const newData = await response.json();
                data.redirectToLogin();
                return newData;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);
