import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBiggestCollections } from '../services/fetchBiggestCollections';
import { MainPageSchema } from '../types/mainPageSchema';
import { ItemWithDetails } from '../../../../entities/Item';

const initialState: MainPageSchema = {
    lastAddedItems: [],
    biggestCollections: [],
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
            state.lastAddedItems = action.payload.slice(-5);

            action.payload.sort((a, b) => a.collectionId - b.collectionId);

            const collectionCounts: any = {};
            action.payload.forEach(item => {
                if (collectionCounts[item.collectionId] === undefined) {
                    collectionCounts[item.collectionId] = 1;
                } else {
                    collectionCounts[item.collectionId]++;
                }
            });

            const sortedCollections = Object.keys(collectionCounts)
                .sort((a, b) => collectionCounts[b] - collectionCounts[a])
                .slice(0, 5);

            const uniqueCollectionsMap = new Map();

            sortedCollections.forEach(collectionId => {
                action.payload.forEach(item => {
                    if (item.collectionId.toString() === collectionId && !uniqueCollectionsMap.has(item.collection.id)) {
                        uniqueCollectionsMap.set(item.collection.id, item.collection);
                    }
                });
            });

            state.biggestCollections = Array.from(uniqueCollectionsMap.values());
        });
        builder.addCase(fetchBiggestCollections.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: mainPageActions } = mainPageSlice;
export const { reducer: mainPageReducer } = mainPageSlice;
