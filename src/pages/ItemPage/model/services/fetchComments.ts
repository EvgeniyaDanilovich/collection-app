import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Comment } from '../../../../entities/Comment';

export const fetchComments = createAsyncThunk<Comment[], string, ThunkConfig<string>>(
    'itemPage/fetchComments',
    async (itemId, thunkAPI) => {
        try {
            const response = await fetch(   `${baseUrl}comments?itemId=${itemId}`);

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
