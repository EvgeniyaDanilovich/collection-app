import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../shared/const/api';
import { ThunkConfig } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { Comment } from '../../../../entities/Comment';
import { fetchComments } from './fetchComments';
import { selectItem } from '../../../../entities/Item';

export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>, ThunkConfig<string>>(
    'itemPage/addComment',
    async (comment, thunkAPI) => {
        const item = selectItem(thunkAPI.getState());

        try {
            const response = await fetch(`${baseUrl}comments`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(comment),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Something went wrong';
                throw new Error(errorMessage);
            } else {
                if (item?.id) {
                    thunkAPI.dispatch(fetchComments(String(item.id)));
                }

                return await response.json();
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
