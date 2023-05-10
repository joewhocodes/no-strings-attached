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
            const { data } = await axios.post('/api/users/addInstrument', {instrument, skill, id});
            return data;
        } catch (err) {
            console.log(err)
        }
    }
);

export const deleteInstrument = createAsyncThunk(
    'users/deleteInstrument',
    async ({instruments, id}) => {
        try {
            const { data } = await axios.post('/api/users/deleteInstrument', {instruments, id});
            return data;
        } catch (err) {
            console.log(err)
        }
    }
);

export const addFriend = createAsyncThunk(
    'users/addFriend',
    async ({friendId, loggedInUserId}) => {
        try {
            const { data } = await axios.post('/api/users/addFriend', {friendId, loggedInUserId});
            return data;
        } catch (err) {
            console.log(err)
        }
    }
);

export const removeFriend = createAsyncThunk(
    'users/removeFriend',
    async ({friendId, loggedInUserId, loggedInUserFilteredFriends, friendFilteredFriends}) => {
        try {
            const { data } = await axios.post('/api/users/removeFriend', {friendId, loggedInUserId, loggedInUserFilteredFriends, friendFilteredFriends});
            return data;
        } catch (err) {
            console.log(err)
        }
    }
);

export const addComment = createAsyncThunk(
    'users/addComment',
    async ({friendId, loggedInUserId, comment}) => {
        try {
            const { data } = await axios.post('/api/users/addComment', {friendId, loggedInUserId, comment});
            return data;
        } catch (err) {
            console.log(err)
        }
    }
);

export const updateProfile = createAsyncThunk(
    'users/updateProfile',
    async ({bio, location, id}) => {
        try {
            const { data } = await axios.post('/api/users/updateProfile', {bio, location, id});
            return data;
        } catch (err) {
            console.log(err)
        }
    }
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: {
        [addInstrument.pending]: (state, action) => {
            state.status = 'loading';
        },
        [addInstrument.fulfilled]: (state, action) => {
            state.status = 'succeeded';
        },
        [addInstrument.rejected]: (state, action) => {
            state.status = 'failed';
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

export default usersSlice.reducer;
