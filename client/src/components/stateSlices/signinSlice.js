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
        addLocalInstrument(state, action) {
            const instrument =  (action.payload.instrument)
            const newInstrument = {[instrument]: action.payload.skill}
            state.loggedInUser.instruments.push(newInstrument)
        },
        deleteLocalInstrument(state, action) {
            const filteredInstruments =  (action.payload.instruments)
            console.log(filteredInstruments)
            state.loggedInUser.instruments = (filteredInstruments);
        }
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

export const { logout, addLocalInstrument, deleteLocalInstrument } = signinSlice.actions;
export default signinSlice.reducer;
