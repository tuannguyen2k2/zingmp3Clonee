import { configureStore } from '@reduxjs/toolkit';
import { toastSlice } from '../Toast/ToastSlice';

const store = configureStore({
    reducer: {
        toast: toastSlice.reducer,
    },
});
export default store;
