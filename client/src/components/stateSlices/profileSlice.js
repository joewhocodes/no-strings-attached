import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    status: 'idle',
    profile: [],
    error: null,
};

export const fetchProfile = createAsyncThunk(
    'users/fetchProfile',
    async ({ token }, { rejectWithValue }) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const { data } = await axios.get('/api/users', config);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: {
        [fetchProfile.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchProfile.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.users = [...action.payload];
        },
        [fetchProfile.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        },
    },
});


export default profileSlice.reducer;
