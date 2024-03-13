import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Item } from '../../../../entities/Item';

export const searchByItems = createAsyncThunk<Item[], string, ThunkConfig<string>>(
    'searchPage/searchByItems',
    async (q, thunkAPI) => {

        const queryParams = new URLSearchParams({
            ...(q && { q })
        }).toString();

        try {
            const response = await fetch(`${baseUrl}items?${queryParams}`);

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
