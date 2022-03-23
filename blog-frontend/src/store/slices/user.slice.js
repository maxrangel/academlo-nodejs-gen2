import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuth: false,
	token: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuth = true;
			state.token = action.payload.token;
		},
		logout: state => {
			state.isAuth = false;
			state.token = null;
		},
		signup: state => {},
		checkAuth: (state, action) => {
			state.isAuth = action.payload.userAuth;
			state.token = action.payload.token;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
