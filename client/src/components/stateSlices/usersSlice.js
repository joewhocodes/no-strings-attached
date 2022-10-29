import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    status: 'idle',
    users: [],
    error: null,
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
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

export const addInstrument = createAsyncThunk(
    'users/addInstrument',
    async (instrument, id, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/users', instrument, id);
            console.log("instrument added")
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    // reducers: {
    //     addInstrument (state, action) {
    //         state.users[0].instruments.push(action.payload)
    //     },
    // },
    extraReducers: {
        [addInstrument.pending]: (state, action) => {
            console.log('loading')
        },
        [addInstrument.fufilled]: (state, action) => {
            console.log('completed')
            state.users[0].instruments.push(action.payload)
        },
        [fetchUsers.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.users = [...action.payload];
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        },
    },
});

// export const { addInstrument } = usersSlice.actions;

export default usersSlice.reducer;
