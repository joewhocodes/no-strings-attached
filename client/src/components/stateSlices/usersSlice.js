import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    status: 'idle',
    users: [],
    currentProfile: {},
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

export const fetchCurrentProfile = createAsyncThunk(
    'users/fetchCurrentProfile',
    async ({currentProfileId}) => {
        try {
            const { data } = await axios.get(`/api/user/${currentProfileId}`);
            return data;
        } catch (err) {
            console.log(err)
        }
    }
);

export const addInstrument = createAsyncThunk(
    'users/addInstrument',
    async ({instrument, skill, id}, {dispatch}) => {
        try {
            const { data } = await axios.post('/api/users/addInstrument', {instrument, skillLevel, id});
            dispatch(fetchCurrentProfile({ currentProfileId: id }))
            return data;
        } catch (err) {
            console.log(err)
        }
    }
);

export const removeInstrument = createAsyncThunk(
    'users/removeInstrument',
    async ({instruments, id}, {dispatch}) => {
        try {
            const { data } = await axios.post('/api/users/removeInstrument', {instruments, id});
            dispatch(fetchCurrentProfile({ currentProfileId: id }))
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
    async ({commentId, currentProfileId, loggedInUserId, firstName, profileImg, comment}, {dispatch}) => {
        try {
            const { data } = await axios.post('/api/users/addComment', {commentId, currentProfileId, loggedInUserId, firstName, profileImg, comment});
            dispatch(fetchCurrentProfile({ currentProfileId }))
            return data;
        } catch (err) {
            console.log(err)
        }
    }
);

export const removeComment = createAsyncThunk(
    'users/removeComment',
    async ({id, filteredComments}, {dispatch}) => {
        try {
            const { data } = await axios.post('/api/users/removeComment', {id, filteredComments});
            dispatch(fetchCurrentProfile({ currentProfileId: id }))
            return data;
        } catch (err) {
            console.log(err)
        }
    }
);

export const updateProfile = createAsyncThunk(
    'users/updateProfile',
    async ({bio, location, id}, {dispatch}) => {
        try {
            const { data } = await axios.post('/api/users/updateProfile', {bio, location, id});
            dispatch(fetchCurrentProfile({ currentProfileId: id }));
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
        [addInstrument.pending]: (state) => {
            state.status = 'loading';
        },
        [addInstrument.fulfilled]: (state) => {
            state.status = 'succeeded';
        },
        [addInstrument.rejected]: (state) => {
            state.status = 'failed';
        },
        [fetchUsers.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.users = [...action.payload];
        },
        [fetchCurrentProfile.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.currentProfile = action.payload;
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload.message;
        },
    },
});

export default usersSlice.reducer;
