import { createSlice } from '@reduxjs/toolkit';
export const songSlice = createSlice({
    name: 'song',
    initialState: {
        isPlaying: false,
        audio: null,
        infoSong: {},
    },
    reducers: {
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setAudio: (state, action) => {
            //Pause prev audio
            if (state.audio !== null) {
                state.audio.pause();
            }
            //Set new audio
            state.audio = action.payload;
        },
        setInfoSong: (state, action) => {
            state.infoSong = action.payload;
        }
    },
});
