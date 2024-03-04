import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectComments = (state: StateSchema) => state.itemPage.comments;
export const selectIsLoading = (state: StateSchema) => state.itemPage.isLoading;
