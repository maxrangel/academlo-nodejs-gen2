import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Components
import Login from '../../components/auth/login/login.component';
import Signup from '../../components/auth/signup/signup.component';

import classes from './auth.styles.module.css';

const Auth = () => {
	const [showSignup, setShowSignup] = useState(false);

	const switchFormsHandler = () => {
		setShowSignup(!showSignup);
	};

	return (
		<div className={classes.container}>
			<Typography className={classes.header} variant="h4">
				{showSignup ? 'Create your account!' : 'Log into our app!'}
			</Typography>

			{showSignup ? <Signup /> : <Login />}

			<Button
				onClick={switchFormsHandler}
				variant="contained"
				component="label"
				className={classes['switch-button']}
			>
				{showSignup
					? `Have an account? Log in!`
					: `Don't have an account? Create one!`}
			</Button>
		</div>
	);
};

export default Auth;
