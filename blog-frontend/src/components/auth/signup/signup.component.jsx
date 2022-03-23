import { useState } from 'react';
import { useDispatch } from 'react-redux';

// Redux actions
import { signup } from '../../../store/actions/user.actions';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import classes from './signup.styles.module.css';

const Signup = () => {
	const [nameInput, setNameInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const dispatch = useDispatch();

	const onSubmitHandler = e => {
		e.preventDefault();

		const userData = {
			name: nameInput,
			email: emailInput,
			password: passwordInput,
		};

		dispatch(signup(userData));
	};

	const nameInputHandler = e => {
		setNameInput(e.target.value);
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
				id="outlined-basic"
				label="Name"
				onChange={nameInputHandler}
				variant="outlined"
			/>
			<TextField
				id="outlined-basic"
				onChange={emailInputHandler}
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
				Create account!
			</Button>
		</form>
	);
};

export default Signup;
