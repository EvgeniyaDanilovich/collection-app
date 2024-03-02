import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectCollection = (state: StateSchema) => state.collection.collection;
