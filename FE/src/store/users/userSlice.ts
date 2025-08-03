import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {remove, set} from '@helpers/localStorage.ts';

interface UserState {
    token: string | null;
    role: string;
    isAuth: boolean;
    id: string | null;
}

const initialState: UserState = {
    token: null,
    role: 'client',
    isAuth: false,
    id: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; role: string, id: string }>) => {
            state.token = action.payload.token;
            set('token', action.payload.token);
            state.isAuth = true;
            state.role = action.payload.role;
            state.id = action.payload.id;
        },
        logout: (state) => {
            Object.assign(state, initialState);
            remove('token');
        },
    }
})

export const {login, logout} = userSlice.actions

export default userSlice.reducer