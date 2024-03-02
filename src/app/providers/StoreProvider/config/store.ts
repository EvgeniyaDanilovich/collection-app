import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../../../../features/AuthByUserName';
import { StateSchema } from './stateSchema';
import { adminPageReducer } from '../../../../pages/AdminPage';
import { userReducer } from '../../../../entities/User';

export const store = configureStore<StateSchema>({
    reducer: {
        auth: authReducer,
        admin: adminPageReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch