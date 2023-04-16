import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

import toastReducer from './Slice/ToastSlice';
import musicReducer from './Slice/MusicSlice';
import songReducer from './Slice/SongSlice';
import albumReducer from './Slice/AlbumSlice';
import playingBarReducer from './Slice/PlayingBarSlice';

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};
const musicConfig = {
    ...commonConfig,
    key: 'music',
    whitelist: ['curSongId', 'prevSongId'],
};

const albumConfig = {
    ...commonConfig,
    key: 'album',
    whitelist: ['album'],
};

const store = configureStore({
    reducer: {
        toast: toastReducer,
        music: persistReducer(musicConfig, musicReducer),
        song: songReducer,
        album: persistReducer(albumConfig, albumReducer),
        playingBar: playingBarReducer
    },
    middleware: [thunk],
});
export const persistor = persistStore(store);
export default store;
