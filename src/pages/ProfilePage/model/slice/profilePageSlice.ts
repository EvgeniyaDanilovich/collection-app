import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCollection } from '../services/addCollection';
import { ProfileSchema } from '../types/profileSchema';
import { fetchCollectionsByUserId } from '../services/fetchCollectionsByUserId';
import { Collection } from '../../../../entities/Collection';
import { updateCollection } from '../services/updateCollection';

export const initialState: ProfileSchema = {
    collections: [],
    isLoading: false,
    error: undefined,
};

const profilePageSlice = createSlice({
    name: 'profilePageSlice',
    initialState,
    reducers: {
        deleteCollection(state, action) {
            if (action.payload) {
                const index = state.collections.findIndex((collection) => collection.id === action.payload);
                state.collections.splice(index, 1);
            }
        },

        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCollectionsByUserId.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchCollectionsByUserId.fulfilled, (state, action: PayloadAction<Collection[]>) => {
            state.collections = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchCollectionsByUserId.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(addCollection.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(addCollection.fulfilled, (state, action: PayloadAction<Collection>) => {
            state.collections = [...state.collections, action.payload];
            state.isLoading = false;
        });
        builder.addCase(addCollection.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(updateCollection.pending, (state) => {
            state.error = undefined;
        });
        builder.addCase(updateCollection.fulfilled, (state, action: PayloadAction<Collection>) => {
            let index = state.collections.findIndex(collection => collection.id === action.payload.id);
            state.collections[index] = action.payload;
        });
        builder.addCase(updateCollection.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: profilePageActions } = profilePageSlice;
export const { reducer: profilePageReducer } = profilePageSlice;