import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchItemById } from '../services/fetchItemById';
import { Item, ItemSchema } from '../type/item';

export const initialState: ItemSchema = {
    item: null,
    isLoading: false,
    error: undefined,
};

const itemSlice = createSlice({
    name: 'itemSlice',
    initialState,
    reducers: {
        setChecked(state, action) {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItemById.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchItemById.fulfilled, (state, action: PayloadAction<Item>) => {
            state.item = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchItemById.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: itemActions } = itemSlice;
export const { reducer: itemReducer } = itemSlice;