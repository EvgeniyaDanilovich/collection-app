import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectSearchedItems = (state: StateSchema) => state.searchPage.searchedItems;
export const selectSearchedCollections = (state: StateSchema) => state.searchPage.searchedCollections;
export const selectError = (state: StateSchema) => state.searchPage.error;
export const selectIsLoading = (state: StateSchema) => state.searchPage.isLoading;
