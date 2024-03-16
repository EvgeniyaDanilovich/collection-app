import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCollectionById } from '../services/fetchCollectionById';
import { Collection, CollectionSchema } from '../types/collection';

export const initialAdminPageState: CollectionSchema = {
    collection: null,
    isLoading: false,
    error: undefined,
};

const collectionSlice = createSlice({
    name: 'collectionSlice',
    initialState: initialAdminPageState,
    reducers: {
        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCollectionById.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchCollectionById.fulfilled, (state, action: PayloadAction<Collection>) => {
            state.collection = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchCollectionById.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: collectionActions } = collectionSlice;
export const { reducer: collectionReducer } = collectionSlice;