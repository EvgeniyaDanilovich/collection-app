import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCollection } from '../services/addCollection';
import { ProfileSchema } from '../types/profileSchema';

export const initialAdminPageState: ProfileSchema = {
    collections: [],
    isLoading: false,
    error: undefined,
};

const profilePageSlice = createSlice({
    name: 'profilePageSlice',
    initialState: initialAdminPageState,
    reducers: {
        setChecked(state, action) {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(addCollection.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(addCollection.fulfilled, (state, action: PayloadAction<any>) => {
            state.collections = [...state.collections, action.payload];
            state.isLoading = false;
        });
        builder.addCase(addCollection.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: profilePageActions } = profilePageSlice;
export const { reducer: profilePageReducer } = profilePageSlice;