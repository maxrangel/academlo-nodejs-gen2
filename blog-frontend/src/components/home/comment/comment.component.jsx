import { Fragment } from 'react';
import Typography from '@mui/material/Typography';

const Comment = () => {
	return (
		<Fragment>
			<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
				Author says: Your comment
			</Typography>
		</Fragment>
	);
};

export default Comment;
