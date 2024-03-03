import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../../../../features/AuthByUserName';
import { StateSchema } from './stateSchema';
import { adminPageReducer } from '../../../../pages/AdminPage';
import { userReducer } from '../../../../entities/User';
import { profilePageReducer } from '../../../../pages/ProfilePage';
import { collectionReducer } from '../../../../entities/Collection';
import { collectionPageReducer } from '../../../../pages/CollectionPage';
import { itemReducer } from '../../../../entities/Item';

export const store = configureStore<StateSchema>({
    reducer: {
        auth: authReducer,
        admin: adminPageReducer,
        user: userReducer,
        profile: profilePageReducer,
        collection: collectionReducer,
        collectionPage: collectionPageReducer,
        item: itemReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
