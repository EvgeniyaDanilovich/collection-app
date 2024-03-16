import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectItems = (state: StateSchema) => state.collectionPage.items;
export const selectTags = (state: StateSchema) => state.collectionPage.tags;
export const selectError = (state: StateSchema) => state.collectionPage.error;
export const selectIsLoading = (state: StateSchema) => state.collectionPage.isLoading;
