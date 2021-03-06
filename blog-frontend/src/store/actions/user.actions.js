import axios from 'axios';

import { userActions } from '../slices/user.slice';

export const login = (email, password) => {
	return async dispatch => {
		try {
			const res = await axios.post('http://localhost:4000/api/v1/users/login', {
				email,
				password,
			});

			const { token } = res.data.data;

			sessionStorage.setItem('token', token);

			dispatch(userActions.login({ token }));
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
	return async dispatch => {
		try {
			const token = sessionStorage.getItem('token');

			await axios.get('http://localhost:4000/api/v1/users/check-token', {
				headers: { Authorization: `Bearer ${token}` },
			});

			dispatch(userActions.checkAuth({ userAuth: true, token }));
		} catch (error) {
			console.log(error);
			dispatch(userActions.checkAuth({ userAuth: false, token: null }));
		}
	};
};

export const logout = () => {
	return dispatch => {
		sessionStorage.removeItem('token');
		dispatch(userActions.logout());
	};
};
