import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Item, PartialItem } from '../../../../entities/Item';

export const updateItem = createAsyncThunk<Item, PartialItem, ThunkConfig<string>>(
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
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            } else {
                return  await response.json();
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
