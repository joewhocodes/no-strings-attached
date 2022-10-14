import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    status: 'idle',
    userRegistered: null,
    error: null,
};

export const signupUser = createAsyncThunk(
    'signup/signupUser',
    async (signupFormData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/signup', signupFormData);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {},
    extraReducers: {
        [signupUser.pending]: (state, action) => {
            state.status = 'loading';
        },
        [signupUser.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.userRegistered = true;
        },
        [signupUser.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        },
    },
});

export default signupSlice.reducer;
