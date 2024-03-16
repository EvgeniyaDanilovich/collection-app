import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectComments = (state: StateSchema) => state.itemPage.comments;
export const selectIsLoading = (state: StateSchema) => state.itemPage.isLoading;
export const selectError = (state: StateSchema) => state.itemPage.error;
