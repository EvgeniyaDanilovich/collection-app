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