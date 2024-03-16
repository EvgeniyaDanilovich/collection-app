import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CollectionsPageSchema } from '../types/collectionsPage';
import { fetchCollections } from '../services/fetchCollections';
import { Collection } from '../../../../entities/Collection';

const initialState: CollectionsPageSchema = {
    collection: [],
    isLoading: false,
    error: undefined
};

export const collectionsPageSlice = createSlice({
    name: 'collectionsPageSlice',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCollections.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchCollections.fulfilled, (state, action: PayloadAction<Collection[]>) => {
            state.collection = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchCollections.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: collectionsPageActions } = collectionsPageSlice;
export const { reducer: collectionsPageReducer } = collectionsPageSlice;
