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
        getAudio: (state, action) => {
            //Pause prev audio
            if (state.audio !== null) {
                //Avoid duplicate play
                state.audio.pause();
            }
            //Set new audio
            state.audio = action.payload;
        },
        getInfoSong: (state, action) => {
            state.infoSong = action.payload;
        },
    },
});
