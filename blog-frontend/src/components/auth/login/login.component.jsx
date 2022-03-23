import { useState } from 'react';
import { useDispatch } from 'react-redux';

// Redux actions
import { login } from '../../../store/actions/user.actions';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import classes from './login.styles.module.css';

const Login = () => {
	// State
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const dispatch = useDispatch();

	const onSubmitHandler = e => {
		e.preventDefault();

		dispatch(login(emailInput, passwordInput));
	};

	const emailInputHandler = e => {
		setEmailInput(e.target.value);
	};

	const passwordInputHandler = e => {
		setPasswordInput(e.target.value);
	};

	return (
		<form className={classes.form}>
			<TextField
				onChange={emailInputHandler}
				id="outlined-basic"
				label="Email"
				variant="outlined"
			/>
			<TextField
				onChange={passwordInputHandler}
				id="outlined-basic"
				label="Password"
				variant="outlined"
				type="password"
			/>

			<Button onClick={onSubmitHandler} variant="contained" component="label">
				Log in
			</Button>
		</form>
	);
};

export default Login;
