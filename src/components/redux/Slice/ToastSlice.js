import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidV4 } from 'uuid';
export const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        id: '',
        showToast: false,
        contentToast: '',
    },
    reducers: {
        onToast: (state, action) => {
            state.id = uuidV4();
            state.showToast = true;
            state.contentToast = action.payload;
        },
    },
});

export const {onToast} = toastSlice.actions
export default toastSlice.reducer