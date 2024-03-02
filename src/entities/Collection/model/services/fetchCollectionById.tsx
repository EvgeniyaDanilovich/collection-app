import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Collection } from '../types/collection';

export const fetchCollectionById = createAsyncThunk<Collection, string, ThunkConfig<string>>(
    'collection/fetchCollectionById',
    async (collectionId, thunkAPI) => {
        try {
            const response = await fetch(   `${baseUrl}collections/${collectionId}`);

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
