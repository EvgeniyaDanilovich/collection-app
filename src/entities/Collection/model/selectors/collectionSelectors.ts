import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectCollection = (state: StateSchema) => state.collection.collection;
export const selectCollectionOwnerId = (state: StateSchema) => state.collection.collection?.userId;
export const selectError = (state: StateSchema) => state.collection.error;
export const selectIsLoading = (state: StateSchema) => state.collection.isLoading;
