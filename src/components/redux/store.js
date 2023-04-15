import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

import { toastSlice } from './Slice/ToastSlice';
import { musicSlice } from './Slice/MusicSlice';
import { songSlice } from './Slice/SongSlice';
import { albumSlice } from './Slice/AlbumSlice';

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
        toast: toastSlice.reducer,
        music: persistReducer(musicConfig, musicSlice.reducer),
        song: songSlice.reducer,
        album: persistReducer(albumConfig, albumSlice.reducer),
    },
    middleware: [thunk],
});
export const persistor = persistStore(store);
export default store;
