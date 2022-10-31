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
    async ({instrument, skill, id}) => {
        try {
            console.log(instrument, skill, id)
            const { data } = await axios.post('/api/users', {instrument, skill, id});
            return data;
        } catch (err) {
            console.log('it didn\'t work')
            console.log(err)
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
            state.status = 'loading';
        },
        [addInstrument.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            console.log('succeeded')
            state.users[0].instruments.push(action.payload)
        },
        [addInstrument.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(state)
            console.log(action)
            // state.error = action.payload.message;
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
