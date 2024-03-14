import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../../../entities/Item';
import { SearchPageSchema } from '../types/searchPageSchema';
import { searchByItems } from '../services/searchByItems';
import { searchByComments } from '../services/searchByComments';
import { Comment } from '../../../../entities/Comment';
import { searchByCollection } from '../services/searchByCollection';
import { Collection } from '../../../../entities/Collection';
import { filterByTags } from '../services/filterByTags';

const initialState: SearchPageSchema = {
    searchedItems: [],
    searchedCollections: [],
    isLoading: false,
    error: undefined
};

export const searchPageSlice = createSlice({
    name: 'searchPageSlice',
    initialState,
    reducers: {
        cleanItems(state) {
            state.searchedItems = [];
        },
        cleanCollections(state) {
            state.searchedCollections = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchByItems.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(searchByItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
            state.searchedItems = [...state.searchedItems, ...action.payload];
            state.isLoading = false;
        });
        builder.addCase(searchByItems.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(searchByComments.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(searchByComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
            const items: Item[] = [];
            action.payload.map(comment => {
                if (comment.item) {
                    items.push(comment.item);
                }
            });
            state.searchedItems = [...state.searchedItems, ...items];
            state.isLoading = false;
        });
        builder.addCase(searchByComments.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(searchByCollection.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(searchByCollection.fulfilled, (state, action: PayloadAction<Collection[]>) => {
            state.searchedCollections = action.payload;
            state.isLoading = false;
        });
        builder.addCase(searchByCollection.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(filterByTags.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(filterByTags.fulfilled, (state, action: PayloadAction<Item[]>) => {
            state.searchedItems = action.payload;
            state.isLoading = false;
        });
        builder.addCase(filterByTags.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: searchPageActions } = searchPageSlice;
export const { reducer: searchPageReducer } = searchPageSlice;
