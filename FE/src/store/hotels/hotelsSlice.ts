import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {HotelsState} from '@interfaces/hotel.ts';

const initialState: HotelsState = {
    offset: 0,
    limit: 3,
    titleSearch: '',
    loading: false,
    list: [],
    currentHotel: {
        _id: '',
        title: '',
        description: '',
        images: [],
    },
}

const hotels = createSlice({
    name: 'hotels',
    initialState,
    reducers: {
        setHotelsState: (state, action: PayloadAction<Partial<HotelsState>>) => {
            Object.assign(state, action.payload);
        },
    }
})

export const {setHotelsState} = hotels.actions

export default hotels.reducer