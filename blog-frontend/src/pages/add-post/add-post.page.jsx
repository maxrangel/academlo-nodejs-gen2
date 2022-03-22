import { Fragment, useRef } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import classes from './add-post.styles.module.css';

const AddPage = () => {
	const titleInputRef = useRef();
	const contentInputRef = useRef();
	const imageInputRef = useRef();

	const onSubmitHandler = e => {
		e.preventDefault();
	};

	return (
		<Fragment>
			<Typography className={classes.header} variant="h4">
				Create a new post
			</Typography>

			<form className={classes.form}>
				<TextField
					ref={titleInputRef}
					id="outlined-basic"
					label="Title"
					variant="outlined"
				/>
				<TextField
					ref={contentInputRef}
					id="outlined-basic"
					label="Content"
					variant="outlined"
				/>
				<Button variant="contained" component="label">
					Upload an image
					<input ref={imageInputRef} type="file" hidden />
				</Button>

				<Button onClick={onSubmitHandler} variant="contained" component="label">
					Submit post
				</Button>
			</form>
		</Fragment>
	);
};

export default AddPage;
