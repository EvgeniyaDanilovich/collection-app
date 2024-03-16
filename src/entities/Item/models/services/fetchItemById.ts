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
