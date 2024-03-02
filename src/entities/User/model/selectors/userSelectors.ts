import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectUser = (state: StateSchema) => state.user.user;
