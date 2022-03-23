import Grid from '@mui/material/Grid';

// Components
import PostCard from '../post-card/post-card.component';

import classes from './posts-list.styles.module.css';

const PostList = () => {
	return (
		<Grid
			className={classes.container}
			container
			alignItems="center"
			justifyContent="space-around"
			rowSpacing={1}
		>
			<Grid item xs={4}>
				<PostCard />
			</Grid>
			<Grid item xs={4}>
				<PostCard />
			</Grid>
			<Grid item xs={4}>
				<PostCard />
			</Grid>
			<Grid item xs={4}>
				<PostCard />
			</Grid>
			<Grid item xs={4}>
				<PostCard />
			</Grid>
		</Grid>
	);
};

export default PostList;
