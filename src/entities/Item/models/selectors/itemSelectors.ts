import { StateSchema } from '../../../../app/providers/StoreProvider/config/stateSchema';

export const selectItem = (state: StateSchema) => state.item.item;
export const selectLikedUserId = (state: StateSchema) => state.item.item?.like.usersId;
export const selectLikesCount = (state: StateSchema) => state.item.item?.like.count;
export const selectError = (state: StateSchema) => state.item.error;
export const selectIsLoading = (state: StateSchema) => state.item.isLoading;
