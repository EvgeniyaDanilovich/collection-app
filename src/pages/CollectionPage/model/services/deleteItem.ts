import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { collectionPageActions } from '../slice/collectionPageSlice';

export const deleteItem = createAsyncThunk<void, number, ThunkConfig<string>>(
    'collectionPage/deleteItem',
    async (itemId, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}items/${itemId}`,{
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error();
            } else {
                thunkAPI.dispatch(collectionPageActions.deleteItem(itemId))
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('Something went wrong');
        }
    }
);
