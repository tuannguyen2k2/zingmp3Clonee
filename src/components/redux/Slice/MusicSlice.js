import { createSlice } from '@reduxjs/toolkit';
export const musicSlice = createSlice({
    name: 'music',
    initialState: {
        curSongId: null,
    },
    reducers: {
        setCurSongId: (state, action) => {
            state.curSongId = action.payload || null;
        },
    },
});
