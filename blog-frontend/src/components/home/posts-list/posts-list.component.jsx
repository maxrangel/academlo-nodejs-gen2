import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

// Components
import PostCard from '../post-card/post-card.component';

import classes from './posts-list.styles.module.css';

const PostList = () => {
	const posts = useSelector(state => state.posts.posts);

	return (
		<Grid
			className={classes.container}
			container
			alignItems="center"
			justifyContent="space-around"
			rowSpacing={1}
		>
			{posts &&
				posts.map(post => {
					return (
						<Grid key={post.id} item xs={4}>
							<PostCard post={post} />
						</Grid>
					);
				})}
		</Grid>
	);
};

export default PostList;
