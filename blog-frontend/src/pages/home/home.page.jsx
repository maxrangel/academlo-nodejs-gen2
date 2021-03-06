import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Redux actions
import { fetchPosts } from '../../store/actions/posts.actions';

// Components
import PostList from '../../components/home/posts-list/posts-list.component';

import classes from './home.styles.module.css';

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	return (
		<div>
			<PostList />
		</div>
	);
};

export default Home;
