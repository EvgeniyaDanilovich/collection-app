import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';
import { createSelector } from '@reduxjs/toolkit';

export const selectMainPageItems = (state: StateSchema) => state.mainPage.mainPageItems;
export const selectError = (state: StateSchema) => state.mainPage.error;
export const selectIsLoading = (state: StateSchema) => state.mainPage.isLoading;

export const selectLastAddedItems = createSelector(
    [selectMainPageItems],
    mainPageItems => {
        return mainPageItems.slice(-5)
    }
)

export const selectBiggestCollections = createSelector(
    [selectMainPageItems],
    mainPageItems => {
        const sortedItems = [...mainPageItems].sort((a, b) => a.collectionId - b.collectionId);

        const collectionCounts: any = {};
        sortedItems.forEach(item => {
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
            sortedItems.forEach(item => {
                if (item.collectionId.toString() === collectionId && !uniqueCollectionsMap.has(item.collection.id)) {
                    uniqueCollectionsMap.set(item.collection.id, item.collection);
                }
            });
        });

       return Array.from(uniqueCollectionsMap.values());
    }
)
