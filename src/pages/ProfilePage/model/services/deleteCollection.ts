import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { profilePageActions } from '../slice/profilePageSlice';

export const deleteCollection = createAsyncThunk<void, number, ThunkConfig<string>>(
    'profile/deleteCollection',
    async (collectionId, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}collections/${collectionId}`,{
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            } else {
                thunkAPI.dispatch(profilePageActions.deleteCollection(collectionId))
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
