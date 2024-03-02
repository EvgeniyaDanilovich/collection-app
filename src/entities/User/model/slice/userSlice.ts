import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import { fetchUserById } from '../services/fetchUserById';

export const initialAdminPageState: UserSchema = {
    user: null,
    isLoading: false,
    error: undefined,
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialAdminPageState,
    reducers: {
        setChecked(state, action) {

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserById.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchUserById.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;