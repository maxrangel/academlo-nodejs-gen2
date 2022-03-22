import { Fragment, useRef } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import classes from './signup.styles.module.css';

const Signup = ({ onSwitchForm }) => {
	const nameInputRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const onSubmitHandler = e => {
		e.preventDefault();
	};

	return (
		<form className={classes.form}>
			<TextField
				ref={nameInputRef}
				id="outlined-basic"
				label="Name"
				variant="outlined"
			/>
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
				Create account!
			</Button>
		</form>
	);
};

export default Signup;
