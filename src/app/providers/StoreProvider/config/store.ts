import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../../../../features/AuthByUserName';
import { StateSchema } from './stateSchema';
import { adminPageReducer } from '../../../../pages/AdminPage';
import { userReducer } from '../../../../entities/User';
import { profilePageReducer } from '../../../../pages/ProfilePage';
import { collectionReducer } from '../../../../entities/Collection';
import { collectionPageReducer } from '../../../../pages/CollectionPage';
import { itemReducer } from '../../../../entities/Item';
import { itemPageReducer } from '../../../../pages/ItemPage';
import { collectionsPageReducer } from '../../../../pages/CollectionsPage';

export const store = configureStore<StateSchema>({
    reducer: {
        auth: authReducer,
        admin: adminPageReducer,
        user: userReducer,
        profile: profilePageReducer,
        collection: collectionReducer,
        collectionPage: collectionPageReducer,
        collectionsPage: collectionsPageReducer,
        item: itemReducer,
        itemPage: itemPageReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
