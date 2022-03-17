import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userId: null,
	isAuth: false,
	token: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {},
		logout: state => {},
		signup: (state, action) => {},
		checkAuth: (state, action) => {},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
