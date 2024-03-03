import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectItem = (state: StateSchema) => state.item.item;
