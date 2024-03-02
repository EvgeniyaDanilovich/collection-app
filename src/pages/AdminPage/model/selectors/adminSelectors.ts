import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectUsers = (state: StateSchema) => state.admin.users;
