import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import classes from './login.styles.module.css';

const Login = () => {
	// State
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const onSubmitHandler = e => {
		e.preventDefault();
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
