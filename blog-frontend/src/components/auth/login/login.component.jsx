import { useRef } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import classes from './login.styles.module.css';

const Login = ({ onSwitchForm }) => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const onSubmitHandler = e => {
		e.preventDefault();
	};

	return (
		<form className={classes.form}>
			<TextField
				ref={emailInputRef}
				id="outlined-basic"
				label="Email"
				variant="outlined"
			/>
			<TextField
				ref={passwordInputRef}
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
