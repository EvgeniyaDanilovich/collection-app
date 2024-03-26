import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { User } from '../../../../entities/User';

interface signupUserProps {
    data: {
        username: string,
        email: string,
        password: string,
    }
    redirectToLogin?: () => void,
}

export const signupUser = createAsyncThunk<User, signupUserProps, ThunkConfig<string>>(
    'auth/signUp',
    async (data, thunkAPI) => {
        try {
            // const response = await fetch(`${baseUrl}signup`, {
            const response = await fetch(`${baseUrl}users`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                // body: JSON.stringify({ ...data.data }),
                body: JSON.stringify({ ...data.data, status: 'Active', admin: false }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            } else {
                const newData = await response.json();
                if (data.redirectToLogin) {
                    data.redirectToLogin();
                }
                return newData;
            }
        } catch (e: any) {
            return  thunkAPI.rejectWithValue(e.message);
        }
    }
);
