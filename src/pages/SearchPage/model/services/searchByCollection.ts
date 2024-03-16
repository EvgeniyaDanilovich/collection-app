import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Collection } from '../../../../entities/Collection';

export const searchByCollection = createAsyncThunk<Collection[], string, ThunkConfig<string>>(
    'searchPage/searchByCollection',
    async (q, thunkAPI) => {

        const queryParams = new URLSearchParams({
            ...(q && { q })
        }).toString();

        try {
            const response = await fetch(`${baseUrl}collections?${queryParams}`);

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            } else {
                return  await response.json();
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
