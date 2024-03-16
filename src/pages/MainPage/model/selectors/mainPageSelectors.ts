import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectLastAddedItems = (state: StateSchema) => state.mainPage.lastAddedItems;
export const selectBiggestCollections = (state: StateSchema) => state.mainPage.biggestCollections;
export const selectError = (state: StateSchema) => state.mainPage.error;
export const selectIsLoading = (state: StateSchema) => state.mainPage.isLoading;
