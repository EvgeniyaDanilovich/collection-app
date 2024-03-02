import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { localStorageKeys } from '../../../../shared/const/localStorage';
import { User } from '../../../../entities/User';

interface loginUserProps {
    username: string;
    password: string;
}

export const loginUser = createAsyncThunk<User, loginUserProps, ThunkConfig<string>>(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}login`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                let message;
                if (response.status === 403) {
                    message = 'User not found';
                } else if (response.status === 401) {
                    message = 'User blocked';
                }
                throw new Error(message);
            } else {
                const newData: User = await response.json();
                localStorage.setItem(`${localStorageKeys.USER_ID}`, String(newData.id));
                localStorage.setItem(`${localStorageKeys.ADMIN}`, String(newData.admin));
                return newData;
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);