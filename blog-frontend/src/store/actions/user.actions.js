import axios from 'axios';

import { userActions } from '../slices/user.slice';

export const login = (email, password) => {
	return async dispatch => {
		try {
			dispatch(userActions.login({ token: '' }));
		} catch (error) {
			console.log(error);
		}
	};
};

export const signup = userData => {
	return async dispatch => {
		try {
			const res = await axios.post('http://localhost:4000/api/v1/users', {
				...userData,
			});

			console.log(res.data);

			dispatch(userActions.signup());
		} catch (error) {
			console.log(error.error);
		}
	};
};

export const checkUserAuth = () => {
	return dispatch => {
		const token = sessionStorage.getItem('token');

		dispatch(userActions.checkAuth({ userAuth: !!token, token }));
	};
};

export const logout = () => {
	return dispatch => {
		sessionStorage.removeItem('token');
		dispatch(userActions.logout());
	};
};
