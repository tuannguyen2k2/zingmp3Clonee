import { createSlice } from '@reduxjs/toolkit';
export const albumSlice = createSlice({
    name: 'album',
    initialState: {
        allowGetAlbum: false,
        album: [],
    },
    reducers: {
        setAllowGetAlbum: (state,action ) =>{
            state.allowGetAlbum = action.payload;
        },
        getAlbum: (state,action) => {
            state.album = action.payload;
        }
    },
});