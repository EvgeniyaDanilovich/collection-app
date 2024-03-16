import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from '../services/fetchUsers';
import { AdminSchema } from '../types/adminSchema';
import { updateUser } from '../services/updateUser';
import { User } from '../../../../entities/User';

export const initialAdminPageState: AdminSchema = {
    users: [],
    isLoading: false,
    error: undefined,
};

const adminPageSlice = createSlice({
    name: 'adminPageSlice',
    initialState: initialAdminPageState,
    reducers: {
        setChecked(state, action) {
            state.users.map(user => {
                if (user.id === action.payload.userId) {
                    user.checked = action.payload.checked;
                }
            });
        },

        setAllCheckbox(state, action) {
            state.users.map(user => {
                user.checked = action.payload;
            });
        },

        deleteUser(state, action) {
            if (action.payload) {
                const index = state.users.findIndex((user) => user.id === action.payload);
                state.users.splice(index, 1);
            }
        },

        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any>) => {
            state.users = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(updateUser.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false;
           let index = state.users.findIndex(user => user.id === action.payload.id);
            state.users[index] = { ...action.payload, checked: true };
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: adminPageActions } = adminPageSlice;
export const { reducer: adminPageReducer } = adminPageSlice;
