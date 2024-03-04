import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchComments } from '../services/fetchComments';
import { addComment } from '../services/addComment';
import { ItemPageSchema } from '../types/itemPage';
import { Comment } from '../../../../entities/Comment';

const initialState: ItemPageSchema = {
    comments: [],
    isLoading: false,
    error: undefined
};

export const itemPageSlice = createSlice({
    name: 'itemPageSlice',
    initialState,
    reducers: {
        // deleteItem(state, action) {
        //     if (action.payload) {
        //         const index = state.items.findIndex((item) => item.id === action.payload);
        //         state.items.splice(index, 1);
        //     }
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
            state.comments = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchComments.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(addComment.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
            state.comments = [...state.comments, action.payload];
            state.isLoading = false;
        });
        builder.addCase(addComment.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });

    },
});

export const { actions: itemPageActions } = itemPageSlice;
export const { reducer: itemPageReducer } = itemPageSlice;
