import { createSlice } from '@reduxjs/toolkit';
export const musicSlice = createSlice({
    name: 'music',
    initialState: {
        curSongId: 'ZW8I8008',
    },
    reducers: {
        setCurSongId: (state, action) => {
            state.curSongId = action.payload || null;
        },
    },
});

export const {setCurSongId} = musicSlice.actions

export default musicSlice.reducer