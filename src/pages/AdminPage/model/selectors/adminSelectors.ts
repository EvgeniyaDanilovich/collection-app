import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectUsers = (state: StateSchema) => state.admin.users;
export const selectError = (state: StateSchema) => state.admin.error;
export const selectIsLoading = (state: StateSchema) => state.admin.isLoading;
