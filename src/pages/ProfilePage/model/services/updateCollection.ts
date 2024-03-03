import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Collection } from '../../../../entities/Collection';

export const updateCollection = createAsyncThunk<Collection, Collection, ThunkConfig<string>>(
    'profile/updateCollection',
    async (collection, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}collections/${collection.id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify(collection),
            });

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
