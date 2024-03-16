import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Comment } from '../../../../entities/Comment';

export const searchByComments = createAsyncThunk<Comment[], string, ThunkConfig<string>>(
    'searchPage/searchByComments',
    async (q, thunkAPI) => {

        const queryParams = new URLSearchParams({
            ...(q && { q }),
            _expand: 'item'
        }).toString();

        try {
            const response = await fetch(`${baseUrl}comments?${queryParams}`);

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            } else {
                return await response.json();
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
