import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Item } from '../type/item';

export const fetchItemById = createAsyncThunk<Item, string, ThunkConfig<string>>(
    'item/fetchItemById',
    async (itemId, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}items/${itemId}`);

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
