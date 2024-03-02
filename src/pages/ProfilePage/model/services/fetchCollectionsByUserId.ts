import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Collection } from '../../../../entities/Collection';

export const fetchCollectionsByUserId = createAsyncThunk<Collection[], string, ThunkConfig<string>>(
    'profile/fetchCollectionsByUserId',
    async (userId, thunkAPI) => {
        try {
            const response = await fetch(   `${baseUrl}collections?userId=${userId}`);

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