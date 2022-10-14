import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    status: 'idle',
    data: null,
    error: null,
};

export const downloadBook = createAsyncThunk(
    'book/downloadBook',
    async ({ token }, { rejectWithValue }) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const { data } = await axios.get('/api', config);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
    extraReducers: {
        [downloadBook.pending]: (state, action) => {
            state.status = 'loading';
        },
        [downloadBook.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        },
        [downloadBook.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        },
    },
});

export default bookSlice.reducer;
