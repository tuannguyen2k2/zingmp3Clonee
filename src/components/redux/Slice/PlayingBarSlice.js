import { createSlice } from '@reduxjs/toolkit';

export const PlayingBarSlice = createSlice({
    name: 'playingBar',
    initialState: {
        curTimeAudio: 0,
        allowPrevious: false,
        allowNext: true,
        isLoading: false,
        isRandom: false,
        volumeOn: true,
        curVolume: 1,
        repeat: { type: 'none', contentTippy: 'Bật phát lại tất cả' },
    },
    reducers: {
        setCurTimeAudio: (state, action) => {
            state.curTimeAudio = action.payload;
        },
        setAllowPrevious: (state, action) => {
            state.allowPrevious = action.payload;
        },
        setAllowNext: (state, action) => {
            state.allowNext = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setIsRandom: (state, action) => {
            state.isRandom = action.payload;
        },
        setVolumeOn: (state, action) => {
            state.volumeOn = action.payload;
        },
        setCurVolume: (state, action) => {
            state.curVolume = action.payload;
        },
        setRepeat: (state, action) => {
            state.repeat = action.payload;
        },
    },
});

export const {
    setCurTimeAudio,
    setAllowPrevious,
    setAllowNext,
    setIsLoading,
    setIsRandom,
    setVolumeOn,
    setCurVolume,
    setRepeat,
} = PlayingBarSlice.actions;

export default PlayingBarSlice.reducer;
