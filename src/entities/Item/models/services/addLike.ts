import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Item, Like } from '../type/item';

interface Props {
    id: number;
    like: Like;
}

export const addLike = createAsyncThunk<Item, Props, ThunkConfig<string>>(
    'item/addLike',
    async (data, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}items/${data.id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify({ like: data.like }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            } else {
                return await response.json();
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
