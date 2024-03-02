import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createItem } from '../services/createItem';
import { Item } from '../../../../entities/Item';
import { CollectionPageSchema } from '../types/collectionPageSchema';
import { fetchItems } from '../services/fetchItems';

const initialState: CollectionPageSchema = {
    items: [],
    isLoading: false,
    error: undefined
};

export const collectionPageSlice = createSlice({
    name: 'collectionPageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchItems.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(createItem.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(createItem.fulfilled, (state, action: PayloadAction<Item>) => {
            state.items = [...state.items, action.payload];
            state.isLoading = false;
        });
        builder.addCase(createItem.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: collectionPageActions } = collectionPageSlice;
export const { reducer: collectionPageReducer } = collectionPageSlice;
