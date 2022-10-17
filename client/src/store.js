import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './components/stateSlices/signupSlice';
import signinReducer from './components/stateSlices/signinSlice';
import usersReducer from './components/stateSlices/usersSlice';
import profileReducer from './components/stateSlices/profileSlice';

const loggedInUserFromStorage = localStorage.getItem('loggedInUser')
    ? JSON.parse(localStorage.getItem('loggedInUser'))
    : null;

const preloadedState = {
    signin: {
        loggedInUser: loggedInUserFromStorage,
    },
};

export default configureStore({
    reducer: {
        signup: signupReducer,
        signin: signinReducer,
        users: usersReducer,
        profile: profileReducer,
    },
    preloadedState,
});
