import { createSlice } from '@reduxjs/toolkit';
export const albumSlice = createSlice({
    name: 'album',
    initialState: {
        allowGetAlbum: false,
        isAlbumSection: false,
        album: [],
    },
    reducers: {
        setAllowGetAlbum: (state,action ) =>{
            state.allowGetAlbum = action.payload;
        },
        getAlbum: (state,action) => {
            state.album = action.payload;
        },
        setIsAlbumSection: (state,action) => {
            state.isAlbumSection = action.payload;
        }
    },
});

export const {setAllowGetAlbum, getAlbum, setIsAlbumSection} = albumSlice.actions

export default albumSlice.reducer