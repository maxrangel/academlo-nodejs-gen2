import { Fragment } from 'react';
import Typography from '@mui/material/Typography';

const Comment = ({ comment }) => {
	return (
		<Fragment>
			<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
				{`${comment.user.name} says: ${comment.text}`}
			</Typography>
		</Fragment>
	);
};

export default Comment;
