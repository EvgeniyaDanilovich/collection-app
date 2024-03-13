import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectSearchedItems = (state: StateSchema) => state.searchPage.searchedItems;
export const selectSearchedCollections = (state: StateSchema) => state.searchPage.searchedCollections;
