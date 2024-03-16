import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectCollections = (state: StateSchema) => state.profile.collections;
export const selectError = (state: StateSchema) => state.profile.error;
export const selectIsLoading= (state: StateSchema) => state.profile.isLoading;
