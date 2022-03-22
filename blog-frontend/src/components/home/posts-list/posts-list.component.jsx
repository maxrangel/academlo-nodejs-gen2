import Grid from '@mui/material/Grid';

import PostCard from '../post-card/post-card.component';

const PostList = () => {
	return (
		<Grid
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
