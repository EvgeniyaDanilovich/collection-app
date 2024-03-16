import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Item } from '../../../../entities/Item';

export const filterByTags = createAsyncThunk<Item[], string, ThunkConfig<string>>(
    'searchPage/filterByTags',
    async (tag, thunkAPI) => {

        try {
            const response = await fetch(`${baseUrl}items?tags_like=${tag}`);

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
