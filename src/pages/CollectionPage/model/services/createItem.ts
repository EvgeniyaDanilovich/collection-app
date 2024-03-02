import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Item } from '../../../../entities/Item';
import { localStorageKeys } from '../../../../shared/const/localStorage';

export const createItem = createAsyncThunk<Item, Omit<Item, 'id' | 'userId'>, ThunkConfig<string>>(
    'collectionPage/createItem',
    async (item, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}items`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(item),
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
