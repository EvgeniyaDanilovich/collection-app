import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Comment } from '../../../../entities/Comment';

export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>, ThunkConfig<string>>(
    'itemPage/addComment',
    async (comment, thunkAPI) => {
        try {
            const response = await fetch(`${baseUrl}comments`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(comment),
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
