import {configureStore} from '@reduxjs/toolkit';
import hotel from '@store/hotels/hotelsSlice.ts';
import rooms from '@store/rooms/roomsSlice.ts';
import user from '@store/users/userSlice.ts';
import users from '@store/users/usersSlice.ts';
import socket from '@store/sockets/socketSlice.ts';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        hotels: hotel,
        rooms: rooms,
        socketIO: socket,
        user: user,
        users: users,
    },
});

export default store;
