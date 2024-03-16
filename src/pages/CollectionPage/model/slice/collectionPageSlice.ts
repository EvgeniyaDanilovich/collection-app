import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createItem } from '../services/createItem';
import { Item } from '../../../../entities/Item';
import { CollectionPageSchema } from '../types/collectionPageSchema';
import { fetchItems } from '../services/fetchItems';
import { updateItem } from '../services/updateItem';

const initialState: CollectionPageSchema = {
    tags: [],
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
        },
        cleanTags(state) {
            state.tags = [];
        },

        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
            state.items = action.payload;
            if (!state.tags.length) {
                action.payload.map(item => {
                    item.tags.forEach(tag => {
                        if (!state.tags.includes(tag)) {
                            state.tags = [...state.tags, tag];
                        }
                    });
                });
            }
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

            action.payload.tags.forEach(tag => {
                if (!state.tags.includes(tag)) {
                    state.tags = [...state.tags, tag];
                }
            });
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

            action.payload.tags.forEach(tag => {
                if (!state.tags.includes(tag)) {
                    state.tags = [...state.tags, tag];
                }
            });
        });
        builder.addCase(updateItem.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: collectionPageActions } = collectionPageSlice;
export const { reducer: collectionPageReducer } = collectionPageSlice;
