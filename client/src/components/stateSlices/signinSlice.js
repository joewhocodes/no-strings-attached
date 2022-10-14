import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    status: 'idle',
    loggedInUser: null,
    error: null,
};

export const signinUser = createAsyncThunk(
    'signin/signinUser',
    async (signinFormData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/signin', signinFormData);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const signinSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        logout(state, action) {
            state.loggedInUser = null;
        },
    },
    extraReducers: {
        [signinUser.pending]: (state, action) => {
            state.status = 'loading';
        },
        [signinUser.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.loggedInUser = action.payload;
        },
        [signinUser.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        },
    },
});

export const { logout } = signinSlice.actions;
export default signinSlice.reducer;
