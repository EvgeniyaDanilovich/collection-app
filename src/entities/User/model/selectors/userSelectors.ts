import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectUser = (state: StateSchema) => state.user.user;
export const selectError = (state: StateSchema) => state.user.error;
export const selectIsLoading = (state: StateSchema) => state.user.isLoading;
