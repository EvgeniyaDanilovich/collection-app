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
                throw new Error();
            } else {
                const newData = await response.json();
                console.log(newData);
                return newData;
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);
