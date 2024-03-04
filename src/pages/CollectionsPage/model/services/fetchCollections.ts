import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Collection } from '../../../../entities/Collection';

export const fetchCollections = createAsyncThunk<Collection[], void, ThunkConfig<string>>(
    'collectionsPage/fetchCollections',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(   `${baseUrl}collections`);

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
