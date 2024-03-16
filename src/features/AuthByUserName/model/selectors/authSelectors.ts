import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectIsAuth = (state: StateSchema) => state.auth.isAuth;
export const selectIsAdmin = (state: StateSchema) => state.auth.isAdmin;
export const selectError = (state: StateSchema) => state.auth.error;
