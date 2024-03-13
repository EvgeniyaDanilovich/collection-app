import { Dispatch } from '@reduxjs/toolkit';
import { AuthSchema } from '../../../../features/AuthByUserName';
import { UserSchema } from '../../../../entities/User';
import { AdminSchema } from '../../../../pages/AdminPage';
import { ProfileSchema } from '../../../../pages/ProfilePage';
import { CollectionSchema } from '../../../../entities/Collection';
import { CollectionPageSchema } from '../../../../pages/CollectionPage';
import { ItemSchema } from '../../../../entities/Item';
import { ItemPageSchema } from '../../../../pages/ItemPage';
import { CollectionsPageSchema } from '../../../../pages/CollectionsPage';
import { SearchPageSchema } from '../../../../pages/SearchPage';
import { MainPageSchema } from '../../../../pages/MainPage';

export interface StateSchema {
    auth: AuthSchema;
    admin: AdminSchema;
    user: UserSchema;
    profile: ProfileSchema;
    collection: CollectionSchema;
    collectionPage: CollectionPageSchema;
    collectionsPage: CollectionsPageSchema;
    item: ItemSchema;
    itemPage: ItemPageSchema;
    searchPage: SearchPageSchema;
    mainPage: MainPageSchema;
}

export interface ThunkConfig<T>{
    rejectValue: T,
    // extra: ThunkExtraArg,
    dispatch?: Dispatch,
    state: StateSchema,
}