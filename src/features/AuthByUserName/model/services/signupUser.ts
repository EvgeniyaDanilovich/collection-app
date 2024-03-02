import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { useNavigate } from 'react-router-dom';

interface signupUserProps {
    username: string,
    email: string,
    password: string
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
                body: JSON.stringify({ ...data, status: 'Active', admin: false }),
            });

            if (!response.ok) {
                throw new Error();
            } else {
                const newData = await response.json();
                window.location.replace('/login');
                return newData;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);
