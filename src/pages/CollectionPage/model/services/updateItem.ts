import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Item } from '../../../../entities/Item';

export const updateItem = createAsyncThunk<Item, Item, ThunkConfig<string>>(
    'collectionPage/updateItem',
    async (item, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}items/${item.id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
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
