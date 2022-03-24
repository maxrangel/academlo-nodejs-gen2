import { Fragment, useRef } from 'react';
import { useDispatch } from 'react-redux';

// Redux actions
import { addPost } from '../../store/actions/posts.actions';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import classes from './add-post.styles.module.css';

const AddPage = () => {
	// Refs
	const titleInputRef = useRef();
	const contentInputRef = useRef();
	const imageInputRef = useRef();

	const dispatch = useDispatch();

	const onSubmitHandler = e => {
		e.preventDefault();

		const postData = new FormData();

		postData.append('title', titleInputRef.current.value);
		postData.append('content', contentInputRef.current.value);
		postData.append('postImg', imageInputRef.current.files[0]);

		dispatch(addPost(postData));
	};

	return (
		<Fragment>
			<Typography className={classes.header} variant="h4">
				Create a new post
			</Typography>

			<form className={classes.form}>
				<TextField
					inputRef={titleInputRef}
					id="outlined-basic"
					label="Title"
					variant="outlined"
				/>
				<TextField
					inputRef={contentInputRef}
					id="outlined-basic"
					label="Content"
					variant="outlined"
				/>
				<Button variant="contained" component="label">
					Upload an image
					<input ref={imageInputRef} type="file" accept="image/*" hidden />
				</Button>

				<Button onClick={onSubmitHandler} variant="contained" component="label">
					Submit post
				</Button>
			</form>
		</Fragment>
	);
};

export default AddPage;
