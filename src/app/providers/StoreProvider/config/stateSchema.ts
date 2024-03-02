import { Dispatch } from '@reduxjs/toolkit';
import { AuthSchema } from '../../../../features/AuthByUserName';
import { UserSchema } from '../../../../entities/User';
import { AdminSchema } from '../../../../pages/AdminPage';
import { ProfileSchema } from '../../../../pages/ProfilePage';
import { CollectionSchema } from '../../../../entities/Collection';

export interface StateSchema {
    auth: AuthSchema;
    admin: AdminSchema;
    user: UserSchema;
    profile: ProfileSchema;
    collection: CollectionSchema;
}

export interface ThunkConfig<T>{
    rejectValue: T,
    // extra: ThunkExtraArg,
    dispatch?: Dispatch,
    state: StateSchema,
}