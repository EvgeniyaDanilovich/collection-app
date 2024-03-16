import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectCollections = (state: StateSchema) => state.collectionsPage.collection;
export const selectError = (state: StateSchema) => state.collectionsPage.error;
export const selectIsLoading = (state: StateSchema) => state.collectionsPage.isLoading;
