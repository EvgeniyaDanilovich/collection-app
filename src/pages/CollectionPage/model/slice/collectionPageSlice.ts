import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createItem } from '../services/createItem';
import { Item } from '../../../../entities/Item';
import { CollectionPageSchema } from '../types/collectionPageSchema';
import { fetchItems } from '../services/fetchItems';
import { updateCollection } from '../../../ProfilePage/model/services/updateCollection';
import { Collection } from '../../../../entities/Collection';
import { updateItem } from '../services/updateItem';

const initialState: CollectionPageSchema = {
    items: [],
    isLoading: false,
    error: undefined
};

export const collectionPageSlice = createSlice({
    name: 'collectionPageSlice',
    initialState,
    reducers: {
        deleteItem(state, action) {
            if (action.payload) {
                const index = state.items.findIndex((item) => item.id === action.payload);
                state.items.splice(index, 1);
            }
        }
    },
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

        builder.addCase(updateItem.pending, (state) => {
            state.error = undefined;
        });
        builder.addCase(updateItem.fulfilled, (state, action: PayloadAction<Item>) => {
            let index = state.items.findIndex(item => item.id === action.payload.id);
            state.items[index] = action.payload;
        });
        builder.addCase(updateItem.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: collectionPageActions } = collectionPageSlice;
export const { reducer: collectionPageReducer } = collectionPageSlice;
