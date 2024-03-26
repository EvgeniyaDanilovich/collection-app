import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSchema } from '../types/authSchema';
import { loginUser } from '../services/loginUser';
import { User } from '../../../../entities/User';
import { signupUser } from '../services/signupUser';

const initialState: AuthSchema = {
    isAuth: false,
    isAdmin: false,
    isLoading: false,
    error: undefined
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },

        setIsAdmin: (state, action: PayloadAction<boolean>) => {
            state.isAdmin = action.payload;
        },

        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.isAuth = true;
            state.isAdmin = action.payload.admin;
            state.error = undefined;
            state.isLoading = false;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(signupUser.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.error = undefined;
            state.isLoading = false;
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
