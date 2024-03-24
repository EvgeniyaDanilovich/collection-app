import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBiggestCollections } from '../services/fetchBiggestCollections';
import { MainPageSchema } from '../types/mainPageSchema';
import { ItemWithDetails } from '../../../../entities/Item';

const initialState: MainPageSchema = {
    mainPageItems: [],
    isLoading: false,
    error: undefined
};

export const mainPageSlice = createSlice({
    name: 'mainPageSlice',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBiggestCollections.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchBiggestCollections.fulfilled, (state, action: PayloadAction<ItemWithDetails[]>) => {
            state.isLoading = false;
            state.mainPageItems = action.payload;
        });
        builder.addCase(fetchBiggestCollections.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: mainPageActions } = mainPageSlice;
export const { reducer: mainPageReducer } = mainPageSlice;
