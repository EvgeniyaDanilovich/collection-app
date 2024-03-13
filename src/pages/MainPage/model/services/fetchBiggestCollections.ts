import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { baseUrl } from '../../../../shared/const/api';
import { ItemWithDetails } from '../../../../entities/Item';

export const fetchBiggestCollections = createAsyncThunk<ItemWithDetails[], void, ThunkConfig<string>>(
    'mainPage/fetchBiggestCollections',
    async (_, thunkAPI) => {
        const queryParams = new URLSearchParams([
            ['_expand', 'collection'],
            ['_expand', 'user'],
        ]).toString();

        try {
            const response = await fetch(   `${baseUrl}items?${queryParams}`);

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
