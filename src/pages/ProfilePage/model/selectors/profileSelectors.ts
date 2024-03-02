import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectCollections = (state: StateSchema) => state.profile.collections;
